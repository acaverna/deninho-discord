FROM node:12-alpine
WORKDIR /deninho
COPY . .
RUN yarn install
CMD ["node", "index.js"]
