import swaggereJsdoc from 'swagger-jsdoc';
const options = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'HalaTodo API',
      version: '1.0.0',
      description: 'Test API with express',
    },
    servers: [{ url: 'http://localhost:3006' }],
  },
  apis: ['./router/*.ts', './swagger/*'],
};
const specs = swaggereJsdoc(options);
export default { specs };
