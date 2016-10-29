#!/usr/bin/python

import httplib2
import os
import sys

from apiclient.discovery import build_from_document
from apiclient.errors import HttpError
from oauth2client.client import flow_from_clientsecrets
from oauth2client.file import Storage
from oauth2client.tools import argparser, run_flow

DEVELOPER_KEY = 'AIzaSyBIu4lMLcAU1ZP9B9CL8ZAddvfJYvd_dC4'
CLIENT_SECRETS_FILE = 'client_secrets.json'
YOUTUBE_READ_WRITE_SSL_SCOPE = "https://www.googleapis.com/auth/youtube.force-ssl"
YOUTUBE_API_SERVICE_NAME = 'youtube'
YOUTUBE_API_VERSION = 'v3'

class Loader:
    def __init__(self):
        self.youtube = self.get_authenticated_service()

    def load(self, video_id):

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

        captions = self.youtube.captions().download(
            id=captions_resource['id']
        ).execute()

        print("hello")

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
        with open("youtube-v3-api-captions.json", "r", encoding='utf8') as f:
            doc = f.read()
            return build_from_document(doc, http=credentials.authorize(httplib2.Http()))


