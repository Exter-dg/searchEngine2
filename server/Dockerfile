FROM gcr.io/google-appengine/nodejs

RUN apt-get update \
 && apt-get install -y ghostscript=10.01.0 graphicsmagick=1.3.40

# Install node.js v16.19.1
RUN install_node v16.19.1

# Create app directory
WORKDIR /usr/src/app
# Bundle app source
COPY . ./
# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN npm install
# If you are building your code for production
# RUN npm ci --only=production



EXPOSE 8080
CMD [ "node", "index.js" ]