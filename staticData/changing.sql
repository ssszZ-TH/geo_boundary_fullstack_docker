--------------- on suuppertype

-- thai state -> province
-- change typeid 3 -> 2

UPDATE geographic_boundary
SET type_id = 2
WHERE type_id = 3;

-- thai county -> district
-- typeid 5 -> 13

UPDATE geographic_boundary
SET type_id = 13
WHERE type_id = 5;

-- thai countycity -> sub district
-- typeid 12 -> 14

UPDATE geographic_boundary
SET type_id = 14
WHERE type_id = 12;


---------------- on subtype

-- ย้ายข้อมูลจากตาราง state ไปยังตาราง province
INSERT INTO province (geo_id, country_id)
SELECT geo_id, country_id
FROM state;

INSERT INTO district (geo_id, province_id)
SELECT geo_id, state_id
FROM county;

INSERT INTO sub_district (geo_id, district_id)
SELECT geo_id, county_id
FROM county_city

-- ลบข้อมูลเก่าในตาราง province
TRUNCATE TABLE state CASCADE;
TRUNCATE TABLE county CASCADE;
TRUNCATE TABLE city CASCADE;
TRUNCATE TABLE county_city CASCADE;

-- output
-- NOTICE:  truncate cascades to table "city"
-- NOTICE:  truncate cascades to table "county"
-- NOTICE:  truncate cascades to table "county_city"
-- TRUNCATE TABLE

-- Query returned successfully in 124 msec.
