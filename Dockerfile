FROM node:22-slim

WORKDIR /home/node/

RUN npx playwright install --with-deps chromium

COPY package*.json ./

RUN npm ci

COPY . .

RUN npm run build
