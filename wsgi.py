from me_blog import app
from dotenv import load_dotenv, find_dotenv
from os import environ

load_dotenv(environ.get("dotenv_config_path") or find_dotenv())

PORT = environ.get("PORT")
DEBUG = environ.get("DEBUG") == "True"

if __name__ == "__main__":
	app.run(
			host="localhost",
			port=PORT,
			debug=DEBUG
	)
