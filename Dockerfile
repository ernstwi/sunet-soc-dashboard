FROM node:latest as build

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

ARG COLLECTOR_URL
ARG JWT_URL
ARG PER_PAGE

COPY src src
COPY .babelrc .eslintrc.json .parcelrc ./

RUN npm run build

FROM nginx AS server
WORKDIR /usr/share/nginx/html

COPY --from=build /usr/src/app/dist ./

COPY nginx-entrypoint.sh .
COPY inject_template.js .
RUN apt update
RUN apt install -y gettext

EXPOSE 80

ENTRYPOINT ["sh", "./nginx-entrypoint.sh"]