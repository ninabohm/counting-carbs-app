FROM node:19-slim

RUN apt-get update
RUN apt-get install -y openssl

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . ./

RUN npx prisma generate

RUN npm run build

CMD [ "npm", "run", "start:prod" ]

