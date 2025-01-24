FROM node:22-alpine as builder

WORKDIR /app

COPY package.json /app/

RUN npm install

COPY . /app/

RUN npm run build

FROM node:22-alpine as runner

WORKDIR /app

COPY --from=builder /app/package.json /app/package.json
COPY --from=builder /app/dist /app/dist

RUN npm install --only=production

RUN npm install -g pm2

EXPOSE 8080

CMD ["pm2-runtime", "dist/index.js"]
