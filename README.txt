# Test

Test es una aplicación sencilla que permite a un usuario iniciar sesión y registrar nuevos usuarios en el sistema.

## Instalación
Se utilizan los puertos 80,8080 y 3366. En caso de estar ocupados el proyecto no prodrá arrancar.

El proyecto requiere tener instalado [Docker Compose](https://docs.docker.com/compose/) y ejecutar el siguente comando en dentro de la carpeta principal del proyecto:

```bash
docker-compose up
```
Luego de ejecutar el comando se tiene que esperar a que los contenedores terminen de construirse, tener especial cuidado en el contenedor de base de datos (db), tenemos que esperar a ver el siguiente registro en el log:
```bash
2021-04-22T06:34:07.074326Z 0 [System] [MY-010931] [Server] /usr/sbin/mysqld: ready for connections. Version: '8.0.24' socket: '/var/run/mysqld/mysqld.sock' port: 3306 MySQL Community Server - GPL.
```

## Usage

Para acceder a la aplicación se tiene que ir a la ruta [127.0.0.1](http://127.0.0.1).

El usuario predeterminado es admin con el password admin.