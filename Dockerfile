FROM node:22-slim

WORKDIR /usr/src/app

COPY . .

RUN npm install

RUN npx playwright install --with-deps chromium

RUN npm run build

CMD ["npm", "run", "test:update-snapshots"]
