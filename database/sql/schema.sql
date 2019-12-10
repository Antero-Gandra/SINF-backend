-----------------------------------------------------------
-- Drop old schema and create new one
-----------------------------------------------------------

DROP SCHEMA IF EXISTS public CASCADE;
CREATE SCHEMA public;
ALTER SCHEMA public OWNER TO techsinf;
COMMENT ON SCHEMA public IS 'standard public schema';

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-----------------------------------------------------------
-- Types
-----------------------------------------------------------

CREATE DOMAIN PAST_TIMESTAMP AS TIMESTAMP(1) WITH TIME ZONE
DEFAULT CURRENT_TIMESTAMP(1) NOT NULL CHECK (VALUE <= CURRENT_TIMESTAMP(1));

CREATE TYPE TECHSINF_ROLE AS ENUM ('SUPPLIER', 'CUSTOMER');

CREATE TYPE ORDER_STAGE AS ENUM (
  'PURCHASE_ORDER',
  'REJECTED',
  'SALES_ORDER',
  'SALES_INVOICE',
  'PURCHASE_INVOICE',
  'COMPLETED'
);

-----------------------------------------------------------
-- Tables
-----------------------------------------------------------

-- All users. Each user is either a supplier or a customer.
CREATE TABLE "user"(
  user_id                   SERIAL PRIMARY KEY,
  tenant                    VARCHAR(20) NOT NULL,
  organization              VARCHAR(20) NOT NULL,
  user_kind                 TECHSINF_ROLE NOT NULL,
  company_uuid              UUID NOT NULL, -- PRIMAVERA USER (PRIVATE)
  user_createdat            PAST_TIMESTAMP,

  CONSTRAINT UserNaturalKey UNIQUE(tenant, organization, user_kind),
  CONSTRAINT UserUniqueCompany UNIQUE(company_uuid, user_kind)
);

-- All suppliers.
CREATE TABLE supplier(
  supplier_id               INTEGER UNIQUE NOT NULL,
  -- ... any extra stuff

  FOREIGN KEY(supplier_id) REFERENCES
    "user"(user_id) ON DELETE CASCADE
);

-- All customers.
CREATE TABLE customer(
  customer_id               INTEGER UNIQUE NOT NULL,
  -- ... any extra stuff

  FOREIGN KEY(customer_id) REFERENCES
    "user"(user_id) ON DELETE CASCADE
);

-- All registered supplier brands.
CREATE TABLE brand(
  brand_id                  SERIAL PRIMARY KEY,
  supplier_id               INTEGER NOT NULL,
  brand_uuid                UUID NOT NULL, -- PRIMAVERA SUPPLIER (PRIVATE)
  brand_createdat           PAST_TIMESTAMP,

  CONSTRAINT BrandUniqueInstance UNIQUE(brand_uuid),

  FOREIGN KEY(supplier_id) REFERENCES
    supplier(supplier_id) ON DELETE CASCADE
);

-- All subscriptions of customer to supplier brands.
CREATE TABLE subscription(
  subscription_id           SERIAL PRIMARY KEY,
  brand_id                  INTEGER NOT NULL,
  customer_id               INTEGER NOT NULL,
  subscription_createdat    PAST_TIMESTAMP,

  CONSTRAINT SubscriptionNaturalKey UNIQUE(brand_id, customer_id),

  FOREIGN KEY(brand_id) REFERENCES
    brand(brand_id) ON DELETE CASCADE,
  FOREIGN KEY(customer_id) REFERENCES
    customer(customer_id) ON DELETE CASCADE
);

-- Brand secret for subscriptions, generated on demand and issued to the supplier
CREATE TABLE secret_registry(
  secret_id                 SERIAL PRIMARY KEY,
  brand_id                  INTEGER NOT NULL,
  secret_key                UUID NOT NULL DEFAULT uuid_generate_v4(),
  secret_createdat          PAST_TIMESTAMP,

  FOREIGN KEY(brand_id) REFERENCES
    brand(brand_id) ON DELETE CASCADE
);

-- Double entry table matching Supplier's SalesItems with Customer's PurchaseItems.
CREATE TABLE sp_item(
  sp_item_id                SERIAL PRIMARY KEY,
  subscription_id           INTEGER NOT NULL,
  supplier_item_uuid        UUID NOT NULL, -- PRIMAVERA SUPPLIER (PRIVATE)
  customer_item_uuid        UUID NOT NULL, -- PRIMAVERA CUSTOMER (PRIVATE)
  sp_item_createdat         PAST_TIMESTAMP,

  CONSTRAINT SPItemNaturalKey UNIQUE(customer_item_uuid),

  FOREIGN KEY(subscription_id) REFERENCES
    subscription(subscription_id) ON DELETE CASCADE
);

-- ***** MASTER DATA ENDS HERE

-- All orders processed through the system.
CREATE TABLE orders(
  order_id                  SERIAL PRIMARY KEY,
  subscription_id           INTEGER NOT NULL,
  stage                     ORDER_STAGE NOT NULL,
  order_createdat           PAST_TIMESTAMP,

  FOREIGN KEY(subscription_id) REFERENCES
    subscription(subscription_id) ON DELETE CASCADE
);
