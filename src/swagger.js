import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'App Adopted a Pet',
            version: '1.0.0',
            description: 'Generacion de la documentacion de los endpoints requeridos para la entrega final',
            termsOfService: 'https://mi-dominio.com/terminos', //VER ESTO
            contact: {
                name: "Emiliano Manuel Mendieta",
                email: "emmendieta12@gmail.com",
            },
            licence: {
                name: 'MIT',
                url: 'https://opensource.org/license/mit',
            },
        },
        servers: [
            {
                url: 'http://localhost:8080',
                description: 'Local Server',
            },
            {
                url: 'https://mi-dominio.com', //VER ESTO
                description: 'Production Server',
            }
        ]
    },
    apis: ['./src/**/*.js'],
};

const swaggerSpect = swaggerJSDoc(options);

export const setupSwaager = (app) => { app.use('/api-doc', swaggerUi.serve, swaggerUi.setup(swaggerSpect)); };