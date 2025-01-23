FROM postgres

ENV POSTGRES_PASSWORD=docker
ENV POSTGRES_DB=movies

COPY movies.sql /docker-entrypoint-initdb.d/
