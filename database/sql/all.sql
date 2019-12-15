\ir schema.sql
\ir views.sql
\ir triggers.sql
INSERT INTO customer_user(customer_tenant, customer_organization, customer_company_uuid, customer_company_name) VALUES ('224977', '224977-0001', '32652d3e-a1ad-4097-8dd6-b78f7503af6d', 'EMPY');
INSERT INTO supplier_user (supplier_tenant, supplier_organization, supplier_company_uuid, supplier_company_name) VALUES ('227019','227019-0001', '5210709b-9cd7-4d65-960b-c35279faab33', 'EMPBY');
INSERT INTO brand(supplier_id, brand_uuid, brand_name) VALUES ('2', 'b65c2b831b0a47d2b165c91a3c1db534', 'EXEMPLO');
INSERT INTO subscription(brand_id, customer_id) VALUES ('1', '1');
INSERT INTO sp_item(subscription_id, supplier_item, customer_item) VALUES ('1', 'ARTIGO','ART');
INSERT INTO sp_item(subscription_id, supplier_item, customer_item) VALUES ('1', 'EXEMPLO','EX');
INSERT INTO sp_item(subscription_id, supplier_item, customer_item) VALUES ('1', 'PORTES','PORT'); 