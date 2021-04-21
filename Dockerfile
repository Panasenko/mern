FROM node:14

WORKDIR /usr/src/app

COPY ./src/package*.json ./

RUN npm install

COPY ./src/ .

EXPOSE 5000
CMD [ "npm", "start" ]
