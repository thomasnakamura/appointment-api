FROM node:18

WORKDIR /app

COPY package*.json ./

RUN npm install --include=dev

COPY prisma ./prisma

COPY . .

ENV PRISMA_CLI_QUERY_ENGINE_TYPE=binary

RUN npx prisma generate

RUN ls -la src/generated/prisma

RUN ls -la node_modules/.prisma

RUN npm run build

EXPOSE 3000

CMD ["npm", "run", "start"]
