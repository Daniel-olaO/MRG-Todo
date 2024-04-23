import express, { type Express, type Request, type Response } from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { router } from './routes/routes'

dotenv.config()

export const app: Express = express()

app.use(express.json())
app.use(cors<Request>())

app.use('/api', router)

app.get('/api', (req: Request, res: Response): Response => {
  return res.status(200).send({ message: 'Welcome to MRG todo API!' })
})
