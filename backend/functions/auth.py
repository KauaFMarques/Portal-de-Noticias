from flask import Flask, request, jsonify, Blueprint, session, current_app
import psycopg2, jwt
from functools import wraps
import os, datetime
from flask import current_app as app

app = Flask(__name__)
app.config['SECRET_KEY'] = os.environ.get('SECRET_KEY')

# Função para gerar token JWT
def generate_token(username):
    payload = {'username': username}
    token = jwt.encode(payload, current_app.config['SECRET_KEY'], algorithm='HS256')
    return token

# Função para validar o token
def validate_token(token):
    try:
        payload = jwt.decode(token, current_app.config['SECRET_KEY'], algorithms=['HS256'])
        return payload['username']
    except jwt.ExpiredSignatureError:
        return None  # Token expirado
    except jwt.InvalidTokenError:
        return None  # Token inválido
