FROM node:21-alpine

RUN echo "NPM Version:" && npm --version

# Install pnpm globally
RUN npm install -g pnpm

# Set the working directory inside the container
WORKDIR /app
COPY . /app/

# Copy package.json and pnpm-lock.yaml 
COPY ["package.json","pnpm-lock.yaml","./"]

# Install dependencies
RUN pnpm install

# Copy the rest of the application code to the working directory
COPY . .

# Expose the port the app runs on
EXPOSE 8080

# Command to run the application
CMD [ "pnpm", "start:dev" ]
