FROM node:21-alpine3.17

WORKDIR /app

COPY package.json package.json

RUN apk update && apk add g++ make py3-pip

RUN npm install --ci

COPY . .

CMD ["npm", "run", "start"]
