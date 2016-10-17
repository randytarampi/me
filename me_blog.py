from flask import Flask
from dotenv import load_dotenv, find_dotenv
from os import environ
from app import routes as app_routes
from blog import routes as blog_routes

load_dotenv(environ.get("dotenv_config_path") or find_dotenv())

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
