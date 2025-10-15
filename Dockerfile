FROM node:22 AS build-stage
# RUN apk add --no-cache --update nodejs
WORKDIR /temp
COPY .next/standalone  ./.next/standalone
COPY .next/static     ./.next/standalone/.next/static
COPY .env /temp/.env
COPY public  ./.next/standalone/public/
CMD ["sh", "-c", "node .next/standalone/server.js"]
