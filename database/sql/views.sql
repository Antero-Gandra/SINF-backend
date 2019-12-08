-----------------------------------------
-- Views
-----------------------------------------

-- * ABSTRACT USER, SUPPLIER, CUSTOMER

-- Practical supplier view
CREATE OR REPLACE VIEW supplier_user AS
SELECT S.*,
  U.tenant AS supplier_tenant,
  U.organization AS supplier_organization,
  U.company_uuid AS supplier_company_uuid,
  U.user_createdat AS supplier_created_at
FROM "user" U
JOIN supplier S ON U.user_id = S.supplier_id;

-- Practical customer table
CREATE OR REPLACE VIEW customer_user AS
SELECT C.*,
  U.tenant AS customer_tenant,
  U.organization AS customer_organization,
  U.company_uuid AS customer_company_uuid,
  U.user_createdat AS customer_created_at
FROM "user" U
JOIN customer C ON U.user_id = C.customer_id;

-- * SP_ITEM

CREATE OR REPLACE VIEW supplier_sp_item AS
SELECT *
FROM supplier_user SU
NATURAL JOIN sp_item I;

CREATE OR REPLACE VIEW customer_sp_item AS
SELECT *
FROM customer_user CU
NATURAL JOIN sp_item I;

-- * BRAND, SUBSCRIPTION

-- All brands created by a supplier
CREATE OR REPLACE VIEW supplier_brand AS
SELECT *
FROM supplier_user SU
NATURAL JOIN brand B;

-- All subscriptions of a customer
CREATE OR REPLACE VIEW customer_subscription AS
SELECT *
FROM customer_user CU
NATURAL JOIN subscription S;

-- All subscriptions of a supplier's brands
CREATE OR REPLACE VIEW supplier_subscription AS
SELECT *
FROM supplier_user SU
NATURAL JOIN brand B
NATURAL JOIN subscription S;

-- * ORDERS

-- All orders matching a subscription being processed through the system
CREATE OR REPLACE VIEW subscription_orders AS
SELECT *
FROM subscription S
NATURAL JOIN orders O;

-- All secrets generated for a brand
CREATE OR REPLACE VIEW brand_secret AS
SELECT *
FROM brand B
NATURAL JOIN secret_registry R;

CREATE OR REPLACE VIEW supplier_subscription_order AS
SELECT *
FROM supplier_user SU
NATURAL JOIN brand B
NATURAL JOIN subscription S
NATURAL JOIN orders O;

CREATE OR REPLACE VIEW customer_subscription_order AS
SELECT *
FROM customer_user CU
NATURAL JOIN subscription S
NATURAL JOIN orders O;

-- All SalesItems - PurchaseItems pairs for a given pair of supplier-customer.
CREATE OR REPLACE VIEW subscription_sp_item AS
SELECT *
FROM sp_item I
NATURAL JOIN subscription S
NATURAL JOIN brand B
NATURAL JOIN supplier_user SU
NATURAL JOIN customer_user CU;
