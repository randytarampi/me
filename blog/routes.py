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
@app.route("/posts")
def posts():
    return jsonify(
        list(
            map(
                lambda post: post.toJSON(),
                sorted(
                    chain.from_iterable(
                        map(
                            lambda client: client.posts(),
                            INSTANTIATED_CLIENTS
                        )
                    ),
                    key=lambda post: post.datePublished,
                    reverse=True
                )
            )
        )
    )


@app.route("/photos")
def photos():
    return jsonify(
        list(
            sorted(
                map(
                    lambda photo: photo.toJSON(),
                    PHOTOS_CLIENT.posts()
                ),
                key=lambda post: post.datePublished,
                reverse=True
            )
        )
    )


@app.route("/words")
def words():
    return jsonify(
        list(
            sorted(
                map(
                    lambda post: post.toJSON(),
                    WORDS_CLIENT.posts()
                ),
                key=lambda post: post.datePublished,
                reverse=True
            )
        )
    )
