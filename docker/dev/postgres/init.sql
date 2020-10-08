create database "habits-tracker-db";
create database "habits-tracker-db-test";

CREATE EXTENSION pgcrypto;

grant all privileges on database "habits-tracker-db" to "pguser";
grant all privileges on database "habits-tracker-db-test" to "pguser";

-- Create 'public' schema
-- so TypeORM migrations can be triggered.
-- The first migration will set the base app schema.
\connect "habits-tracker-db" "pguser";
CREATE SCHEMA public;
ALTER SCHEMA public OWNER TO pguser;
