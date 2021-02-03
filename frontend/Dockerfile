FROM node:10.13.0-slim as builder
WORKDIR /app
COPY angular.json package.json package-lock.json routes-mock.json solr-mock.json tsconfig.json tslint.json /app/
RUN npm ci
COPY src /app/src/
COPY e2e /app/e2e/
RUN npm run build

FROM nginx:1.15.6-alpine
COPY --from=builder /app/dist/frontend /usr/share/nginx/html
COPY nginx-config/default.conf /etc/nginx/conf.d/
CMD [ "nginx", "-g", "daemon off;"]
