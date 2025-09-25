from flask import Flask, send_from_directory
import os

app = Flask(__name__)

@app.route("/")
def home():
    return "Welcome to LifeLink API!"
