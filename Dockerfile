FROM node:10-alpine



WORKDIR /main/
COPY package*.json ./

RUN npm install
# RUN npm build

COPY . .
EXPOSE 3000


CMD ["npm", "start"]