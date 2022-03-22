FROM node:lts as deps
WORKDIR /todoapp
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

FROM node:lts as builder
WORKDIR /todoapp
COPY . .
COPY --from=deps /todoapp/node_modules ./node_modules
RUN yarn build

FROM node:lts as runner
WORKDIR /todoapp
ENV NODE_ENV production

COPY --from=builder /todoapp/public ./public
COPY --from=builder /todoapp/.next ./.next
COPY --from=builder /todoapp/node_modules ./node_modules
COPY --from=builder /todoapp/package.json ./package.json

EXPOSE 3000
CMD ["yarn", "start"]