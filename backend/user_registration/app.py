from flask import Flask
from noticias import noticias_bp
from user import *

app = Flask(__name__)
# Define uma chave secreta para a aplicação Flask.
app.secret_key = '2002'
# Registra o blueprint user_bp na aplicação Flask, atribuindo-lhe o prefixo de URL '/user'.
app.register_blueprint(user_bp)
app.register_blueprint(noticias_bp)

if __name__ == '__main__':
    app.run(debug=True)
