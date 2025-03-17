# Nuxt Minimal Starter

Look at the [Nuxt documentation](https://nuxt.com/docs/getting-started/introduction) to learn more.

## Requirements

- NodeJS (recommended v22.4.1)

## Setup

Make sure to install dependencies:

```bash
# npm
nvm use
npm install
```

## Development Server Setup

Update the `.env` file.

```env
NUXT_PUBLIC_API_BASE_URL="http://localhost:3113"

NUXT_FIREBASE_API_KEY=""
NUXT_FIREBASE_AUTH_DOMAIN=""
NUXT_FIREBASE_PROJECT_ID=""
NUXT_FIREBASE_STORAGE_BUCKET=""
NUXT_FIREBASE_MESSAGING_SENDER_ID=""
NUXT_FIREBASE_APP_ID=""
```

Start the development server on `http://localhost:3000`:

```bash
# npm
npm run dev
```

It should run both a development server as well as a json-server.

```
Development: http://localhost:3000
JSON Server: http://localhost:3113
```
