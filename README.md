# Spotify Wrapped Frequently

Spotify Wrapped Frequently shows top listening data on a running basis. Instead of waiting for the end of the year, users can view their top artists and tracks over the last month, last six months, and last year.

## Spotify Web API Setup

You will need a Spotify account and a Spotify Web API account. Once you have an API account, create an app using the "Create an app" section of https://developer.spotify.com/documentation/web-api/tutorials/getting-started#create-an-app. The app name and description can be anything. However, the redirect uri must be set to `[origin]/api/auth/callback/spotify`.

## Environment Variables

To run this project, you will need to add the following environment variables to your .env.local file

`AUTH_SECRET` Auth.js secret

`AUTH_URL` Auth.js host

`AUTH_REDIRECT_PROXY_URL` Auth.js redirect url

`SPOTIFY_ID` Spotify Web Api client id

`SPOTIFY_SECRET` Spotify Web Api client secret

To generate `AUTH_SECRET`:

```bash
  npx auth secret
```

`AUTH_URL` is `[origin]`, i.e. `http://127.0.0.1:3000`

`AUTH_REDIRECT_PROXY_URL` is `[origin]/api/auth`, i.e. `http://127.0.0.1:3000/api/auth`

## Installation

```bash
  npm install
```
    
## Run Locally

Set the Spotify redirect uri to `http://127.0.0.1:3000/api/auth/callback/spotify`

Set the .env.local `AUTH_URL` to `http://127.0.0.1:3000`

Set the .env.local `AUTH_REDIRECT_PROXY_URL` to `http://127.0.0.1:3000/api/auth`

Run

```bash
  npm run dev
```

## Build for Production

Set the Spotify redirect uri to `[origin]/api/auth/callback/spotify`

Set the .env.local `AUTH_URL` to `[origin]`

Set the .env.local `AUTH_REDIRECT_PROXY_URL` to `[origin]/api/auth`

```bash
  npm run build
```

## Run Production

```bash
  npm run start
```

