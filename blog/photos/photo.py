from blog.post import Post
from blog.creator import Creator


class Photo(Post):
    """

    """

    def __init__(self, type, id, source, title, body, datePublished, dateCreated, sourceUrl, creator, width, height, sizedPhotos):
        Post.__init__(self, type, id, source, title, body, datePublished, dateCreated, sourceUrl, creator)
        self.width = width
        self.height = height
        self.sizedPhotos = sizedPhotos

    @staticmethod
    def fromJSON(json):
        return Photo(
            json.get("type"),
            json.get("id"),
            json.get("source"),
            json.get("title"),
            json.get("body"),
            json.get("datePublished"),
            json.get("dateCreated"),
            json.get("sourceUrl"),
            Creator.fromJSON(json.get("creator")) if json.get("creator") else None,
            json.get("width"),
            json.get("height"),
            json.get("sizedPhotos"),
        )
