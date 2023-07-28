import mongoose from 'mongoose';

export const connect = async () => {
    try {
        await mongoose.connect(process.env.DB_CONNECTION_URL);
        console.log('Database connected');
    } catch (error) {
        console.log(error.message);
        process.exit(1);
    }
}
