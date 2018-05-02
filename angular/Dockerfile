FROM node:8.11.1-alpine

WORKDIR /app

COPY package.json /app/
COPY package-lock.json /app/

RUN npm install

COPY . /app/
CMD [ "npm", "run-script", "start" ]
