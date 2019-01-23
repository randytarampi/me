import {setupLocal as setupDynamoDbLocal} from "../src/serverless/dynamodb/util";

setupDynamoDbLocal();

process.env.AWS_XRAY_CONTEXT_MISSING = "LOG_ERROR";

process.env.LOCAL_DIRECTORY = "LOCAL_DIRECTORY";

process.env.FLICKR_API_KEY = "FLICKR_API_KEY";
process.env.FLICKR_API_SECRET = "FLICKR_API_SECRET";

process.env.TUMBLR_USER_NAME = "TUMBLR_USER_NAME";
process.env.TUMBLR_API_KEY = "TUMBLR_API_KEY";
process.env.TUMBLR_API_SECRET = "TUMBLR_API_SECRET";

process.env.SERVICE_POSTS_S3_BUCKET_NAME = "SERVICE_POSTS_S3_BUCKET_NAME";

process.env.UNSPLASH_API_KEY = "UNSPLASH_API_KEY";
process.env.UNSPLASH_API_SECRET = "UNSPLASH_API_SECRET";
process.env.UNSPLASH_USER_NAME = "UNSPLASH_USER_NAME";

process.env.INSTAGRAM_ACCESS_TOKEN = "INSTAGRAM_ACCESS_TOKEN";

process.env.TWITTER_API_BEARER_TOKEN = "TWITTER_API_BEARER_TOKEN";
process.env.TWITTER_API_BEARER_TOKEN_SECRET = "TWITTER_API_BEARER_TOKEN_SECRET";

process.env.SENTRY_DSN = "https://meow@sentry.io/woof";
process.env.LOGGER_ENABLED = "true";
process.env.LOGGER_STREAM_HUMAN_ENABLED = "true";
process.env.LOGGER_STREAM_STDOUT_ENABLED = "false";
process.env.LOGGER_STREAM_SENTRY_ENABLED = "false";
process.env.LOGGER_SRC_ENABLED = "true";

process.env.ME_PERSON_NAME = "Woof Woof";
process.env.ME_PERSON_JOB_TITLE = "Woofer";
process.env.ME_PERSON_DESCRIPTION = "Woofiest of Woofs";
process.env.ME_PERSON_IMAGE = "woof://woof.woof/image";
process.env.ME_PERSON_EMAIL = "woof@randytarampi.ca";

process.env.BLOG_URL = "woof://woof.woof/blog";
process.env.FEED_URL = "woof://woof.woof/feed.rss";
