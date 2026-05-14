FROM node:22-alpine AS deps

WORKDIR /app

COPY next_logic/package*.json ./next_logic/
COPY websocket_logic/package*.json ./websocket_logic/

RUN npm ci --prefix next_logic
RUN npm ci --prefix websocket_logic
RUN npm install --prefix websocket_logic --no-save typescript

FROM deps AS builder

WORKDIR /app

COPY next_logic ./next_logic
COPY websocket_logic ./websocket_logic

RUN npm run build --prefix next_logic
RUN npx --prefix websocket_logic tsc -b websocket_logic

FROM node:22-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3000
ENV HOSTNAME=0.0.0.0

COPY next_logic/package*.json ./next_logic/
COPY websocket_logic/package*.json ./websocket_logic/

RUN npm ci --omit=dev --prefix next_logic
RUN npm ci --omit=dev --prefix websocket_logic

COPY --from=builder /app/next_logic/.next ./next_logic/.next
COPY --from=builder /app/next_logic/public ./next_logic/public
COPY --from=builder /app/next_logic/next.config.ts ./next_logic/next.config.ts
COPY --from=builder /app/websocket_logic/dist ./websocket_logic/dist

EXPOSE 3000 8080

CMD ["sh", "-c", "node websocket_logic/dist/index.js & npm run start --prefix next_logic"]
