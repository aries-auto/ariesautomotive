FROM gcr.io/google_appengine/nodejs

COPY . /app/
WORKDIR /app

CMD ["node", "build/server.js"]

EXPOSE 8080

