FROM node:16-alpine AS build
WORKDIR /source

COPY package.json yarn.lock ./
RUN yarn install

COPY . . 
RUN yarn build

FROM build AS runtime
ENV NODE_ENV=production
EXPOSE 3000

RUN yarn --production

ENTRYPOINT [ "yarn", "start:prod" ]
