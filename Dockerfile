FROM node:20-alpine

COPY . /app
WORKDIR /app/src

RUN yarn

WORKDIR /app

RUN chmod +x start.sh

CMD sh ./start.sh