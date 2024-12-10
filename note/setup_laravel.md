ในการสร้าง Laravel application ภายในไดเร็กทอรี `/backend` ให้คุณทำตามขั้นตอนดังนี้:

1. **สร้างไฟล์ `Dockerfile` ใน `/backend`**:
   เนื่องจากใน Docker Compose เราได้กำหนดให้ backend ใช้ PHP-FPM, Dockerfile จะใช้ PHP image พร้อมติดตั้ง dependencies ที่ Laravel ต้องการ:
   ```Dockerfile
   # Dockerfile (backend/Dockerfile)
   FROM php:8.1-fpm

   WORKDIR /var/www/html

   RUN apt-get update && apt-get install -y \
       git \
       unzip \
       libpq-dev \
       && docker-php-ext-install pdo pdo_pgsql

   COPY . /var/www/html

   RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer
   ```

1.1 image มีการเปลีย่นเเปลงใหม่
```Dockerfile
# Dockerfile (backend/Dockerfile)
FROM php:8.1-fpm-alpine

WORKDIR /var/www/html

# ติดตั้ง dependencies
RUN apk update && apk add --no-cache \
    git \
    unzip \
    postgresql-dev \
    && docker-php-ext-install pdo pdo_pgsql

COPY . /var/www/html

# ติดตั้ง Composer
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

# ตั้งสิทธิ์ให้ storage และ cache (หากจำเป็น)
# ถ้าใส่ตั้งเเต่ตอน build image มันจะ error เเทน
# RUN chmod -R 775 /var/www/html/storage /var/www/html/bootstrap/cache
```

2. **ติดตั้ง Laravel ใน `/backend`**:
   หลังจากที่ได้สร้าง Dockerfile และอัปเดต Compose file แล้ว สามารถเริ่มต้นบริการด้วยคำสั่ง:
   ```bash
   docker-compose up -d --build
   ```

3. **เข้าสู่คอนเทนเนอร์ backend เพื่อสร้างโปรเจค Laravel**:
   ```bash
   docker-compose exec backend bash
   ```
   ตอนหลังใช้ alpine ต้องเปลี่ยนเป็น sh เเนท
   ```bash
   docker-compose exec backend sh
   ```

   จากนั้นใช้ Composer เพื่อสร้าง Laravel project:
   ```bash
   composer create-project --prefer-dist laravel/laravel .
   ```
   จากนั้นใส่ คำสั่งนี้เพื่อให้ laravel เก็บ log ได้ มั้จะได้ไม่ error
   ```bash
   chmod -R 777 /var/www/html/storage /var/www/html/bootstrap/cache
   ```
   สาเหตุที่ต้องเข้าไปใน container เเล้ว initial laravel เพราะว่า window เวลาจะ composer จะติดปัญหาเรื่อง unzip

4. **ตั้งค่าไฟล์ `.env` ของ Laravel**:
   Laravel มีไฟล์ `.env` สำหรับการตั้งค่าต่าง ๆ รวมถึงข้อมูลของฐานข้อมูล สามารถปรับการตั้งค่าในไฟล์ `.env` ดังนี้:
   ```env
   DB_CONNECTION=pgsql
   DB_HOST=db
   DB_PORT=5432
   DB_DATABASE=myapp
   DB_USERNAME=user
   DB_PASSWORD=password
   ```

5. **กำหนด permission ให้กับ directory ที่ Laravel ต้องการ**:
   ให้สิทธิ์ในการเขียนสำหรับ `storage` และ `bootstrap/cache`:
   ```bash
   chmod -R 777 storage bootstrap/cache
   ```

6. **เสร็จสิ้นการตั้งค่า Laravel**: 
   ตอนนี้ คุณสามารถเข้าถึง Laravel ที่ `http://localhost:8080` ได้แล้ว

7. **จะเจอ error เรื่อง laravel เอง เขียน log ไม่ได้ เลยต้องให้สิทธิ์ในการเขียน**

   ```bash
   chmod -R 777 /var/www/html/storage /var/www/html/bootstrap/cache
   ```

8. **ตั้งค่า .env**
   ```python
   DB_CONNECTION=pgsql
   DB_HOST=db                # ชื่อของ service ที่ตั้งใน    docker-compose.yml
   DB_PORT=5432              # พอร์ตที่ PostgreSQL ใช้    (ค่าเริ่มต้นคือ 5432)
   DB_DATABASE=myapp         # ชื่อฐานข้อมูลตามที่ตั้งไว้ใน    docker-compose.yml
   DB_USERNAME=user          # ชื่อผู้ใช้งานตามที่ตั้งไว้ใน  docker-compose.yml
   DB_PASSWORD=password      # รหัสผ่านตามที่ตั้งไว้ใน    docker-compose.yml
   ```

   ต่อมาให้ docker compose restart เพื่อให้ระบบเห็นค่า config ใหม่

   ทดสอบการเชื่อมต่อด้วยคำสั่ง 

   ```bash
   docker-compose exec backend bash
   ```

   ```bash
   php artisan migrate
   ```
   Laravel จะแสดงผลว่าการ migration สำเร็จ ซึ่งยืนยันว่าเชื่อมต่อกับฐานข้อมูล PostgreSQL ได้แล้ว
   
   ```bash
   INFO  Preparing database.

   Creating migration table ............................................................................................................... 81ms DONE

   INFO  Running migrations.

   2014_10_12_000000_create_users_table ................................................................................................... 70ms DONE
   2014_10_12_100000_create_password_reset_tokens_table ................................................................................... 12ms DONE
   2019_08_19_000000_create_failed_jobs_table ............................................................................................. 32ms DONE
   2019_12_14_000001_create_personal_access_tokens_table .................................................................................. 21ms DONE
   ```
   # สร้าง table เสร็จ ก็ต้องสร้าง interface ให้กับ controller
   