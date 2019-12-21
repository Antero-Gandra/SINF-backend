\ir schema.sql
\ir views.sql
\ir triggers.sql
INSERT INTO customer_user(customer_tenant, customer_organization, customer_company_uuid, customer_company_name) VALUES ('224977', '224977-0001', '32652d3e-a1ad-4097-8dd6-b78f7503af6d', 'EMPY');
INSERT INTO supplier_user (supplier_tenant, supplier_organization, supplier_company_uuid, supplier_company_name) VALUES ('227019','227019-0001', '5210709b-9cd7-4d65-960b-c35279faab33', 'EMPBY');
INSERT INTO customer_user(customer_tenant, customer_organization, customer_company_uuid, customer_company_name) VALUES ('45254424', '45254424', '32652d3e-a1ad-4097-8dd6-b78f750asdcz', 'EMPRESA');
INSERT INTO supplier_user (supplier_tenant, supplier_organization, supplier_company_uuid, supplier_company_name) VALUES ('227019','227019-0002', '5210709b-9cd7-4d65-960b-c35279fabb33', 'EMPBY2');
INSERT INTO brand(supplier_id, brand_uuid, brand_name) VALUES ('2', 'b65c2b831b0a47d2b165c91a3c1db534', 'MARCA1');
INSERT INTO brand(supplier_id, brand_uuid, brand_name) VALUES ('2', 'abe05198abdd4d92800b116ebfc67d73', 'MARCA2');
INSERT INTO brand(supplier_id, brand_uuid, brand_name) VALUES ('4', '8b998a491a464bb6b70ec63bbe541d73', 'MARCA3');
INSERT INTO brand(supplier_id, brand_uuid, brand_name) VALUES ('4', 'c14e22a997f148f5b2d0544e4cf2eeea', 'MARCA4');
INSERT INTO brand(supplier_id, brand_uuid, brand_name) VALUES ('2', 'b116e709f0a64ab08aae833354fe600b', 'MARCA5');
INSERT INTO subscription(brand_id, customer_id) VALUES ('1', '1');
INSERT INTO subscription(brand_id, customer_id) VALUES ('2', '1');
INSERT INTO subscription(brand_id, customer_id) VALUES ('3', '1');
INSERT INTO subscription(brand_id, customer_id) VALUES ('4', '1');
INSERT INTO sales_item(brand_id, sales_item_name) VALUES ('1', 'ARTIGO'); 
INSERT INTO sales_item(brand_id, sales_item_name) VALUES ('1', 'EXEMPLO'); 
INSERT INTO sales_item(brand_id, sales_item_name) VALUES ('1', 'PORTES');  
INSERT INTO sales_item(brand_id, sales_item_name) VALUES ('2', 'wgweg'); 
INSERT INTO sales_item(brand_id, sales_item_name) VALUES ('2', 'EXEMeePLO'); 
INSERT INTO sales_item(brand_id, sales_item_name) VALUES ('3', 'PORccTES');  
INSERT INTO sales_item(brand_id, sales_item_name) VALUES ('4', 'ARaTIGO'); 
INSERT INTO sales_item(brand_id, sales_item_name) VALUES ('5', 'ITEM'); 
INSERT INTO sales_item(brand_id, sales_item_name) VALUES ('5', 'PROD');  
INSERT INTO sp_item(subscription_id, sales_item_id, customer_item) VALUES ('1','1','ART');
INSERT INTO sp_item(subscription_id, sales_item_id, customer_item) VALUES ('1','2','EX');
INSERT INTO sp_item(subscription_id, sales_item_id, customer_item) VALUES ('1','3','PORT'); 
INSERT INTO sp_item(subscription_id, sales_item_id, customer_item) VALUES ('2','4','wgRT');
INSERT INTO sp_item(subscription_id, sales_item_id, customer_item) VALUES ('2','5','EcX');
INSERT INTO sp_item(subscription_id, sales_item_id, customer_item) VALUES ('3','6','POvRT'); 
INSERT INTO sp_item(subscription_id, sales_item_id, customer_item) VALUES ('4','7','AffRT');
