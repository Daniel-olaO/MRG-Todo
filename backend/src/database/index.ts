import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config()

export const databaseConnect = async (): Promise<void> => {
  try {
    mongoose.createConnection(`${process.env.DB_CONNECTION_URL}`)

    console.log('Connected to the database')
  } catch (error) {
    console.log('Cannot connect to the database!', error)
    process.exit()
  }
}
