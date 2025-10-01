
FROM node:18-alpine AS builder
WORKDIR /app

RUN apk add --no-cache bash libc6-compat

COPY package*.json ./

RUN npm ci
COPY . .

RUN chmod -R 755 node_modules/.bin

RUN npm run build
FROM node:18-alpine AS runner
WORKDIR /app
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist

RUN addgroup -S nodejs && adduser -S nodejs -G nodejs
USER nodejs

ENV NODE_ENV=production

EXPOSE 4000

CMD ["node", "dist/server.js"]
