import torch
import flask
from flask import jsonify, request
from flask_cors import CORS

import utils
import settings

app = flask.Flask(__name__)
CORS(app, resources={r"/api/*": {"origins": "*"}})


@app.route("/score/<path:text>")
def hello(text):

    out = model.transform(text)
    val = float(out)

    return f"{val}"


@app.route('/api',methods = ['POST'])
def classify():
      print("hej classifcy")
      text = request.json['text']
      out = model(features.view(1, -1))
      val = float(out)
      return jsonify(f"{val}")
