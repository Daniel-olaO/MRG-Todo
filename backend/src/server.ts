import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import mongoose from 'mongoose';
import { router } from './routes/routes';



export const app: Express = express();
dotenv.config();
app.use(express.json());
app.use(cors<Request>());

export const connectDB = async () => {
    const connectionString = process.env.DB_CONNECTION_URL;
    try {
        await mongoose.connect(`${connectionString}`);
        console.log('Connected to DB');
    } catch (error) {
        console.log(error);
        process.exit();
    }
}

app.use('/api', router);

app.get('/api', (req:Request, res:Response):Response =>{
    return res.status(200).send({message: 'Welcome to MRG todo API!'});
});


