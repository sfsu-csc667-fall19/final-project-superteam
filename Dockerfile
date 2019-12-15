FROM node:10-alpine



WORKDIR /main
COPY package*.json /main

RUN npm install

COPY . /main
EXPOSE 80

CMD ["npm", "start"]