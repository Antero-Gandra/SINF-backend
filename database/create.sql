-----------------------------------------
-- Drop old schmema and create new one
-----------------------------------------

DROP TABLE IF EXISTS "user" CASCADE;
DROP TABLE IF EXISTS "buyer" CASCADE;
DROP TABLE IF EXISTS "seller" CASCADE;
DROP TABLE IF EXISTS "catalog" CASCADE;
DROP TABLE IF EXISTS "order" CASCADE;
DROP TABLE IF EXISTS "buyerSellerMatch" CASCADE;
DROP TABLE IF EXISTS "sellerBuyerOrder" CASCADE;
DROP TABLE IF EXISTS "product" CASCADE;
DROP TYPE IF EXISTS "order_stage" CASCADE;

-----------------------------------------
-- Types
-----------------------------------------

-- These types represent the order's current state in the system
-- PO: Purchase Order sent
-- OR: Received response, Order was Rejected
-- SO: Received response, order was accepted, Sales Order generated
-- SI: Sales invoice phase
-- PI: Purchase Invoice Generated 
-- C: Purchase order completed
CREATE TYPE "order_stage" AS ENUM ('PO', 'OR', 'SO', 'SI', 'PI', 'C');

-----------------------------------------
-- Tables
-----------------------------------------

CREATE TABLE "user"(
    id  SERIAL PRIMARY KEY,
    username  text UNIQUE NOT NULL ,
    password text NOT NULL CHECK (length(password) > 8),
    description text,
    email text UNIQUE NOT NULL
);

CREATE TABLE "buyer"(
    id SERIAL PRIMARY KEY,
    companyName text UNIQUE NOT NULL
);

CREATE TABLE "seller"(
    id SERIAL PRIMARY KEY,
    companyName text UNIQUE NOT NULL
);

-- Match between a tuple (Seller, Buyer, Order)
CREATE TABLE "sellerBuyerOrder"(
    id SERIAL PRIMARY KEY
);

-- These table exists to model a many to many relation between the seller and the buyer
CREATE TABLE "buyerSellerMatch"(
    seller_id INTEGER NOT NULL REFERENCES "seller"(id) ON DELETE CASCADE,
    buyer_id  INTEGER NOT NULL REFERENCES "buyer"(id) ON DELETE CASCADE,
    PRIMARY KEY (seller_id,buyer_id),
    order_table_entry INTEGER NOT NULL REFERENCES "sellerBuyerOrder"(id) ON DELETE CASCADE
);

CREATE TABLE "order"(
    id SERIAL PRIMARY KEY,
    description text UNIQUE NOT NULL,
    numberOfUnits INTEGER NOT NULL,
    price REAL NOT NULL,
    TYPE order_stage NOT NULL,
    order_table_entry INTEGER NOT NULL REFERENCES "sellerBuyerOrder"(id) ON DELETE CASCADE
);

CREATE TABLE "catalog" (
    id SERIAL PRIMARY KEY,
    seller_id INTEGER NOT NULL REFERENCES "seller"(id) ON DELETE CASCADE,
    buyer_id  INTEGER NOT NULL REFERENCES "buyer"(id) ON DELETE CASCADE
);

CREATE TABLE "product" (
    id SERIAL PRIMARY KEY,
    catalog_id INTEGER NOT NULL REFERENCES "catalog"(id) ON DELETE CASCADE,
    seller_id INTEGER NOT NULL REFERENCES "seller"(id) ON DELETE CASCADE
);

-----------------------------------------
-- end of table creation
-----------------------------------------