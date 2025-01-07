FROM node:20

WORKDIR /usr/src/app

COPY . .

RUN npm ci

RUN npm test

RUN npm run build

RUN npm install -g serve

CMD ["serve", "dist"]