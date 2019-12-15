\ir schema.sql
\ir views.sql
\ir triggers.sql
INSERT INTO customer_user(customer_tenant, customer_organization, customer_company_uuid, customer_company_name) VALUES ('224977', '224977-0001', '32652d3e-a1ad-4097-8dd6-b78f7503af6d', 'EMPY');
INSERT INTO supplier_user (supplier_tenant, supplier_organization, supplier_company_uuid, supplier_company_name) VALUES ('227019','227019-0001', '5210709b-9cd7-4d65-960b-c35279faab33', 'EMPBY');
INSERT INTO brand(supplier_id, brand_uuid, brand_name) VALUES ('2', 'b65c2b831b0a47d2b165c91a3c1db534', 'EXEMPLO');
INSERT INTO brand(supplier_id, brand_uuid, brand_name) VALUES ('2', 'abe05198abdd4d92800b116ebfc67d73', 'MARCA1');
INSERT INTO brand(supplier_id, brand_uuid, brand_name) VALUES ('2', '8b998a491a464bb6b70ec63bbe541d73', 'OUTRAMARCA');
INSERT INTO brand(supplier_id, brand_uuid, brand_name) VALUES ('2', 'c14e22a997f148f5b2d0544e4cf2eeea', 'MARCA6');
INSERT INTO brand(supplier_id, brand_uuid, brand_name) VALUES ('2', 'b116e709f0a64ab08aae833354fe600b', 'FORMULA1');
INSERT INTO subscription(brand_id, customer_id) VALUES ('1', '1');
INSERT INTO subscription(brand_id, customer_id) VALUES ('2', '1');
INSERT INTO subscription(brand_id, customer_id) VALUES ('3', '1');
INSERT INTO subscription(brand_id, customer_id) VALUES ('4', '1');
INSERT INTO subscription(brand_id, customer_id) VALUES ('5', '1');
INSERT INTO sp_item(subscription_id, supplier_item, customer_item) VALUES ('1', 'ARTIGO','ART');
INSERT INTO sp_item(subscription_id, supplier_item, customer_item) VALUES ('1', 'EXEMPLO','EX');
INSERT INTO sp_item(subscription_id, supplier_item, customer_item) VALUES ('1', 'PORTES','PORT'); 
INSERT INTO sp_item(subscription_id, supplier_item, customer_item) VALUES ('2', 'wgweg','wgRT');
INSERT INTO sp_item(subscription_id, supplier_item, customer_item) VALUES ('2', 'EXEMeePLO','EcX');
INSERT INTO sp_item(subscription_id, supplier_item, customer_item) VALUES ('3', 'PORccTES','POvRT'); 
INSERT INTO sp_item(subscription_id, supplier_item, customer_item) VALUES ('4', 'ARaTIGO','AffRT');
INSERT INTO sp_item(subscription_id, supplier_item, customer_item) VALUES ('5', 'EXEMcccPLO','EbbbX');
INSERT INTO sp_item(subscription_id, supplier_item, customer_item) VALUES ('5', 'PORTEczzS','PORzzzT'); 