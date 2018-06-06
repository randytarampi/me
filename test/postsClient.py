import unittest
from blog.postsClient import PostsClient

class TestPostsClient(unittest.TestCase):
    def test___init__(self):
        url = "woof://grr/meow"
        client = PostsClient(url)
        self.assertEqual(client.url, url)

    def test_posts(self):

    def test_post(self):

if __name__ == '__main__':
    unittest.main()
