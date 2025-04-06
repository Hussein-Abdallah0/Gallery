FROM php:8.2-apache
# Set working directory
WORKDIR /var/www/html
# Install system dependencies
RUN apt-get update && apt-get install -y \
    git unzip libzip-dev libonig-dev libxml2-dev zip curl libpng-dev \
    && docker-php-ext-install pdo pdo_mysql zip
# Enable Apache mod_rewrite
RUN a2enmod rewrite && \
    echo "ServerName localhost" >> /etc/apache2/apache2.conf
# Install Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer
# Copy Laravel application files
COPY ./backend /var/www/html
# Set permissions
RUN chown -R www-data:www-data /var/www/html \
    && chmod -R 755 /var/www/html/storage
# Install PHP dependencies
RUN composer install --no-dev --optimize-autoloader
# Generate application key
# RUN php artisan key:generate
# Clear and cache config
# RUN php artisan config:clear \
#     && php artisan cache:clear \
#     && php artisan config:cache \
#     && php artisan route:cache

# Set Apache document root
ENV APACHE_DOCUMENT_ROOT /var/www/html/public
RUN sed -ri -e 's!/var/www/html!${APACHE_DOCUMENT_ROOT}!g' /etc/apache2/sites-available/*.conf
RUN sed -ri -e 's!/var/www/!${APACHE_DOCUMENT_ROOT}!g' /etc/apache2/apache2.conf /etc/apache2/conf-available/*.conf
# Expose port 80
EXPOSE 80