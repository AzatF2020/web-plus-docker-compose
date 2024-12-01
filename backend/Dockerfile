FROM node:18.20-alpine

RUN apk update && apk add bash

WORKDIR /var/www/backend

COPY package*.json .

RUN npm install

COPY . .

CMD ["npm", "run", "start:dev"]