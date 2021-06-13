import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';
import https from 'https';
import { createConnection } from 'typeorm';
import 'reflect-metadata';

import router from './router/todo';
import { Todo } from './entities/todo.entity';
import swaggerUi from 'swagger-ui-express';
import specs from './middleware/swagger';

dotenv.config();

const app = express();

app.set('port', process.env.PORT || 3006);

//morgan
app.use(morgan('dev'));

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/todo', router);

app.get('/', (req, res) => {
  res.send('HalaTodo API');
});

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

createConnection({
  type: 'mysql',
  host: process.env.DATABASE_HOST,
  port: 3306,
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  entities: [Todo],
  synchronize: true,
  logging: false,
})
  .then(() => {
    console.log('Database Connected!');

    if (process.env.NODE_ENV === 'production') {
      setInterval(() => {
        https.get('https://hala-todo.herokuapp.com');
      }, 1200000);
    }

    app.listen(app.get('port'), () => {
      console.log(`Server start on ${app.get('port')}`);
    });
  })
  .catch((err) => {
    console.log('Connection Failed!');
    console.error(err);
  });
