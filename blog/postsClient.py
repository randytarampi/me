class PostsClient(object):
    """
        An abstract class describing the necessary interfaces for a drop-in client for fetching Posts
    """

    def __init__(self, url):
        self.url = url

    def posts(self, params):
        raise NotImplementedError("Should have implemented this")

    def post(self, id, params):
        raise NotImplementedError("Should have implemented this")
