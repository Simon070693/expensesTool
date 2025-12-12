DROP TABLE IF EXISTS expense;

CREATE EXTENSION IF NOT EXISTS "pgcrypto";

CREATE TABLE expense (
         id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
         description VARCHAR(255) NOT NULL,
         amount NUMERIC(10, 2) NOT NULL,
         date DATE NOT NULL,
         category_id UUID REFERENCES category(id)
);
