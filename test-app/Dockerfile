# Expo dev server for serving the app to the Android emulator
FROM node:20-slim

WORKDIR /app

# Install dependencies first for better layer caching
COPY package.json package-lock.json ./
RUN npm ci

# Copy app source
COPY . .

# Expo dev server port
EXPOSE 8081

# Start Expo in tunnel mode so the Android emulator can connect
# --non-interactive prevents prompts, --lan serves on local network
CMD ["npx", "expo", "start", "--lan", "--non-interactive"]
