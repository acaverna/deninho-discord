FROM node:14-alpine
WORKDIR /deninho
COPY . .
RUN yarn install
CMD ["node", "index.js"]
