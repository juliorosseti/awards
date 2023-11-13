FROM node:21-alpine

WORKDIR /app

COPY package.json .

RUN npm i

COPY . .

ENV PORT=3000 \
    TEST_MODE=false

EXPOSE 3000

CMD ["node", "application.js"]
