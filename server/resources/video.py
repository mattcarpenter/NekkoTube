from flask_restful import Resource, Api
from flask_restful_swagger import swagger
from elasticsearch import Elasticsearch
from flask import request, Response
from bson.json_util import dumps

from pymongo import MongoClient
mongo_client = MongoClient()
db = mongo_client['nekkotube']

class VideoResource(Resource):
    "Returns a Video resource"
    @swagger.operation(
        notes='Returns a Video resource',
        nickname='video',
        parameters=[
            {
                'name': 'videoId',
                'description': 'YouTube video id',
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
        result = db['videos'].find_one({ 'youtubeVideoId': request.args['videoId'] });
        return Response(dumps(result), mimetype='application/json')
