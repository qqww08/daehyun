FROM node:16-alpine AS base
RUN apk add --no-cache libc6-compat

WORKDIR /app
COPY . .

RUN yarn && yarn build

EXPOSE 3000
ENV PORT 3000

CMD ["yarn", "start"]
