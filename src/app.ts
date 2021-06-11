import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';
import { createConnection } from 'typeorm';
import 'reflect-metadata';

import router from './router/todo';
import { Todo } from './entities/todo.entity';

dotenv.config();

const app = express();

//morgan
app.use(morgan('dev'));

//cors
const corsOptions = {
  origin(origin: any, callback: any) {
    callback(null, true);
  },
  credentials: true,
};

app.use(cors(corsOptions));

app.use(router);

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
    app.listen(3006, () => {
      console.log('server start on 3006');
    });
  })
  .catch((err) => {
    console.log('Connection Failed!');
    console.error(err);
  });
