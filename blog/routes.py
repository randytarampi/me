from blog.photos.photosClient import PhotosClient
from blog.words.wordsClient import WordsClient
from flask import Blueprint, render_template, jsonify
from itertools import chain

PHOTOS_CLIENT = PhotosClient()
WORDS_CLIENT = WordsClient()
INSTANTIATED_CLIENTS = [
    PHOTOS_CLIENT,
    WORDS_CLIENT,
]

app = Blueprint("blog", __name__, template_folder="../views")


@app.route("/")
def posts():
    return jsonify(
        list(
            map(
                lambda post: post.toJSON(),
                chain.from_iterable(
                    map(
                        lambda client: client.posts(),
                        INSTANTIATED_CLIENTS
                    )
                )
            )
        )
    )
