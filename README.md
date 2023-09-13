## Prerequisites

Unfortunately, due to time limitation I was not able to finish everything on a frontend side, but I was trying to make as much as possible.

I have made additional feature: Authorization using JWT. Current implementation using local storage on clint side and use only access token, without refresh one. This is not the secure way, if I had more time, it would be done by using by storing access token under HTTP only cookies and using refresh token.

## Backend

### Setup

First of all you need to install packages. Go to `/backend` and run:

```bash
npm install
```

Then create `.env` file in the directory root with next variables:

```dotenv
# App
BACKEND_PORT=3020
BACKEND_JWT_SECRET=anything_you_want

# Database
DB_PORT=27017
DB_USER=was_sent_in_mail_or_direct_message
DB_PASSWORD=was_sent_in_mail_or_direct_message
DB_NAME=was_sent_in_mail_or_direct_message
```

Now you can start an app by executing:

```bash
npm run start:dev
```

### Postman

In the repository root you can find Postman collection and environment

## Client

### Setup

First you need to install dependencies

```bash
npm run install
```

Now you can run by executing:

```bash
npm run start
```

App will be available on port `3021`