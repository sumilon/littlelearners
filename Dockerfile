# ─────────────────────────────────────────────
# Stage 1 — Build
# ─────────────────────────────────────────────
FROM node:22-alpine AS builder

WORKDIR /app

# Install dependencies first (layer-cache friendly)
COPY package.json package-lock.json ./
RUN npm ci --frozen-lockfile

# Copy source and build
COPY . .
RUN npm run build

# ─────────────────────────────────────────────
# Stage 2 — Serve
# ─────────────────────────────────────────────
FROM nginx:1.27-alpine AS runner

# Remove default nginx config
RUN rm /etc/nginx/conf.d/default.conf

# Copy custom nginx config
COPY nginx.conf /etc/nginx/conf.d/app.conf

# Copy built assets from builder stage
COPY --from=builder /app/dist /usr/share/nginx/html

# Cloud Run requires the container to listen on $PORT (default 8080).
# nginx.conf already binds to 8080 — no runtime substitution needed.
EXPOSE 8080

# Run nginx in the foreground (required for Docker)
CMD ["nginx", "-g", "daemon off;"]
