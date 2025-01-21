# Usar la imagen oficial de PHP con Apache
FROM php:8.2-apache

# Instalar extensiones necesarias, incluyendo mysqli
RUN docker-php-ext-install mysqli \
    && docker-php-ext-enable mysqli

# Habilitar módulos necesarios de Apache
RUN a2enmod rewrite

# Copiar los archivos de la aplicación al directorio raíz del servidor web
COPY ./src /var/www/html/

# Establecer permisos adecuados para el directorio
RUN chown -R www-data:www-data /var/www/html \
    && chmod -R 755 /var/www/html

# Puerto de exposición del servidor web
EXPOSE 80

# Comando para iniciar el servidor
CMD ["apache2-foreground"]