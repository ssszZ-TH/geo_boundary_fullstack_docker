การ **import ข้อมูลลง PostgreSQL** ที่อยู่ใน Docker Container สามารถทำได้อย่างรวดเร็วด้วยคำสั่ง `psql` โดยตรงใน terminal ของ container PostgreSQL ซึ่งรองรับการนำเข้าข้อมูลในรูปแบบ CSV, SQL dump หรือไฟล์อื่น ๆ ได้ง่ายและรวดเร็ว

---

### **ขั้นตอนการ Import ข้อมูล**

#### **1. เตรียมไฟล์ข้อมูล**
- ตรวจสอบให้แน่ใจว่าไฟล์ของคุณอยู่ในรูปแบบที่เหมาะสม เช่น **CSV** หรือ **SQL dump**.
- ตัวอย่างไฟล์:
    - CSV: `data.csv`
    - SQL dump: `backup.sql`

#### **2. ย้ายไฟล์เข้าสู่ Container**
คุณสามารถคัดลอกไฟล์เข้าไปใน container PostgreSQL ด้วยคำสั่ง `docker cp` เช่น:
```bash
docker cp data.csv <container_name>:/tmp/data.csv
```
หรือหากใช้ SQL dump:
```bash
docker cp backup.sql <container_name>:/tmp/backup.sql
```

#### **3. เข้าสู่ PostgreSQL Container**
เข้าสู่ container ของ PostgreSQL:
```bash
docker exec -it <container_name> bash
```

#### **4. เชื่อมต่อกับฐานข้อมูล**
เปิดใช้งาน `psql` และเชื่อมต่อกับฐานข้อมูล:
```bash
psql -U <username> -d <database_name>
```

---

### **กรณี Import CSV**

ใช้คำสั่ง `COPY` เพื่อ import ไฟล์ CSV:
```sql
COPY table_name (column1, column2, column3)
FROM '/tmp/data.csv'
DELIMITER ','
CSV HEADER;
```

- **table_name**: ชื่อของตารางในฐานข้อมูล
- **column1, column2, column3**: ชื่อคอลัมน์ในตาราง
- **'/tmp/data.csv'**: ที่อยู่ของไฟล์ใน container
- **CSV HEADER**: ระบุว่ามี header ในไฟล์ CSV

**ตัวอย่าง:**
```sql
COPY employees (id, name, position, salary)
FROM '/tmp/employees.csv'
DELIMITER ','
CSV HEADER;
```

---

### **กรณี Import SQL Dump**

สำหรับไฟล์ SQL dump (`backup.sql`):
```bash
psql -U <username> -d <database_name> -f /tmp/backup.sql
```

---

### **5. ตรวจสอบผลลัพธ์**
เมื่อ import เสร็จแล้ว คุณสามารถตรวจสอบข้อมูลได้โดยใช้คำสั่ง SQL:
```sql
SELECT * FROM table_name LIMIT 10;
```

---

### **ข้อแนะนำเพิ่มเติม**
- หากไฟล์ CSV มีขนาดใหญ่ คุณสามารถปรับแต่ง `maintenance_work_mem` และ `work_mem` ใน PostgreSQL เพื่อเพิ่มความเร็ว.
- สำหรับการนำเข้าข้อมูลจำนวนมาก แนะนำให้ปิด foreign key constraints ชั่วคราว:
```sql
ALTER TABLE table_name DISABLE TRIGGER ALL;
-- Import data
ALTER TABLE table_name ENABLE TRIGGER ALL;
```

- หากการ import ใช้เวลานานมาก อาจพิจารณาแบ่งไฟล์ข้อมูลเป็นส่วนย่อย.

**สรุป:** การ import ข้อมูลผ่าน terminal ของ container PostgreSQL เป็นวิธีที่รวดเร็วและมีประสิทธิภาพ โดยเฉพาะเมื่อใช้งานคำสั่ง `COPY` สำหรับ CSV หรือ `psql` สำหรับ SQL dump.