import mongoose from 'mongoose';
import {app} from './server';

const HTTP_PORT = process.env.HTTP_PORT || 8000;

const connectToDatabase = async (): Promise<void> => {
  try {

    await mongoose.createConnection(`${process.env.DB_CONNECTION_URL}`);

    console.log('Connected to the database');
  } catch (error) {
    console.log('Cannot connect to the database!', error);
    process.exit();
  }
};

app.listen(HTTP_PORT, async(): Promise<void> => {
   connectToDatabase().then(() => {
      console.log(`Server is running on port ${HTTP_PORT}`);
   })
});