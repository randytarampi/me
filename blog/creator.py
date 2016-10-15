class Creator(object):
    """

    """

    def __init__(self, id, username, name, sourceUrl):
        self.id = id
        self.username = username
        self.name = name
        self.sourceUrl = sourceUrl

    def toJSON(self):
        return self.__dict__

    @staticmethod
    def fromJSON(json):
        return Creator(
            json.get("id"),
            json.get("username"),
            json.get("name"),
            json.get("sourceUrl")
        )
