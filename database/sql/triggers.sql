-----------------------------------------------------------
-- Triggers
-----------------------------------------------------------

-- [CREATE SUPPLIER] INSTEAD OF INSERT ON supplier_user
DROP FUNCTION IF EXISTS create_user_row_supplier_procedure() CASCADE;
CREATE FUNCTION create_user_row_supplier_procedure()
RETURNS trigger AS
$$
DECLARE
  myuserid INTEGER;
BEGIN
  INSERT INTO "user"(tenant, organization, company_uuid, user_kind)
  VALUES (NEW.supplier_tenant, NEW.supplier_organization, NEW.supplier_company_uuid,
          'SUPPLIER')
  RETURNING user_id INTO myuserid;

  INSERT INTO supplier(supplier_id) VALUES (myuserid);

  SELECT * INTO NEW FROM supplier_user
  WHERE supplier_id = myuserid;

  RETURN NEW;
END;
$$
LANGUAGE plpgsql;

CREATE TRIGGER create_user_row_supplier
INSTEAD OF INSERT ON supplier_user
FOR EACH ROW
EXECUTE PROCEDURE create_user_row_supplier_procedure();

-- [CREATE CUSTOMER] INSTEAD OF INSERT ON customer_user
DROP FUNCTION IF EXISTS create_user_row_customer_procedure() CASCADE;
CREATE FUNCTION create_user_row_customer_procedure()
RETURNS trigger AS
$$
DECLARE
  myuserid INTEGER;
BEGIN
  INSERT INTO "user"(tenant, organization, company_uuid, user_kind)
  VALUES (NEW.customer_tenant, NEW.customer_organization, NEW.customer_company_uuid,
          'CUSTOMER')
  RETURNING user_id INTO myuserid;

  INSERT INTO customer(customer_id) VALUES (myuserid);

  SELECT (SELECT CENAS FROM CENAS) as a1, (SELECT CENAS FROM CENAS) as a2 INTO NEW
  FROM tabela WHERE id = 1;

  SELECT * INTO NEW FROM customer_user
  WHERE customer_id = myuserid;

  RETURN NEW;
END;
$$
LANGUAGE plpgsql;

CREATE TRIGGER create_user_row_customer
INSTEAD OF INSERT ON customer_user
FOR EACH ROW
EXECUTE PROCEDURE create_user_row_customer_procedure();

-- [DELETE SUPPLIER] INSTEAD OF DELETE ON supplier_user
DROP FUNCTION IF EXISTS delete_user_row_supplier_procedure() CASCADE;
CREATE FUNCTION delete_user_row_supplier_procedure()
RETURNS trigger AS
$$
BEGIN
  DELETE FROM "user" WHERE user_id = OLD.supplier_id;

  RETURN OLD;
END;
$$
LANGUAGE plpgsql;

CREATE TRIGGER delete_user_row_supplier
INSTEAD OF DELETE ON supplier_user
FOR EACH ROW
EXECUTE PROCEDURE delete_user_row_supplier_procedure();

-- [DELETE SUPPLIER] INSTEAD OF DELETE ON customer_user
DROP FUNCTION IF EXISTS delete_user_row_customer_procedure() CASCADE;
CREATE FUNCTION delete_user_row_customer_procedure()
RETURNS trigger AS
$$
BEGIN
  DELETE FROM "user" WHERE user_id = OLD.customer_id;

  RETURN OLD;
END;
$$
LANGUAGE plpgsql;

CREATE TRIGGER delete_user_row_customer
INSTEAD OF DELETE ON customer_user
FOR EACH ROW
EXECUTE PROCEDURE delete_user_row_customer_procedure();
