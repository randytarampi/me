# Post Sources

This document describes the configuration and setup for each post source in the service.

## WordPress

Fetches public blog posts from a WordPress.com site via the WordPress REST API.

- **API**: `GET /wp/v2/posts` on the configured API base
- **Auth**: None (public posts only)
- **Env vars**:
  - `WORDPRESS_USER_NAME` (required) — The blog author slug
  - `WORDPRESS_API_BASE` (optional) — API base URL, defaults to `https://randytarampi.wordpress.com`
- **Setup**: No API key needed. Just set the username.

## YouTube

Fetches uploads from a YouTube channel via the YouTube Data API v3.

- **API**: YouTube Data API v3 (`/channels` → `/playlistItems`)
- **Auth**: API Key (public data access)
- **Env vars**:
  - `YOUTUBE_API_KEY` (required) — Google API key with YouTube Data API v3 enabled
  - `YOUTUBE_CHANNEL_ID` (required) — The channel ID to fetch uploads from
- **Setup**:
  1. Go to [Google Cloud Console](https://console.cloud.google.com/)
  2. Create a project or select existing
  3. Enable the "YouTube Data API v3"
  4. Create an API key (restrict to YouTube Data API if desired)
  5. Find your channel ID from your YouTube channel URL

## Vimeo

Fetches videos from a Vimeo user via the Vimeo REST API.

- **API**: `GET /users/{user_id}/videos`
- **Auth**: OAuth 2.0 Bearer Token
- **Env vars**:
  - `VIMEO_ACCESS_TOKEN` (required) — OAuth 2.0 access token
  - `VIMEO_USER_ID` (required) — The Vimeo user ID (numeric)
- **Setup**:
  1. Go to [Vimeo Developer](https://developer.vimeo.com/)
  2. Create an app
  3. Generate an access token with the `public` scope
  4. Find your user ID from your Vimeo account settings

## StackOverflow

Fetches posts and answers from a StackOverflow user via the Stack Exchange API.

- **API**: `GET /users/{user_id}/posts` on `api.stackexchange.com`
- **Auth**: API Key (optional, increases quota from 300 to 10,000 requests/day)
- **Env vars**:
  - `STACKOVERFLOW_API_KEY` (optional) — Stack Exchange API key
  - `STACKOVERFLOW_USER_ID` (required) — The StackOverflow user ID (numeric)
- **Setup**:
  1. Go to [Stack Apps](https://stackapps.com/)
  2. Register an app to get an API key
  3. Find your user ID from your StackOverflow profile URL

## SoundCloud

Fetches tracks from a SoundCloud user via the SoundCloud API.

- **API**: `GET /users/{user_id}/tracks` on `api.soundcloud.com`
- **Auth**: OAuth 2.0 Bearer Token
- **Env vars**:
  - `SOUNDCLOUD_ACCESS_TOKEN` (required) — OAuth 2.0 access token
  - `SOUNDCLOUD_USER_ID` (required) — The SoundCloud user ID (numeric)
- **Setup**:
  1. Go to [SoundCloud Developers](https://developers.soundcloud.com/)
  2. Register an app
  3. Generate an OAuth token
  4. Find your user ID from your SoundCloud profile
- **Note**: SoundCloud API access is currently restricted/closed to new apps. Existing credentials will continue to work.
