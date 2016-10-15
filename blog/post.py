from blog.creator import Creator


class Post(object):
    def __init__(self, postType, id, source, title, body, datePublished, dateCreated, sourceUrl, creator):
        self.type = postType if postType else type(self).__name__
        self.id = id
        self.source = source
        self.title = title
        self.body = body
        self.datePublished = datePublished
        self.dateCreated = dateCreated
        self.sourceUrl = sourceUrl
        self.creator = creator

    def __iter__(self):
        return self.datePublished

    def toJSON(self):
        json = self.__dict__
        if (self.creator != None):
            json["creator"] = self.creator.toJSON()
        return json

    @staticmethod
    def fromJSON(json):
        return Post(
            json.get("postType"),
            json.get("id"),
            json.get("source"),
            json.get("title"),
            json.get("body"),
            json.get("datePublished"),
            json.get("dateCreated"),
            json.get("sourceUrl"),
            Creator.fromJSON(json.get("creator")) if json.get("creator") else None,
        )
