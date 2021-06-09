import express from 'express';
import cors from 'cors';
import morgan from 'morgan';

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

app.listen(3006, () => {
  console.log('server start on 3006');
});
