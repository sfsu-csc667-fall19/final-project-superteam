FROM node:10-alpine



WORKDIR /main/
COPY package*.json ./

RUN npm install

COPY . .
# COPY ./users.js /main

EXPOSE 3001

CMD ["node", "users.js"]