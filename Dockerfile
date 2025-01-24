FROM node:22-slim

RUN npx playwright install --with-deps chromium

COPY package*.json ./

RUN npm ci

COPY . .

RUN npm run build

CMD ["npm", "run", "test:update-snapshots"]
