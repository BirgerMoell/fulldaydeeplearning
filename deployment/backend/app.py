import flask
from flask import jsonify, request
from flask_cors import CORS

from joblib import load
import os

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


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=int(os.environ.get("PORT", 5000)))
