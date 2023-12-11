import express, { Application, Request, Response } from 'express';
import cors from 'cors';

const app: Application = express();

// parser
app.use(express.json());
app.use(cors());

//application routes

// app.use('/api/users',);

app.get('/', (req: Request, res: Response) => {
  res.send('Assignment@3 server is running');
});
app.use((req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    message: "API Not Found",
    error: [
      {
        path: req.originalUrl,
        message: "API Not Found",
      },
    ],
  });
});
export default app;
