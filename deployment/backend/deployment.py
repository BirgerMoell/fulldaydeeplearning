import flask
from flask import jsonify, request
from flask_cors import CORS

from joblib import load

app = flask.Flask(__name__)
CORS(app, resources={r"/api/*": {"origins": "*"}})
model = load("model.joblib")


@app.route("/score/<path:text>")
def hello(text):

    out = model.predict([text])[0]

    return f"{out}"


@app.route("/api", methods=["POST"])
def classify():
    text = request.json["text"]
    out = model.predict([text])[0]
    return jsonify(f"{out}")
