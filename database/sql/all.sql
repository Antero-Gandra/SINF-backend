\ir schema.sql
\ir views.sql
\ir triggers.sql
INSERT INTO customer_user(customer_tenant, customer_organization, customer_company_uuid, customer_company_name) VALUES ('123', 'SINFY', '14341234567898761234098767891234', 'NAME');
INSERT INTO supplier_user (supplier_tenant, supplier_organization, supplier_company_uuid, supplier_company_name) VALUES ('456','SINFY-B', 'b4022410b4e54417910368d600d54ef2', 'NAME');
INSERT INTO brand(supplier_id, brand_uuid, brand_name) VALUES ('2', 'b65c2b831b0a47d2b165c91a3c1db534', 'EXEMPLO');
INSERT INTO subscription(brand_id, customer_id) VALUES ('1', '1');
INSERT INTO sp_item(subscription_id, supplier_item, customer_item) VALUES ('1', 'ARTIGO','ART');
INSERT INTO sp_item(subscription_id, supplier_item, customer_item) VALUES ('1', 'EXEMPLO','EX');
INSERT INTO sp_item(subscription_id, supplier_item, customer_item) VALUES ('1', 'PORTES','PORT'); 