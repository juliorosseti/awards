FROM node:21-alpine

WORKDIR /app

COPY package.json .

RUN npm i

COPY . .

EXPOSE 3000

CMD ["node", "application.js"]
