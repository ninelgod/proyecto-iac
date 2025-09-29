# Stage 1: Build
FROM node:18-alpine AS builder
WORKDIR /app

# Instala bash y utilidades
RUN apk add --no-cache bash libc6-compat

# Copia los package.json y package-lock.json
COPY package*.json ./

# Instala todas las dependencias (dev + prod)
RUN npm ci

# Copia el resto del código
COPY . .

# Asegura permisos para los binarios (next, etc)
RUN chmod -R 755 node_modules/.bin

# Build de Next.js
RUN npm run build

# Stage 2: Production image
FROM node:18-alpine AS runner
WORKDIR /app

# Copia solo lo necesario para producción
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/node_modules ./node_modules
#COPY --from=builder /app/.next ./.next
#COPY --from=builder /app/public ./public
COPY --from=builder /app/dist ./dist

# Usuario no root
RUN addgroup -S nodejs && adduser -S nodejs -G nodejs
USER nodejs

ENV NODE_ENV=production

EXPOSE 4000

CMD ["node", "dist/server.js"]
