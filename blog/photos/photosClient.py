from blog.photos.photo import Photo
from blog.postsClient import PostsClient
from requests import get
from dotenv import load_dotenv, find_dotenv
from os import path, environ

load_dotenv(environ.get("dotenv_config_path") or find_dotenv())

PHOTOS_URL = environ.get("PHOTOS_URL")


class PhotosClient(PostsClient):
    def __init__(self):
        PostsClient.__init__(
            self,
            PHOTOS_URL + "/posts"
        )

    def posts(self, params={}):
        photosJson = get(self.url, params=params).json()
        return list(
            map(
                lambda photoJson: Photo.fromJSON(photoJson),
                photosJson
            )
        )
