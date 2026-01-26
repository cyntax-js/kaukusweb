# ==============================
# Stage 1: Build the React app
# ==============================
FROM node:20-alpine AS builder

# Set working directory
WORKDIR /app

# Copy package.json and yarn.lock
COPY package.json yarn.lock ./

# Install dependencies using Yarn (pre-installed in Node 20-alpine)
RUN yarn install --frozen-lockfile

# Copy source code
COPY . .

# Build the app
RUN yarn build

# ==============================
# Stage 2: Serve with Nginx
# ==============================
FROM nginx:1.27-alpine

# Copy React build from builder stage
COPY --from=builder /app/dist /usr/share/nginx/html/

# Copy custom Nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose HTTP port
EXPOSE 80

# Run Nginx in foreground
CMD ["nginx", "-g", "daemon off;"]