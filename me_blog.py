from flask import Flask, send_from_directory
from dotenv import load_dotenv, find_dotenv
from os import path, environ
from app import routes as app_routes
from blog import routes as blog_routes

load_dotenv(find_dotenv())

PORT = environ.get("PORT")
DEBUG = environ.get("DEBUG") == "True"

app = Flask(__name__, template_folder="views", static_folder="dist")
app.register_blueprint(app_routes.app, url_prefix="/")
app.register_blueprint(blog_routes.app, url_prefix="/blog")

if __name__ == "__main__":
	app.run(
			host="localhost",
			port=PORT,
			debug=DEBUG
	)
