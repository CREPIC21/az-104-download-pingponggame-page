# Use an official Node.js runtime as a parent image
FROM node:19-alpine

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy all the local files to the container excluding .env
COPY . .dockerignore /app/

# Expose the port the app runs on
EXPOSE 5000

# Command to run your application
CMD ["node", "index.js"]

############################################################################################
# docker build -t crepic21/ponggame:2.0.0.RELEASE .
# docker login
# docker push crepic21/ponggame:2.0.0.RELEASE
# docker run --env-file .env -i -t -d -p 5000:5000 crepic21/ponggame:2.0.0.RELEASE
############################################################################################
