from flask import Flask, request, session, g, redirect, url_for, abort, render_template, flash
from flask_restful import Resource, Api
from flask_restful_swagger import swagger

from .resources.search import Search

# create our little application :)
app = Flask(__name__)
app.config.from_object(__name__)
api = swagger.docs(Api(app), apiVersion='0.1')

api.add_resource(Search, '/search')

@app.route('/')
def hello():
    return render_template('index.html')


