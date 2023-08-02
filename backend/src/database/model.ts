import dotenv from 'dotenv'
import mongoose from 'mongoose'

dotenv.config()

const conn = mongoose.createConnection(`${process.env.DB_CONNECTION_URL}`)

export type TaskDocument = mongoose.Document & {
  title: string
  date: Date
  isCompleted: boolean
}

const TaskSchema = new mongoose.Schema<TaskDocument>({
  title: { type: String, required: true },
  date: { type: Date, required: true },
  isCompleted: { type: Boolean, required: true, default: false }
})

export const Task = conn.model<TaskDocument>('Task', TaskSchema)
