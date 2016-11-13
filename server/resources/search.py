from flask_restful import Resource, Api
from flask_restful_swagger import swagger
from elasticsearch import Elasticsearch
from flask import request, Response
from bson.json_util import dumps

es = Elasticsearch()
from pymongo import MongoClient
mongo_client = MongoClient()
db = mongo_client['nekotube']

class SearchResource(Resource):
    "Search Indexed Videos"
    @swagger.operation(
        notes='Searches indexed Youtube videos',
        nickname='search',
        parameters=[
            {
                'name': 'query',
                'description': 'search query',
                'type': 'string',
                'paramType': 'query'

            }
        ],
        responseMessages=[
            {
                'code': 200,
                'message': 'success'
            }
        ]
    )
    def get(self):
        result = es.search(
            index='nekotube',
            body={'query': { 'match_phrase': { 'inverted': request.args['query'] }}}
        )

        videos = set()

        try:
            hits = result['hits']['hits']
        except:
            hits = []

        # de-dupe videos
        for hit in hits:
            videos.add(hit['_source']['youtubeVideoId'])

        results = db['videos'].find({'youtubeVideoId': { '$in': list(videos)}}, { 'captionData': 0})

        return Response(dumps(results), mimetype='application/json')