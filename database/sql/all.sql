\ir schema.sql
\ir views.sql
\ir triggers.sql

INSERT INTO customer_user(customer_tenant, customer_organization, customer_company_uuid, customer_company_name) VALUES ('224977', '224977-0001', '32652d3e-a1ad-4097-8dd6-b78f7503af6d', 'EMPY');
INSERT INTO supplier_user (supplier_tenant, supplier_organization, supplier_company_uuid, supplier_company_name) VALUES ('227019','227019-0001', '5210709b-9cd7-4d65-960b-c35279faab33', 'EMPBY');
INSERT INTO brand(supplier_id, brand_uuid, brand_name) VALUES ('2', '19d377ab29c54f86aa0b4f5fab87c7d7', 'MARCA1');
INSERT INTO brand(supplier_id, brand_uuid, brand_name) VALUES ('2', '24252a9faa18438591ed9bf3cd73c341', 'BOLASCHAS');
INSERT INTO subscription(brand_id, customer_id) VALUES ('1', '1');
INSERT INTO subscription(brand_id, customer_id) VALUES ('2', '1');
INSERT INTO sales_item(brand_id, sales_item_name) VALUES ('1', 'ARTIGO'); 
INSERT INTO sales_item(brand_id, sales_item_name) VALUES ('1', 'EXEMPLO'); 
INSERT INTO sales_item(brand_id, sales_item_name) VALUES ('1', 'PORTES'); 
INSERT INTO sales_item(brand_id, sales_item_name) VALUES ('2', 'AGUASAL');
INSERT INTO sales_item(brand_id, sales_item_name) VALUES ('2', 'AVEIA');
INSERT INTO sales_item(brand_id, sales_item_name) VALUES ('2', 'DIGESTIVAS');
INSERT INTO sales_item(brand_id, sales_item_name) VALUES ('2', 'MARIA');
INSERT INTO sales_item(brand_id, sales_item_name) VALUES ('2', 'MATINAIS');
INSERT INTO sales_item(brand_id, sales_item_name) VALUES ('2', 'OREO');
INSERT INTO sales_item(brand_id, sales_item_name) VALUES ('2', 'TUC');  
INSERT INTO sp_item(subscription_id, sales_item_id, customer_item) VALUES ('1','1','ART');
INSERT INTO sp_item(subscription_id, sales_item_id, customer_item) VALUES ('1','2','EX');
INSERT INTO sp_item(subscription_id, sales_item_id, customer_item) VALUES ('1','3','PORT'); 
INSERT INTO sp_item(subscription_id, sales_item_id, customer_item) VALUES ('1','4','W2BNQ5EVDK'); 
INSERT INTO sp_item(subscription_id, sales_item_id, customer_item) VALUES ('1','5','2J3MALEYC1'); 
INSERT INTO sp_item(subscription_id, sales_item_id, customer_item) VALUES ('1','6','UXKFTKG9OW'); 
INSERT INTO sp_item(subscription_id, sales_item_id, customer_item) VALUES ('1','7','9SFGDROLVW'); 
INSERT INTO sp_item(subscription_id, sales_item_id, customer_item) VALUES ('1','8','UQPBJZSGIU'); 
INSERT INTO sp_item(subscription_id, sales_item_id, customer_item) VALUES ('1','9','6YNVO0TLRM'); 
INSERT INTO sp_item(subscription_id, sales_item_id, customer_item) VALUES ('1','19','TMQDMH5FVD'); 
-- INSERT INTO sp_item(subscription_id, sales_item_id, customer_item) VALUES ('1','1','ART');
-- INSERT INTO sp_item(subscription_id, sales_item_id, customer_item) VALUES ('1','2','EX');
-- INSERT INTO sp_item(subscription_id, sales_item_id, customer_item) VALUES ('1','3','PORT');
-- INSERT INTO sp_item(subscription_id, sales_item_id, customer_item) VALUES ('2','4','wgRT');
-- INSERT INTO sp_item(subscription_id, sales_item_id, customer_item) VALUES ('2','5','EcX');
-- INSERT INTO sp_item(subscription_id, sales_item_id, customer_item) VALUES ('3','6','POvRT');
-- INSERT INTO sp_item(subscription_id, sales_item_id, customer_item) VALUES ('4','7','AffRT');
