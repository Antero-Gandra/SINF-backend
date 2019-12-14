\ir schema.sql
\ir views.sql
\ir triggers.sql
INSERT INTO customer_user(customer_tenant, customer_organization, customer_company_uuid) VALUES ('123', 'SINFY', '14341234567898761234098767891234');
INSERT INTO supplier_user (supplier_tenant, supplier_organization, supplier_company_uuid) VALUES ('456','SINFY-B', 'b4022410b4e54417910368d600d54ef2');
INSERT INTO brand(supplier_id, brand_uuid, brand_name) VALUES ('2', 'b65c2b831b0a47d2b165c91a3c1db534', 'EXEMPLO');
INSERT INTO subscription(brand_id, customer_id) VALUES ('1', '1');