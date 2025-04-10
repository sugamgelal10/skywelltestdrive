FROM node:lts-alpine

ARG BASE_URL
ARG CDN_URL

ENV BASE_URL=${BASE_URL}
ENV CDN_URL=${CDN_URL}

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 4173

RUN npm run build

RUN npm install -g vite

CMD ["vite", "preview", "--host"]