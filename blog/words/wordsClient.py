from blog.post import Post
from blog.postsClient import PostsClient
from requests import get
from dotenv import load_dotenv, find_dotenv
from os import path, environ

load_dotenv(environ.get("dotenv_config_path") or find_dotenv())

WORDS_URL = environ.get("WORDS_URL")


class WordsClient(PostsClient):
    def __init__(self):
        PostsClient.__init__(
            self,
            WORDS_URL + "/words"
        )

    def posts(self, params={}):
        postsJson = get(self.url, params=params).json()
        return map(lambda postJson: Post.fromJSON(postJson), postsJson)
