# migrade to haved table

การใช้คำสั่ง `php artisan make:migration:schema --schema="products"` จะสร้างไฟล์ migration สำหรับ schema "products" ที่อาจสอดคล้องกับข้อมูลที่มีอยู่บางส่วนใน PostgreSQL ของคุณ แต่เพื่อให้ Laravel รู้จักโครงสร้างของตาราง `products` ที่มีอยู่แล้วอย่างสมบูรณ์ จะมีขั้นตอนเพิ่มเติมที่ควรพิจารณา:

### ขั้นตอนการสร้าง migration สำหรับตารางที่มีอยู่แล้ว
1. **ตรวจสอบ schema ของตาราง `products`**:
   - ใน PostgreSQL ให้เช็คโครงสร้างตาราง `products` (เช่น ชนิดข้อมูลของคอลัมน์ คีย์หลัก ความสัมพันธ์ต่าง ๆ) เพื่อให้แน่ใจว่า migration ของ Laravel จะตรงกับโครงสร้างที่มีอยู่
   - ตัวอย่างคำสั่งเพื่อดู schema ของตาราง `products`:
     ```sql
     \d+ products
     ```

2. **สร้าง migration**:
   - คำสั่งที่คุณระบุจะไม่สร้างการกำหนด schema ที่ละเอียดครบถ้วนกับตารางที่มีอยู่แล้ว แต่เป็นการเริ่มต้นโครงร่างสำหรับ migration แนะนำให้ใช้คำสั่ง `php artisan make:migration` และปรับแก้ไขไฟล์ migration เองเพื่อให้สอดคล้องกับโครงสร้างของตารางที่มีอยู่ เช่น:
     ```bash
     php artisan make:migration create_products_table --table=products
     ```

3. **แก้ไขไฟล์ migration**:
   - แก้ไขโค้ดในไฟล์ migration ที่สร้างขึ้นมา (`database/migrations/xxxx_xx_xx_xxxxxx_create_products_table.php`) ให้ตรงกับโครงสร้างของตาราง `products` ที่มีอยู่
   - ตัวอย่าง:
     ```php
     ย้ำว่าตัวอย่างนะ อย่ามาเขียนตาม
     public function up()
     {
         Schema::create('products', function (Blueprint $table) {
             $table->id();
             $table->string('name');
             $table->decimal('price', 8, 2);
             $table->integer('stock');
             // เพิ่มคอลัมน์อื่นๆ ให้ตรงกับโครงสร้างที่มีอยู่
         });
     }
     ```

4. **ป้องกันไม่ให้ Laravel ลบข้อมูลในตารางที่มีอยู่**:
   - เนื่องจากตาราง `products` มีอยู่แล้ว คุณอาจต้องการแก้ไขโค้ดใน migration เพื่อป้องกันการลบข้อมูล โดยสามารถใช้คำสั่ง `Schema::table` ในการปรับแก้ไขแทนการสร้างใหม่
   - หรือหากต้องการให้การ migrate ไม่กระทบกับข้อมูล ให้ใช้การจัดการ schema ผ่าน migration โดยระบุเฉพาะคอลัมน์ที่ต้องการเพิ่มเติมหรือเปลี่ยนแปลงเท่านั้น

5. **submit migrate file**:
   - คำสั่ง `php artisan migrate` จะสร้าง migration และทําการ migrate ให้เรียบร้อย

### เคล็ดลับเพิ่มเติม
- **ตั้งค่า Model**: อย่าลืมสร้าง Laravel model ที่สอดคล้องกับตาราง `products` (`php artisan make:model Product`) และอาจปรับแต่ง model ให้สอดคล้องกับ schema ของ PostgreSQL เช่น การกำหนด `fillable` fields
- **ปรับการตั้งค่าคีย์หลักหรือ index**: หากตารางมีการกำหนด primary key หรือ index เฉพาะใน PostgreSQL ควรใส่ให้ตรงกับ schema ที่มีอยู่


# keyword

ถ้าคุณต้องการค้นหาข้อมูลเกี่ยวกับการสร้าง API ที่สามารถทำงานร่วมกับฐานข้อมูล PostgreSQL และตารางที่มีอยู่แล้วใน Laravel นี่คือบางคำสำคัญที่น่าจะช่วยให้คุณค้นหาได้ตรงจุด:

### Keyword สำหรับการค้นหา
1. **"Laravel connect existing PostgreSQL database"**  
   - เพื่อหาวิธีเชื่อมต่อ Laravel กับฐานข้อมูล PostgreSQL ที่มีตารางอยู่แล้ว

2. **"Laravel API with existing database schema"**  
   - เพื่อค้นหาวิธีการสร้าง API ใน Laravel โดยใช้ schema ของตารางที่มีอยู่

3. **"Laravel generate models from existing database"**  
   - เพื่อหาวิธีการสร้าง Model จากตารางที่มีอยู่ในฐานข้อมูล ซึ่ง Laravel จะใช้เชื่อมต่อกับฐานข้อมูลนั้น ๆ

4. **"Laravel migration for existing PostgreSQL table"**  
   - เพื่อค้นหาวิธีสร้าง migration ที่ตรงกับโครงสร้างของตาราง PostgreSQL ที่มีอยู่แล้ว

5. **"Laravel Eloquent model existing table PostgreSQL"**  
   - เพื่อหาวิธีใช้ Eloquent Model กับตารางที่มีอยู่แล้ว โดยตรงกับ PostgreSQL

6. **"Laravel migrations from existing database schema"**  
   - เพื่อหาข้อมูลเกี่ยวกับเครื่องมือและแพ็กเกจที่สามารถสร้าง migration จาก schema ที่มีอยู่แล้วในฐานข้อมูล เช่น `laravel-migrations-generator`

7. **"Laravel REST API with PostgreSQL"**  
   - เพื่อหาวิธีการสร้าง REST API ใน Laravel ที่เชื่อมต่อกับ PostgreSQL

### แนะนำเครื่องมือและแพ็กเกจ
- **`doctrine/dbal`**: เพื่อทำให้ Laravel รู้จักโครงสร้าง schema ของฐานข้อมูลและตารางที่มีอยู่แล้ว
- **Laravel Migration Generator**: แพ็กเกจนี้ช่วยสร้าง migration จาก schema ที่มีอยู่แล้วในฐานข้อมูล

หากค้นหาโดยใช้คำเหล่านี้ จะช่วยให้คุณพบข้อมูลที่ตรงกับการเชื่อมต่อ Laravel API กับตาราง PostgreSQL ที่มีอยู่แล้ว

# สรุป
วิธี migrate กับ database ที่มีอยู่เเล้วคือ ข้ามไปขั้นตอนสร้าง controller ไปเลย เเล้วก็ ตั้งชื่อ table , column , pk , timstamp ให้ตรง กับ database ที่มีอยู่ 