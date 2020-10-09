FROM postgres

ENV POSTGRES_USER pguser
ENV POSTGRES_PASSWORD pgpass
ENV POSTGRES_DB habits-tracker-db
ENV TZ UTC
ENV PGTZ UTC

COPY init.sql /docker-entrypoint-initdb.d/
