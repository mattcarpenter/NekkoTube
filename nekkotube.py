import os
import sqlite3
from flask import Flask, request, session, g, redirect, url_for, abort, render_template, flash
from flask_restful import Resource, Api
from flask_restful_swagger import swagger

# create our little application :)
app = Flask(__name__)
app.config.from_object(__name__)
api = swagger.docs(Api(app), apiVersion='0.1')


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
        return {'hello': 'world'}

api.add_resource(Search, '/search')

@app.route('/')
def hello():
    return render_template('index.html')


