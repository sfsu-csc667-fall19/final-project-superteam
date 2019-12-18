FROM node:10-alpine



WORKDIR /main
COPY ./package*.json /main

RUN npm install

COPY ./websocket.js /main
# COPY . .

EXPOSE 3003

CMD ["node", "websocket.js"]