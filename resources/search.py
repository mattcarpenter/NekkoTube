from flask_restful import Resource, Api
from flask_restful_swagger import swagger
from elasticsearch import Elasticsearch
from flask import request

es = Elasticsearch()

class Search(Resource):
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
            index='nekkotube',
            body={'query': { 'match_phrase': { 'line': request.args['query'] }}}
        )
        return result