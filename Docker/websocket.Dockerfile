FROM node:10-alpine



WORKDIR /main/
COPY package*.json ./

RUN npm install

COPY . .
# COPY ./websocket.js /main

EXPOSE 3003

CMD ["node", "websocket.js"]