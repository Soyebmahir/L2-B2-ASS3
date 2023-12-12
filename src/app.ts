import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import { notFound } from './app/middleware/notFound';
import globalErrorHandler from './app/middleware/globalErrorHandler';
import router from './app/Routes';

const app: Application = express();

// parser
app.use(express.json());
app.use(cors());

//application routes

app.use('/api', router);

app.get('/', (req: Request, res: Response) => {
  res.send('Assignment@3 server is running');
});

app.use(globalErrorHandler);
app.use(notFound);
export default app;
