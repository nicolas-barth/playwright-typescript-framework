FROM node:20.5.1-bookworm-slim

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY . .

RUN npx playwright install --with-deps chromium

CMD ["npm", "run", "test:ui:smoke"]
