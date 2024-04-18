from flask import Flask, jsonify
from functions import noticias


app = Flask(__name__)

app.register_blueprint(noticias.noticias_bp)

if __name__ == "__main__":
    app.run(debug=True)
