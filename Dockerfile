FROM node:15.5.0

WORKDIR /usr/src

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3001

CMD [ "node", "src/index.js" ]