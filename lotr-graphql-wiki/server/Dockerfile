FROM node:22-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY prisma ./prisma
COPY prisma.config.ts ./
COPY tsconfig.json ./
RUN npx prisma generate

COPY src ./src

EXPOSE 4000

CMD ["npm", "start"]
