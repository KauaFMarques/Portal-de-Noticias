from flask import Flask, jsonify
from backend.functions.noticias import *


app = Flask(__name__)

app.register_blueprint(noticias_bp)

if __name__ == "__main__":
    app.run(debug=True)
