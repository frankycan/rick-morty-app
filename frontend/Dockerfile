FROM node:20.11.0-alpine

WORKDIR /frontend
# COPY ./frontend ./
# COPY .env ./

COPY . .

ENTRYPOINT ["/bin/sh", "-c", "npm install && npm run start"]
