-- Table for GEOGRAPHIC_BOUNDARY_TYPE
CREATE TABLE GEOGRAPHIC_BOUNDARY_TYPE (
    type_id SERIAL PRIMARY KEY,
    type_name VARCHAR(100) NOT NULL
);



-- Create database schema for geographic boundaries
CREATE TABLE GEOGRAPHIC_BOUNDARY (
    geo_id SERIAL PRIMARY KEY,
    geo_code VARCHAR(50),
    name VARCHAR(255) NOT NULL,
    abbreviation VARCHAR(50),
    type_id INT NOT NULL REFERENCES GEOGRAPHIC_BOUNDARY_TYPE(type_id) ON DELETE SET NULL
);

-- Subtype: COUNTRY
CREATE TABLE COUNTRY (
    geo_id INT PRIMARY KEY REFERENCES GEOGRAPHIC_BOUNDARY(geo_id) ON DELETE CASCADE
);

-- Subtype: PROVINCE
CREATE TABLE PROVINCE (
    geo_id INT PRIMARY KEY REFERENCES GEOGRAPHIC_BOUNDARY(geo_id) ON DELETE CASCADE,
    country_id INT NOT NULL REFERENCES COUNTRY(geo_id) ON DELETE CASCADE
);

-- Subtype: POSTAL_CODE
CREATE TABLE POSTAL_CODE (
    geo_id INT PRIMARY KEY REFERENCES GEOGRAPHIC_BOUNDARY(geo_id) ON DELETE CASCADE,
    country_id INT NOT NULL REFERENCES COUNTRY(geo_id) ON DELETE CASCADE
);

-- Subtype: TERRITORY
CREATE TABLE TERRITORY (
    geo_id INT PRIMARY KEY REFERENCES GEOGRAPHIC_BOUNDARY(geo_id) ON DELETE CASCADE,
    country_id INT NOT NULL REFERENCES COUNTRY(geo_id) ON DELETE CASCADE
);

-- Subtype: STATE
CREATE TABLE STATE (
    geo_id INT PRIMARY KEY REFERENCES GEOGRAPHIC_BOUNDARY(geo_id) ON DELETE CASCADE,
    country_id INT NOT NULL REFERENCES COUNTRY(geo_id) ON DELETE CASCADE
);

-- Subtype: SALES_TERRITORY
CREATE TABLE SALES_TERRITORY (
    geo_id INT PRIMARY KEY REFERENCES GEOGRAPHIC_BOUNDARY(geo_id) ON DELETE CASCADE,
);

-- Subtype: SERVICE_TERRITORY
CREATE TABLE SERVICE_TERRITORY (
    geo_id INT PRIMARY KEY REFERENCES GEOGRAPHIC_BOUNDARY(geo_id) ON DELETE CASCADE,
);

-- Subtype: REGION
CREATE TABLE REGION (
    geo_id INT PRIMARY KEY REFERENCES GEOGRAPHIC_BOUNDARY(geo_id) ON DELETE CASCADE,
);

-- Subtype: CITY
CREATE TABLE CITY (
    geo_id INT PRIMARY KEY REFERENCES GEOGRAPHIC_BOUNDARY(geo_id) ON DELETE CASCADE,
    state_id INT NOT NULL REFERENCES STATE(geo_id) ON DELETE CASCADE
);

-- Subtype: COUNTY
CREATE TABLE COUNTY (
    geo_id INT PRIMARY KEY REFERENCES GEOGRAPHIC_BOUNDARY(geo_id) ON DELETE CASCADE,
    state_id INT NOT NULL REFERENCES STATE(geo_id) ON DELETE CASCADE
);

-- Subtype: COUNTY_CITY
CREATE TABLE COUNTY_CITY (
    geo_id INT PRIMARY KEY REFERENCES GEOGRAPHIC_BOUNDARY(geo_id) ON DELETE CASCADE,
    county_id INT NOT NULL REFERENCES COUNTY(geo_id) ON DELETE CASCADE,
    city_id INT NOT NULL REFERENCES CITY(geo_id) ON DELETE CASCADE
);

-- Subtype:
CREATE TABLE district (
    geo_id INT PRIMARY KEY REFERENCES GEOGRAPHIC_BOUNDARY(geo_id) ON DELETE CASCADE,
    province_id INT NOT NULL REFERENCES province(geo_id) ON DELETE CASCADE
);

-- Subtype: 
CREATE TABLE sub_district (
    geo_id INT PRIMARY KEY REFERENCES GEOGRAPHIC_BOUNDARY(geo_id) ON DELETE CASCADE,
    district_id INT NOT NULL REFERENCES district(geo_id) ON DELETE CASCADE
);

------------------------------------------------------------------------------------------------------------------------------------------

-- 1. Insert into GEOGRAPHIC_BOUNDARY_TYPE
INSERT INTO GEOGRAPHIC_BOUNDARY_TYPE (type_id,type_name) VALUES
(1,'Country'),
(2,'Province'),
(3,'State'),
(4,'City'),
(5,'County'),
(6,'Postal Code'),
(7,'Territory'),
(8,'Sales Territory'),
(9,'Service Territory'),
(10,'Region');

