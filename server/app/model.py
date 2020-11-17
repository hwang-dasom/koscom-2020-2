from flask import Flask
from flask_mongoalchemy import MongoAlchemy

app = Flask(__name__)
app.config['MONGOALCHEMY_DATABASE'] = 'howmuchlogin'

#FIXME
#app.config['MONGOALCHEMY_CONNECTION_STRING'] = 'mongodb://cout:loot@ds223268.mlab.com:23268/coutlootlogin'
app.config['MONGOALCHEMY_CONNECTION_STRING'] = 'mongodb://52.79.239.91:27017/howmuch'
db = MongoAlchemy(app)

class User(db.Document):
    username = db.StringField()
    password = db.StringField()
