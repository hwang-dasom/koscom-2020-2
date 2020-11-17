from flask import Flask
from flask_mongoalchemy import MongoAlchemy

app = Flask(__name__)
app.config['MONGOALCHEMY_DATABASE'] = 'howmuch'

#FIXME
#app.config['MONGOALCHEMY_CONNECTION_STRING'] = 'mongodb://cout:loot@ds223268.mlab.com:23268/coutlootlogin'
app.config['MONGOALCHEMY_CONNECTION_STRING'] = 'mongodb://13.125.73.136:27017/howmuch'

db = MongoAlchemy(app)

class User(db.Document):
    username = db.StringField()
    password = db.StringField()

class Account(db.Document):
    username = db.StringField()
    stocks = db.ListField(db.StringField(required=False),required=False)
