# Builder stage
FROM node:16-alpine AS builder

RUN apk update && apk add bash

ARG NODE_PATH

WORKDIR /var/www/frontend

COPY package*.json .

RUN npm ci --no-audit --no-fund

COPY . .

RUN npm run build

# Development stage
FROM builder AS development

RUN npm install --only-development

CMD [ "npm", "run", "start" ]

# Production runner stage
FROM nginx:alpine AS runner

RUN apk update && apk add bash

WORKDIR /var/www/frontend

COPY --from=builder /var/www/frontend/build /usr/share/nginx/html

COPY ./nginx/conf.d/default.conf /etc/nginx/conf.d

CMD ["nginx", "-g", "daemon off;"]
