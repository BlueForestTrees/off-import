FROM node:alpine AS build

COPY . .
RUN yarn install && yarn build

FROM node:alpine
COPY --from=build /app/dist /