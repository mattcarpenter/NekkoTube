#!/usr/bin/python

import httplib2
import json
import os
import sys

from apiclient.discovery import build_from_document
from apiclient.errors import HttpError
from oauth2client.client import flow_from_clientsecrets
from oauth2client.file import Storage
from oauth2client.tools import argparser, run_flow
from pymongo import MongoClient
from elasticsearch import Elasticsearch

from .captionparser import CaptionParser

# https://developers.google.com/api-client-library/python/guide/aaa_client_secrets
# https://console.developers.google.com/apis/
CLIENT_SECRETS_FILE = 'client_secrets.json'

YOUTUBE_READ_WRITE_SSL_SCOPE = "https://www.googleapis.com/auth/youtube.force-ssl"
YOUTUBE_API_SERVICE_NAME = 'youtube'
YOUTUBE_API_VERSION = 'v3'

class Scraper:
    def __init__(self):
        self.youtube = self.get_authenticated_service()

    def scrape(self, video_id):

        mongo_client = MongoClient()
        db = mongo_client['nekkotube']
        es = Elasticsearch()

        # Loads captions for specified YouTube video id
        results = self.youtube.captions().list(
            part = 'snippet',
            videoId = video_id
        ).execute()

        if 'items' not in results:
            raise ValueError('no captions in video ' + video_id)

        # Locate captions resource
        captions_resource = None
        for item in results['items']:
            if item['snippet']['language'] == 'ja':
                captions_resource = item

        if captions_resource is None:
            raise ValueError('no Japanese captions in video ' + video_id)

        # Download raw captions file from youtube
        captions = self.youtube.captions().download(
            id=captions_resource['id']
        ).execute()

        # Tokenizes the Japanese captions and translates Kanji into Hirigana
        parser = CaptionParser(captions.decode('utf-8'))
        parsed_captions = parser.parse()

        # Create record in Mongo
        result = db.videos.insert_one({
            'youtubeVideoId': video_id,
            'captionData': parsed_captions
        })
        print('Video inserted. id: {}'.format(result.inserted_id))

        # Index each caption line
        for chunk_index, chunk in enumerate(parsed_captions):
            for line_index, line in enumerate(chunk['inverted_lines']):
                doc = {
                    'youtubeVideoId': video_id,
                    'refId': str(result.inserted_id),
                    'chunkIndex': chunk_index,
                    'lineIndex': line_index,
                    'line': line
                }
                res = es.index(index='nekkotube', doc_type='caption_line', body=doc)
                print(res)

        print(json.dumps(parsed_captions))

    # Authorize the request and store authorization credentials.
    def get_authenticated_service(self):
        flow = flow_from_clientsecrets(CLIENT_SECRETS_FILE, scope=YOUTUBE_READ_WRITE_SSL_SCOPE,
                                       message="Missing client secrets")

        storage = Storage("%s-oauth2.json" % sys.argv[0])
        credentials = storage.get()

        flags = argparser.parse_args('--auth_host_name localhost --logging_level INFO --noauth_local_webserver'.split())

        if credentials is None or credentials.invalid:
            credentials = run_flow(flow, storage, flags)

        # Trusted testers can download this discovery document from the developers page
        # and it should be in the same directory with the code.
        with open("youtube-v3-api-captions.json", "r", encoding='utf-8') as f:
            doc = f.read()
            return build_from_document(doc, http=credentials.authorize(httplib2.Http()))


