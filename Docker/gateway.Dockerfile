FROM node:10-alpine



WORKDIR /main/
COPY package*.json ./

RUN npm install

# COPY . .
COPY ./gateway.js /main
EXPOSE 4000

CMD ["node", "gateway.js"]