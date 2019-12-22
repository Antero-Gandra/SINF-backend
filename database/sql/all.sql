\ir schema.sql
\ir views.sql
\ir triggers.sql

INSERT INTO customer_user(customer_tenant, customer_organization, customer_company_uuid, customer_company_name) VALUES ('224977', '224977-0001', '32652d3e-a1ad-4097-8dd6-b78f7503af6d', 'EMPY');
INSERT INTO supplier_user (supplier_tenant, supplier_organization, supplier_company_uuid, supplier_company_name) VALUES ('227019','227019-0001', '5210709b-9cd7-4d65-960b-c35279faab33', 'EMPBY');

-- INSERT INTO sp_item(subscription_id, sales_item_id, customer_item) VALUES ('1','1','ART');
-- INSERT INTO sp_item(subscription_id, sales_item_id, customer_item) VALUES ('1','2','EX');
-- INSERT INTO sp_item(subscription_id, sales_item_id, customer_item) VALUES ('1','3','PORT');
-- INSERT INTO sp_item(subscription_id, sales_item_id, customer_item) VALUES ('2','4','wgRT');
-- INSERT INTO sp_item(subscription_id, sales_item_id, customer_item) VALUES ('2','5','EcX');
-- INSERT INTO sp_item(subscription_id, sales_item_id, customer_item) VALUES ('3','6','POvRT');
-- INSERT INTO sp_item(subscription_id, sales_item_id, customer_item) VALUES ('4','7','AffRT');
