FROM node:10-alpine



WORKDIR /main
# COPY ./package*.json /main
COPY ./package.json /main
COPY ./package-lock.json /main
RUN npm install

COPY ./gateway.js /main

# COPY . .
EXPOSE 4000

CMD ["node", "gateway.js"]