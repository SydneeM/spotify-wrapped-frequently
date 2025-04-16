# Spotify Wrapped Frequently
Spotify Wrapped Frequently shows top listening data on a running basis. Instead of waiting for the end of the year, users can view their top artists and tracks over the last month, last six months, and last year.

<img width="1724" alt="spotify-wrapped" src="https://github.com/user-attachments/assets/4aae8f04-5c49-489d-8a4b-f727fb5cb33f" />

## Spotify Web API Setup

You will need a Spotify account and a Spotify Web API account. Once you have both accounts, login to the Spotify Web API account and [create a new app](https://developer.spotify.com/documentation/web-api/tutorials/getting-started#create-an-app). The app name and description can be anything. However, the redirect uri must be set to `[origin]/api/auth/callback/spotify`, i.e. `http://127.0.0.1:3000/api/auth/callback/spotify`.

## Environment Variables

To run this project, you will need to add the following environment variables to your .env.local file

`AUTH_SECRET` Auth.js secret

`AUTH_REDIRECT_PROXY_URL` Auth.js redirect url

`AUTH_TRUST_HOST` Auth.js trust host from reverse proxy flag

`SPOTIFY_ID` Spotify Web API client id

`SPOTIFY_SECRET` Spotify Web API client secret

<br/>

- To generate `AUTH_SECRET`:

```bash
  npx auth secret
```

- `AUTH_REDIRECT_PROXY_URL` is `[origin]/api/auth`, i.e. `http://127.0.0.1:3000/api/auth`

- `AUTH_TRUST_HOST` should be set to `true`

## Installation

```bash
  npm install
```
    
## Run Locally

Set the Spotify Web API redirect uri to `http://127.0.0.1:3000/api/auth/callback/spotify`

Set the .env.local `AUTH_REDIRECT_PROXY_URL` to `http://127.0.0.1:3000/api/auth`

Run

```bash
  npm run dev
```

## Build for Production

Set the Spotify Web API redirect uri to `[origin]/api/auth/callback/spotify`

Set the .env.local `AUTH_REDIRECT_PROXY_URL` to `[origin]/api/auth`

```bash
  npm run build
```

## Run Production

```bash
  npm run start
```

