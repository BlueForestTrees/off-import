FROM node:alpine AS build

COPY . .
RUN yarn install && yarn build

FROM node:alpine
WORKDIR /opt/off-import
COPY --from=build /dist ./
COPY --from=build /dist/package.json ./
COPY --from=build /dist/node_modules ./node_modules