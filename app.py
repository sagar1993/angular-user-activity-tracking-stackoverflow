#!/usr/bin/python
from flask import Flask
from flask import request, jsonify
from bson.json_util import dumps, loads
from flask_cors import CORS
import datetime

app = Flask(__name__)
CORS(app)

import pymongo
from pymongo import MongoClient
client = MongoClient('localhost', 27017)

db = client.scrape
stackoverflow_data = db.stackoverflow
user_data = db.users
user_login = db.user_login
user_logs = db.user_logs


## user related creation get usernames

@app.route('/', methods=['GET'])
def index():
	return "Running"

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

@app.route('/api/users', methods=['POST'])
def Create():
	data = loads(request.data)
	username = data.get("username")
	firstName = data.get("firstName")
	lastName = data.get("lastName")
	password = data.get("password")
	idx = user_data.find_one(sort=[("id", -1)])['id'] + 1
	## get max id from database
	user_data.insert_one(
   		{ "username": username, "firstName": firstName, "lastName": lastName, "id": idx, "password": password }
	)
	return "", 200

@app.route('/api/users/<userid>', methods=['PUT'])
def Update(userid):
	pass

@app.route('/api/users/<userid>', methods=['DELETE'])
def Delete(userid):
	user_data.delete_one({"id": int(userid)})
	return "", 200

@app.route('/api/login', methods=['POST'])
def Login():
	data = loads(request.data)
	username = data.get("username")
	password = data.get("password")
	if not username or not password:
		return dumps({"success": False}), 200
	userdata = user_data.find_one({"username": username, "password": password})
	if userdata:
		user_login.insert_one({ "username": username, "dt": datetime.datetime.now()})
		return dumps({ "success": True }), 200
	else:
		return dumps({"success": False}), 200


@app.route('/api/loginhistory/<username>', methods=['GET'])
def GetLoginHistory(username):
	json = user_login.find({"username": username})
	return dumps(json), 200

@app.route('/api/useractivity/<username>', methods=['GET'])
def GetUserActivity(username):
	result = {}
	question_count = user_logs.find({"user": username, "type":"question"}).count()
	profile_count = user_logs.find({"user": username, "type":"profile"}).count()
	result["question"] = question_count
	result["profile"] = profile_count
	return dumps(result), 200

### logging


@app.route('/api/logs/save', methods=['POST'])
def SaveLogs():
	data = loads(request.data)
	for d in data:
		d["dt"] = datetime.datetime.now()
	user_logs.insert(data);
	return "", 200

@app.route('/api/logs/get/<userid>', methods=['GET'])
def GetLogs(userid):
	# user_data.delete_one({"id": int(userid)})
	data = 	user_logs.find({"user" : userid})
	return dumps(data), 200


## stackoverflow data

@app.route('/api/stackoverflow', methods=['GET'])
def GetStackOverflowData():
	json = stackoverflow_data.find({})
	return dumps(json), 200

## chart data

def getChartData ():
	data = user_data.distinct("username")
	labels = [];

	today = datetime.date.today()
	for i in range(0,5):
		last_day = today - datetime.timedelta(days = i)
		labels.append("{:%B %d, %Y}".format(last_day))

	dates_to_index = {}
	for index, date in enumerate(labels):
		dates_to_index[date] = index

	result_q = {}
	result_p = {}
	series = []
	user_login_d = {}
	for username in data:
		series.append(username)
		user_login_count = user_login.find({"username":username}).count()
		user_login_d[username] = user_login_count
		questions = [0] * len(labels)
		profile = [0] * len(labels)
		result_q[username] = questions
		result_p[username] = profile
		d = user_logs.find({"user": username})
		for record in d :
			if "dt" not in record:
				continue
			date = record["dt"].strftime("%B %d, %Y")
			if date in dates_to_index:
				if record["type"] == "question":
					questions[dates_to_index[date]] += 1
				if record["type"] == "profile":
					profile[dates_to_index[date]] += 1
			result_q[username] = questions
			result_p[username] = profile

	result = {}
	result["labels"] = labels
	result["series"] = series
	result["result_q"] = result_q
	result["result_p"] = result_p
	result["user_login"] = user_login_d
	return result

@app.route('/get_user_activity', methods=['GET'])
def GetUserActivityChartData():
	result = getChartData()
	return dumps(result), 200

if __name__ == '__main__':
	app.run(debug=True)