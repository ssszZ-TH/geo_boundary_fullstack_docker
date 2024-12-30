การแทรกข้อมูลลงในทั้ง **supertype** (`geographic_boundary`) และ **subtype** (`country`) ต้องทำตามลำดับดังนี้:

1. แทรกข้อมูลเข้าไปในตาราง **supertype** (`geographic_boundary`) ก่อน เพื่อสร้าง `geo_id` ซึ่งจะถูกใช้ในตาราง **subtype** (`country`).
2. นำ `geo_id` ที่ได้จากการแทรกในตาราง **supertype** ไปใช้ในการแทรกข้อมูลลงในตาราง **subtype** (`country`).

### ตัวอย่าง SQL Insert
```sql
-- Step 1: Insert into supertype (geographic_boundary)
INSERT INTO public.geographic_boundary (geo_code, name, abbreviation, type_id)
VALUES ('TH', 'Thailand', 'TH', 1)
RETURNING geo_id;

-- สมมติว่าค่าที่ได้จาก RETURNING คือ 101

-- Step 2: Insert into subtype (country)
INSERT INTO public.country (geo_id)
VALUES (101);
```

### การอธิบาย
1. **ขั้นตอนแรก:** เราแทรกข้อมูลเกี่ยวกับขอบเขตทางภูมิศาสตร์ (geographic boundary) เช่นรหัสประเทศ (`geo_code`), ชื่อ (`name`), ตัวย่อ (`abbreviation`), และประเภท (`type_id` ที่ระบุว่าเป็นประเทศคือ `1`).
2. **ขั้นตอนที่สอง:** ใช้ `geo_id` ที่ได้จากการแทรกในขั้นตอนแรกเพื่อนำไปแทรกในตาราง `country`.

### ตัวอย่างข้อมูลเพิ่มเติม
สมมติเราต้องการเพิ่มข้อมูลของสองประเทศ: ไทย (Thailand) และสหรัฐอเมริกา (United States):
```sql
-- Thailand
INSERT INTO public.geographic_boundary (geo_code, name, abbreviation, type_id)
VALUES ('TH', 'Thailand', 'TH', 1)
RETURNING geo_id;

-- Assume geo_id is 101
INSERT INTO public.country (geo_id)
VALUES (101);

-- United States
INSERT INTO public.geographic_boundary (geo_code, name, abbreviation, type_id)
VALUES ('US', 'United States', 'US', 1)
RETURNING geo_id;

-- Assume geo_id is 102
INSERT INTO public.country (geo_id)
VALUES (102);
```

### การเพิ่มข้อมูลอัตโนมัติด้วย SQL Function
หากคุณต้องการลดขั้นตอน สามารถใช้ฟังก์ชัน SQL เพื่อรวมขั้นตอนทั้งสอง:
```sql
CREATE OR REPLACE FUNCTION insert_country(geo_code varchar, name varchar, abbreviation varchar)
RETURNS void AS $$
DECLARE
    new_geo_id integer;
BEGIN
    -- Insert into geographic_boundary
    INSERT INTO public.geographic_boundary (geo_code, name, abbreviation, type_id)
    VALUES (geo_code, name, abbreviation, 1)
    RETURNING geo_id INTO new_geo_id;

    -- Insert into country
    INSERT INTO public.country (geo_id)
    VALUES (new_geo_id);
END;
$$ LANGUAGE plpgsql;

-- Example usage
SELECT insert_country('TH', 'Thailand', 'TH');
SELECT insert_country('US', 'United States', 'US');
```

ฟังก์ชันนี้จะทำให้การแทรกข้อมูลง่ายขึ้นมาก!