FROM node:24-slim

WORKDIR /home/node/

COPY package*.json ./

RUN npm ci

RUN npx playwright install --with-deps chromium

COPY . .

RUN npm run build
