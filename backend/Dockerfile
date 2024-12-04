# Builder stage
FROM node:18-alpine AS builder

RUN apk update && apk add bash

WORKDIR /app

COPY package*.json .

RUN npm ci --no-audit --no-fund

COPY . .

RUN npm run build

# Development stage
FROM builder as development

RUN npm install --only-development && \
    npm install -g @nestjs/cli

CMD ["node", "dist/main.js"]

# Production runner stage
FROM node:18-alpine AS runner

RUN apk update && apk add bash

WORKDIR /app

COPY package*.json .

RUN npm ci --omit-dev --no-audit --no-fund \
    && npm i -g pm2

COPY --from=builder /app/dist ./dist

COPY ./ecosystem.config.js ./

CMD ["pm2-runtime", "start", "ecosystem.config.js"]