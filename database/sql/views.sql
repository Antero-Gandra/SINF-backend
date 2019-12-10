-----------------------------------------
-- Views
-----------------------------------------

-- I made these a priori, many will be useless

-- * ABSTRACT USER, SUPPLIER, CUSTOMER

-- supplier JOIN user
CREATE OR REPLACE VIEW supplier_user AS
SELECT S.*,
  U.tenant AS supplier_tenant,
  U.organization AS supplier_organization,
  U.company_uuid AS supplier_company_uuid,
  U.user_createdat AS supplier_created_at
FROM "user" U
JOIN supplier S ON U.user_id = S.supplier_id;

-- customer JOIN user
CREATE OR REPLACE VIEW customer_user AS
SELECT C.*,
  U.tenant AS customer_tenant,
  U.organization AS customer_organization,
  U.company_uuid AS customer_company_uuid,
  U.user_createdat AS customer_created_at
FROM "user" U
JOIN customer C ON U.user_id = C.customer_id;

-- * BRAND, SUBSCRIPTION

-- supplier JOIN brand
CREATE OR REPLACE VIEW supplier_brand AS
SELECT *
FROM supplier_user SU
NATURAL JOIN brand B;

-- customer JOIN subscription
CREATE OR REPLACE VIEW customer_subscription AS
SELECT *
FROM customer_user CU
NATURAL JOIN subscription S;

-- customer JOIN subscription JOIN brand
CREATE OR REPLACE VIEW customer_brand AS
SELECT *
FROM customer_user CU
NATURAL JOIN subscription S
NATURAL JOIN brand B;

-- supplier JOIN brand JOIN subscription
CREATE OR REPLACE VIEW supplier_subscription AS
SELECT *
FROM supplier_user SU
NATURAL JOIN brand B
NATURAL JOIN subscription S;

-- * SECRET REGISTRY

-- brand JOIN secret_registry
CREATE OR REPLACE VIEW brand_secret AS
SELECT *
FROM brand B
NATURAL JOIN secret_registry R;

-- brand JOIN secret_registry JOIN supplier
CREATE OR REPLACE VIEW brand_secret_supplier AS
SELECT *
FROM brand B
NATURAL JOIN secret_registry R
NATURAL JOIN supplier S;

-- * SP_ITEM

-- subscription JOIN brand JOIN sp_item
CREATE OR REPLACE VIEW subscription_brand_sp_item AS
SELECT *
FROM sp_item I
NATURAL JOIN subscription S
NATURAL JOIN brand B;

-- supplier JOIN sp_item
CREATE OR REPLACE VIEW supplier_sp_item AS
SELECT *
FROM supplier_user SU
NATURAL JOIN sp_item I;

-- customer JOIN sp_item
CREATE OR REPLACE VIEW customer_sp_item AS
SELECT *
FROM customer_user CU
NATURAL JOIN sp_item I;

-- * ORDERS

-- subscription JOIN orders
CREATE OR REPLACE VIEW subscription_orders AS
SELECT *
FROM subscription S
NATURAL JOIN orders O;

-- subscription JOIN brand JOIN orders
CREATE OR REPLACE VIEW subscription_brand_orders AS
SELECT *
FROM brand B
NATURAL JOIN subscription S
NATURAL JOIN orders O;

-- supplier JOIN brand JOIN subscription JOIN orders
CREATE OR REPLACE VIEW supplier_subscription_order AS
SELECT *
FROM supplier_user SU
NATURAL JOIN brand B
NATURAL JOIN subscription S
NATURAL JOIN orders O;

-- customer JOIN brand JOIN subscription JOIN orders
CREATE OR REPLACE VIEW customer_subscription_order AS
SELECT *
FROM customer_user CU
NATURAL JOIN subscription S
NATURAL JOIN brand B
NATURAL JOIN orders O;
