FROM node:20.11.0-alpine

WORKDIR /backend
# COPY ./backend ./
# COPY .env ./

COPY . .

ENTRYPOINT ["/bin/sh", "-c", "npm install && npm run dev"]