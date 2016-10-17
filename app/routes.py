from flask import Blueprint, render_template, send_from_directory, Response
from os import path

app = Blueprint("app", __name__)


@app.route("")
def index():
    return render_template("index.html")


@app.route("_hc")
def healthCheck():
    return Response(
        open("README.md", "r").read()
    )


@app.route("favicon.ico")
def favicon():
    return send_from_directory(
        path.join(app.root_path, "public", "assets"),
        "favicon.ico",
        mimetype="image/vnd.microsoft.icon"
    )
