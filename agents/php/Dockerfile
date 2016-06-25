FROM php:5.6
RUN apt-get update && \
    apt-get install -y \
      git 
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/bin/ --filename=composer
WORKDIR /app
COPY composer.json composer.lock ./
RUN composer install --prefer-source --no-interaction
COPY . ./

CMD [ "php", "-S", "0.0.0.0:8003", "server.php" ]

EXPOSE 8003
