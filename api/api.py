from flask import Flask, request
import random
import json

app = Flask(__name__)

names = [
    {"name": "Leona"},
    {"name": "Joacim"},
    {"name": "Zackarias"},
    {"name": "Carl Petter"},
    {"name": "Sofia"}
]

filepath = 'names.json'
#with open(filepath, 'r') as file:
#    names = json.load(file)
#    print(type(names))


@app.route('/people')
def get():
    return names

@app.route('/name')
def get_name():
    username = request.args.get('username')
    print(username)
    name = random.choice(names)
    names.remove(name)
#    with open(filepath, 'w') as fp:
#        json.dump(names, fp)

    return name

