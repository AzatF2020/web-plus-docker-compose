FROM node:16-alpine

RUN apk update && apk add bash

WORKDIR /var/www/frontend

COPY package*.json .

RUN npm install 

COPY . .

CMD [ "npm", "run", "start" ]
