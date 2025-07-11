# Proyecto Final – Adopt-Me

## Objetivo General

Implementar las últimas mejoras en el proyecto y Dockerizarlo.

## Objetivos Específicos

- Documentar las rutas restantes del proyecto.
- Añadir los últimos tests funcionales.
- Crear una imagen de Docker.

## Entregas

- Documentación con Swagger del módulo “Users”.
- Desarrollo de tests funcionales para todos los endpoints del router `adoption.router.js`.
- Dockerfile funcional para generar la imagen del proyecto.
- Imagen del proyecto subida a DockerHub.

## DockerHub

La imagen del proyecto está publicada y accesible en:

https://hub.docker.com/repository/docker/emmendieta12/adopt-me/general

### Descargar la imagen

```bash
docker pull emmendieta12/adopt-me:latest
```

### Ejecutar el contenedor

```bash
docker run -d -p 8080:8080 emmendieta12/adopt-me:latest
```

## Documentación de la API

La documentación de Swagger está disponible al ejecutar el contenedor en:

http://localhost:8080/api-doc/

La documentación del módulo `Users` ha sido implementada y validada en esta interfaz.

## Tests Funcionales

Se han desarrollado tests funcionales para todos los endpoints del router `adoption.router.js`.

Los tests incluyen:

- Casos de éxito.
- Casos de error.
- Validación completa de respuestas esperadas.

## Dockerfile

El `Dockerfile` incluido en el proyecto:

- Instala todas las dependencias necesarias.
- Copia los archivos del proyecto.
- Expone el puerto 8080.
- Ejecuta la aplicación correctamente al iniciar el contenedor.

La imagen es reproducible y lista para desplegar.

## Instrucciones para construir la imagen desde cero

```bash
docker build -t adopt-me .
docker run -d -p 8080:8080 adopt-me
```

## Swagger (IMPORTANTE):
Si no se encuentra logueado, a veces como usuario, a veces como administrador no va a poder ejecutarlos.

## Admin:
Para poder acceder como administrador:

LINK_MONGODB=mongodb+srv://emmendieta12:Chevy1987@cluster0.ngvnxmu.mongodb.net/Back3 -> Conectar directamente a mi BD
email: emmendieta12@gmail.com
password: 1234