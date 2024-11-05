FROM node:18 AS builder

# Create app directory
WORKDIR /app

COPY package.json ./
COPY yarn.lock ./
COPY prisma ./prisma/

# Install app dependencies
RUN yarn install

COPY . .

RUN yarn build

FROM node:18

WORKDIR /app

COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./
COPY --from=builder /app/yarn.lock ./
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/.env ./
COPY --from=builder /app/prisma ./prisma

EXPOSE 3001

CMD [ "yarn", "start:prod:mig" ]