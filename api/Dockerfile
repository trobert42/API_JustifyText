FROM node:latest

WORKDIR /app

COPY package.json package.json

RUN apt update

RUN npm install

COPY . .

CMD ["npm", "run", "start"]