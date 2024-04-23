import { databaseConnect } from './database/index'
import { app } from './server'

const HTTP_PORT = process.env.HTTP_PORT || 8000

app.listen(HTTP_PORT, async (): Promise<void> => {
  databaseConnect().then(() => {
    console.log(`Server is running on port ${HTTP_PORT}`)
  })
})
