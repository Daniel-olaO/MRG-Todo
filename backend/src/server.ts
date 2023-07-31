import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { router } from './routes/routes';
import Database  from './database/dbconfig';



export const app: Express = express();
dotenv.config();
app.use(express.json());
app.use(cors<Request>());
Database.getInstance()

if (process.env.NODE_ENV === 'DEV' || process.env.NODE_ENV === 'TEST') {
   Database.getInstance()
}

app.use('/api', router);

app.get('/api', (req:Request, res:Response):Response =>{
    return res.status(200).send({message: 'Welcome to MRG todo API!'});
});


