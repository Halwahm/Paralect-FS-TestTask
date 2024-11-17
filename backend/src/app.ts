import express, { Application, NextFunction, ErrorRequestHandler, Request, Response } from 'express';
import cors from 'cors';
import { connectDB } from './config/db';
import { CustomError } from './types/customError';

const app: Application = express();

app.use(cors({
  origin: '*',
}));
app.use(express.json());

connectDB();

app.use('/api/jobs', require('./modules/job/job.controller'));

const errorHandler: ErrorRequestHandler = (err, _req, res, _next) => {
    console.error(err);
    res.status(err.status || 500).json({
      message: err.message || 'Internal Server Error',
    });
  };
  
app.use(errorHandler);

app.use((err: CustomError, _req: Request, res: Response, _next: NextFunction) => {
    console.error(err);
    res.status(err.status || 500).json({ message: err.message || 'Internal Server Error' });
});
  
export default app;
