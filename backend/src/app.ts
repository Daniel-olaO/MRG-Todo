import * as dotenv from 'dotenv';
import {app, connectDB} from './server';
const HTTP_PORT = process.env.HTTP_PORT || 8000;

dotenv.config();

try {
   app.listen(HTTP_PORT, async(): Promise<void> => {
      await connectDB();
      console.log(`Connected successfully on port ${HTTP_PORT}`);
   })
} catch (error) {
   if (error instanceof Error) {
      console.log(`Error occured: (${error.message})`)
   }
}