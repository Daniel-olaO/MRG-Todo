import mongoose from 'mongoose'
import * as dotenv from 'dotenv'
dotenv.config()
class Database {
   private static _database: Database
   private constructor() {
        mongoose.connect(process.env.DB_CONNECTION_URL)
        .then(() => console.log('Connected with database'))
        .catch(() => console.log('Not connected with database'))
         
   }
   static getInstance() {
      if (this._database) {
         return this._database
      }
      this._database = new Database()
      return this._database = new Database()
   }
}
export default Database;