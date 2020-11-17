from lib2to3.refactor import _identity

from flask_restful import Resource, reqparse
from flask_jwt_extended import (create_access_token, create_refresh_token, jwt_required, jwt_refresh_token_required,
                                get_jwt_identity, get_raw_jwt)
import hashlib
from model import User, db, Account
from urllib2 import Request, urlopen 
from urllib import urlencode, quote_plus
from mongoalchemy.session import Session
import json

parser = reqparse.RequestParser()
parser.add_argument('username', help = 'Username cannot be blank', required = False)
parser.add_argument('password', help = 'Password cannot be blank', required = False)
parser.add_argument('stock', help = 'account', required = False)

class UserRegistration(Resource):
    def post(self):
        # try:
        data = parser.parse_args()
        print(hashlib.md5(data['password'].encode()).hexdigest())
        if User.query.filter(User.username==data['username']).first():
            return {"error" : "User already exists"}

        u = User(username=data['username'], password=hashlib.md5(data['password'].encode()).hexdigest())
        u.save()
        s = Account(username=(data['username']))
        s.save()
        access_token = create_access_token(identity=data['username'])
        refresh_token = create_refresh_token(identity=data['username'])
        return {
            'username': data['username'],
            'access_token': access_token,
            'refresh_token': refresh_token
        }
        # except:
        #    raise Exception()

class UserLogin(Resource):
    def post(self):
        try:
            data = parser.parse_args()
            current_user = User.query.filter(User.username==data['username']).first()

            if not current_user:
                return {"error":"User not in DB. Register as a new user"}

            password = hashlib.md5(data['password'].encode()).hexdigest()
            if current_user.password == password :
                access_token = create_access_token(identity=data['username'])
                refresh_token = create_refresh_token(identity=data['username'])
                return {
                    'username': current_user.username,
                    'access_token': access_token,
                    'refresh_token': refresh_token
                }
            else:
                return {'error': 'Wrong credentials'}
        except:
            raise Exception("Cannot login user")

class GetStocks(Resource):
    def post(self):
        data = parser.parse_args()
        account = Account.query.filter(Account.username==data['username'])
        print(account.first().stocks)

class GetSummary(Resource):
    def post(self):
        data = parser.parse_args()
        account = Account.query.filter(Account.username==data['username'])
        print(account.first().stocks)
        temp_stocks = account.first().stocks

        ret = []
        for issue_code in temp_stocks:
            url = 'https://sandbox-apigw.koscom.co.kr/v2/market/stocks/{marketcode}/{issuecode}/master'.replace('{marketcode}',quote_plus('kospi')).replace('{issuecode}',quote_plus(issue_code))
            dev_key = 'l7xxa94785c403c148c1a1ababb7564992bb'
            queryParams = '?' + urlencode({ quote_plus('apikey') : dev_key}) 
            request = Request(url + queryParams)
            request.get_method = lambda: 'GET'
            response_body = urlopen(request).read()
            # name = json.dumps(response_body)
            dic = eval(response_body)
            ret.append({
                "name":dic['result']['isuKorAbbrv'],
                "issue_code":dic['result']['isuSrtCd'],
                "eps":dic['result']['eps'],
                "per":dic['result']['per'],
            })
        return ret

class AddStock(Resource):
    def post(self):
        data = parser.parse_args()
        account = Account.query.filter(Account.username==data['username'])
        temp_stocks=[data['stock']]
        temp_stocks.extend(account.first().stocks)
        with Session.connect('mongoalchemy') as s:
            update = account.set(Account.stocks, temp_stocks)
            update.execute() 

class RemoveStock(Resource):
    def post(self):
        data = parser.parse_args()
        account = Account.query.filter(Account.username==data['username'])
        temp_stocks=account.first().stocks
        if data['stock'] in temp_stocks: temp_stocks.remove(data['stock'])
        with Session.connect('mongoalchemy') as s:
            update = account.set(Account.stocks, temp_stocks)
            update.execute()
