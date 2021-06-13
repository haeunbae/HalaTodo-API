import swaggereJsdoc from 'swagger-jsdoc';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      swagger: '2.0',
      title: 'HalaTodo API',
      version: '1.0.0',
      description: 'Test API with express',
    },
    servers: [
      {
        url:
          process.env.NODE_ENV === 'production'
            ? 'https://hala-todo.herokuapp.com/'
            : 'http://localhost:3006',
      },
    ],
  },
  apis: ['./src/router/*.*', './src/swagger/*'],
};
const specs = swaggereJsdoc(options);
export default specs;
