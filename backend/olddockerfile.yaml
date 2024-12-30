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
