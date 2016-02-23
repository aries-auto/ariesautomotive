FROM gcr.io/google_appengine/nodejs

RUN install_node v5.2.0
COPY build /app

WORKDIR /app

RUN npm uninstall babel
RUN npm install -g babel-cli
RUN npm install
RUN npm run build -- --release
CMD node build/server.js
