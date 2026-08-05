FROM node:20.19.6-alpine3.22 AS base

WORKDIR /app
RUN apk add --no-cache openssl

FROM base AS dependencies

COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

FROM dependencies AS builder

COPY . .
RUN yarn build

FROM base AS production-dependencies

COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile --production=true

FROM base AS runner

ENV NODE_ENV=production

COPY --from=production-dependencies /app/node_modules ./node_modules
COPY --from=builder /app/node_modules/.prisma ./node_modules/.prisma
COPY --from=builder /app/dist ./dist

EXPOSE 4000

CMD ["yarn", "start"]

FROM dependencies AS development

COPY . .

CMD ["yarn", "dev"]
