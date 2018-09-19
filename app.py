#!/usr/bin/python
from flask import Flask
from flask import request, jsonify
from bson.json_util import dumps
from flask_cors import CORS
from flask import render_template

app = Flask(__name__)
CORS(app)

import pymongo
from pymongo import MongoClient
client = MongoClient('localhost', 27017)

db = client.scrape
stackoverflow_data = db.stackoverflow
user_data = db.users

@app.route('/', methods=['GET'])
def index():
	return  render_template("./index.html")

@app.route('/api/users', methods=['GET'])
def getAll():
	json = user_data.find({})
	return dumps(json), 200

@app.route('/api/users/<id>', methods=['GET'])
def GetById(id):
	json = user_data.find_one({"id": int(id)})
	return dumps(json), 200

@app.route('/api/users/username/<username>', methods=['GET'])
def GetByUsername(username):
	print("/api/users/username/")
	json = user_data.find_one({"username": username})
	return dumps(json), 200

@app.route('/api/users/', methods=['POST'])
def Create():
	print(request)
	return ""

@app.route('/api/users/<userid>', methods=['PUT'])
def Update(userid):
	pass

@app.route('/api/users/<userid>', methods=['DELETE'])
def Delete(userid):
	pass

if __name__ == '__main__':
	app.run(debug=True)
