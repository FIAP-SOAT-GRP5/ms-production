FROM --platform=linux/amd64 node:16.20-alpine3.16 as LUNCH-API-MASTER

WORKDIR /usr/app
COPY package.json /usr/app/
COPY .env /usr/app/
RUN npm install
COPY . .
EXPOSE 3000
CMD [ "npm" ,"start" ]







