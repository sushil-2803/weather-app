FROM node:22-alpine as build

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm ci
COPY . .

EXPOSE 80

CMD ["npm", "run", "start"]