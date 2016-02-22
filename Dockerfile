FROM gcr.io/google_appengine/nodejs

RUN install_node v5.2.0
COPY build /app

WORKDIR /app

RUN npm install

CMD npm start