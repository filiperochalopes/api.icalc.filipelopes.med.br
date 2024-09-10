FROM node:20-alpine

COPY . /app
WORKDIR /app

RUN yarn
RUN yarn build

RUN chmod +x start.sh

CMD sh ./start.sh