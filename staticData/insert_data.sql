docker compose exec db psql -U user -d myapp

country

\copy public.geographic_boundary(geo_id, geo_code, name_en, name_th, abbreviation, type_id) from '/staticData/country_suppertype.csv' DELIMITER ',' CSV HEADER;
\copy public.country(geo_id) from '/staticData/country_subtype.csv' DELIMITER ',' CSV HEADER ;

postalcode
ต้องเพิ่มภาษา en th

\copy public.geographic_boundary(geo_id, geo_code, name_th, abbreviation, type_id) from '/staticData/postalcode_suppertype.csv' DELIMITER ',' CSV HEADER;
\copy public.postal_code(geo_id, country_id) from '/staticData/postalcode_subtype.csv' DELIMITER ',' CSV HEADER;

region

\copy public.geographic_boundary(geo_id, geo_code, name_en, name_th, abbreviation, type_id) from '/staticData/region_supertype.csv' DELIMITER ',' CSV HEADER;
\copy public.region(geo_id) from '/staticData/region_subtype.csv' DELIMITER ',' CSV HEADER;

state

\copy public.geographic_boundary(geo_id, geo_code, name_en, name_th, abbreviation, type_id) from '/staticData/state_suppertype.csv' DELIMITER ',' CSV HEADER;
\copy public.state(geo_id, country_id) from '/staticData/state_subtype.csv' DELIMITER ',' CSV HEADER;

county

\copy public.geographic_boundary(geo_id, geo_code, name_en, name_th, abbreviation, type_id) from '/staticData/county_suppertype.csv' DELIMITER ',' CSV HEADER;
\copy public.county(geo_id, state_id) from '/staticData/county_subtype.csv' DELIMITER ',' CSV HEADER;

city

\copy public.geographic_boundary(geo_id, geo_code, name_en, name_th, abbreviation, type_id) from '/staticData/city_suppertype.csv' DELIMITER ',' CSV HEADER;
\copy public.city(geo_id, state_id) from '/staticData/city_subtype.csv' DELIMITER ',' CSV HEADER;

county_city

\copy public.geographic_boundary(geo_id, geo_code, name_en, name_th, abbreviation, type_id) from '/staticData/county_city_suppertype.csv' DELIMITER ',' CSV HEADER;
\copy public.county_city(geo_id, county_id, city_id) from '/staticData/county_city_subtype.csv' DELIMITER ',' CSV HEADER;

province



--------------- Adjust sequence for AUTO_INCREMENT to ensure proper next ID ------------------------
คำสั่งนี้จะปรับ AUTO_INCREMENT ให้ถูกต้อง
-----------------------

docker compose exec db psql -U user -d myapp 

ต่อไป

DO $$
DECLARE
    seq RECORD;
    tbl_name TEXT;
    col_name TEXT;
    max_val BIGINT;
BEGIN
    FOR seq IN
        SELECT
            c.oid::regclass::text AS seq_name,
            t.relname AS table_name,
            a.attname AS column_name
        FROM
            pg_class c
        JOIN pg_namespace n ON n.oid = c.relnamespace
        JOIN pg_depend d ON d.objid = c.oid
        JOIN pg_class t ON t.oid = d.refobjid
        JOIN pg_attribute a ON a.attnum = d.refobjsubid AND a.attrelid = t.oid
        WHERE
            c.relkind = 'S'
            AND n.nspname = 'public'
    LOOP
        EXECUTE format('SELECT COALESCE(MAX(%I), 0) FROM %I', seq.column_name, seq.table_name)
        INTO max_val;

        EXECUTE format('SELECT setval(%L, %s)', seq.seq_name, GREATEST(max_val, 1));
    END LOOP;
END $$;


สาเหตุที่ต้องปรับ auto AUTO_INCREMENT index ให้เป็น max +1 เพราะว่า

คำสั่งที่ไว้ดู table ทุกตัว

SELECT table_schema, table_name
FROM information_schema.tables
WHERE table_type = 'BASE TABLE' AND table_schema NOT IN ('pg_catalog', 'information_schema')
ORDER BY table_schema, table_name;