-- 2. Insert into GEOGRAPHIC_BOUNDARY for Countries
INSERT INTO GEOGRAPHIC_BOUNDARY (geo_id, geo_code, name, abbreviation, type_id) VALUES
(1, 'THA', 'Thailand', 'TH', 1);

-- 3. Insert into COUNTRY
INSERT INTO COUNTRY (geo_id) VALUES
(1); -- Thailand

-- 4. Insert into GEOGRAPHIC_BOUNDARY for Provinces
INSERT INTO GEOGRAPHIC_BOUNDARY (geo_id, geo_code, name, abbreviation, type_id) VALUES
(2, 'TH-10', 'Bangkok', 'BKK', 2),
(3, 'TH-11', 'Samut Prakan', 'SPK', 2),
(4, 'TH-12', 'Nonthaburi', 'NTB', 2),
(5, 'TH-13', 'Pathum Thani', 'PTN', 2),
(6, 'TH-14', 'Phra Nakhon Si Ayutthaya', 'AYT', 2);

-- 5. Insert into PROVINCE
INSERT INTO PROVINCE (geo_id, country_id) VALUES
(2, 1), -- Bangkok
(3, 1), -- Samut Prakan
(4, 1), -- Nonthaburi
(5, 1), -- Pathum Thani
(6, 1); -- Phra Nakhon Si Ayutthaya

-- 6. Insert into GEOGRAPHIC_BOUNDARY for States
INSERT INTO GEOGRAPHIC_BOUNDARY (geo_id, geo_code, name, abbreviation, type_id) VALUES
(7, 'TH-10', 'Bangkok', 'BKK', 3);

-- 7. Insert into STATE
INSERT INTO STATE (geo_id, country_id) VALUES
(7, 1); -- Bangkok State

-- 8. Insert into GEOGRAPHIC_BOUNDARY for Cities
INSERT INTO GEOGRAPHIC_BOUNDARY (geo_id, geo_code, name, abbreviation, type_id) VALUES
(8, 'TH-BKK-01', 'Dusit', 'DST', 4),
(9, 'TH-BKK-02', 'Bang Rak', 'BRK', 4),
(10, 'TH-BKK-03', 'Phra Nakhon', 'PNK', 4);

-- 9. Insert into CITY
INSERT INTO CITY (geo_id, state_id) VALUES
(8, 7), -- Dusit in Bangkok
(9, 7), -- Bang Rak in Bangkok
(10, 7); -- Phra Nakhon in Bangkok

-- 10. Insert into GEOGRAPHIC_BOUNDARY for Counties
INSERT INTO GEOGRAPHIC_BOUNDARY (geo_id, geo_code, name, abbreviation, type_id) VALUES
(11, 'TH-BKK-CNT1', 'Bangkok County 1', 'BKC1', 5);

-- 11. Insert into COUNTY
INSERT INTO COUNTY (geo_id, state_id) VALUES
(11, 7); -- Bangkok County 1 in Bangkok

-- 12. Insert into GEOGRAPHIC_BOUNDARY for County-Cities
INSERT INTO GEOGRAPHIC_BOUNDARY (geo_id, geo_code, name, abbreviation, type_id) VALUES
(12, 'TH-BKK-CC1', 'Dusit County-City', 'DST-CC', 5);

-- 13. Insert into COUNTY_CITY
INSERT INTO COUNTY_CITY (geo_id, county_id, city_id) VALUES
(12, 11, 10); -- Dusit County-City under Bangkok County 1

-- 14. Insert into GEOGRAPHIC_BOUNDARY for Postal Codes, Regions, and Territories
INSERT INTO GEOGRAPHIC_BOUNDARY (geo_id, geo_code, name, abbreviation, type_id) VALUES
(13, '10100', 'Bangkok Central Postal Code', 'BKK-C', 6),
(14, 'TH-R1', 'Central Region', 'CTR', 9),
(15, 'TH-ST1', 'Central Service', 'CTR-S', 8),
(16, 'TH-SA1', 'Bangkok Sales', 'BKK-S', 7);

-- 15. Insert into POSTAL_CODE
INSERT INTO POSTAL_CODE (geo_id, country_id) VALUES
(13, 1); -- Bangkok Central Postal Code

-- 16. Insert into REGION
INSERT INTO REGION (geo_id, parent_geo_id) VALUES
(14, 1); -- Central Region under Thailand

-- 17. Insert into SERVICE_TERRITORY
INSERT INTO SERVICE_TERRITORY (geo_id, parent_geo_id) VALUES
(15, 13); -- Central Service under Central Region

-- 18. Insert into SALES_TERRITORY
INSERT INTO SALES_TERRITORY (geo_id, parent_geo_id) VALUES
(16, 13); -- Bangkok Sales under Central Region

----------------------------------------------- Adjust sequence for AUTO_INCREMENT to ensure proper next ID
SELECT setval('geographic_boundary_geo_id_seq', COALESCE(MAX(geo_id), 1)) FROM GEOGRAPHIC_BOUNDARY;
SELECT setval('geographic_boundary_type_type_id_seq', COALESCE(MAX(type_id), 1)) FROM GEOGRAPHIC_BOUNDARY_TYPE;

--- delete all data
DELETE FROM geographic_boundary;
DELETE FROM GEOGRAPHIC_BOUNDARY_TYPE;