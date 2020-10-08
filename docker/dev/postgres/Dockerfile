FROM postgres

ENV POSTGRES_USER pguser
ENV POSTGRES_PASSWORD pgpass
ENV POSTGRES_DB habits-tracker-db

COPY init.sql /docker-entrypoint-initdb.d/
