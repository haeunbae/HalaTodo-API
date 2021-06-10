import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import router from './router/todo';
import bodyParser from 'body-parser';

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

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(router);

app.listen(3006, () => {
  console.log('server start on 3006');
});
