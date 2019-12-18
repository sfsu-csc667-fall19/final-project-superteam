FROM node:10-alpine



WORKDIR /main
COPY ./package*.json /main

RUN npm install
# RUN npm build

COPY . /main
EXPOSE 3000


CMD ["npm", "start"]