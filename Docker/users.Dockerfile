FROM node:10-alpine



WORKDIR /main
COPY ./package*.json /main

RUN npm install

COPY ./users.js /main
# COPY . .

EXPOSE 3001

CMD ["node", "users.js"]