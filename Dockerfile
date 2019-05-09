FROM node:alpine AS build

COPY . .
RUN yarn install && yarn build

FROM node:alpine
WORKDIR /opt/off-import
COPY --from=build /dist ./
COPY --from=build /package.json ./
COPY --from=build /node_modules ./node_modules