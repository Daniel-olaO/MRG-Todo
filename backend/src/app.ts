import express, { Express, Request } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { router } from './routes/routes';
import { connect} from './database/dbconfig';

const HTTP_PORT = process.env.HTTP_PORT || 8000;

export const app: Express = express();
dotenv.config();
app.use(express.json());
app.use(cors<Request>());

app.use('/api', router);



connect()
app.listen(HTTP_PORT, ()=>{
    console.log(`Sever listening on ${HTTP_PORT}`);
});

