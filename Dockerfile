FROM node:22.23.4-bookworm-slim
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci --ignore-scripts --no-audit --no-fund
COPY . .
CMD ["npm", "run", "inspect"]
