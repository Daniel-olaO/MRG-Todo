/* eslint-disable @typescript-eslint/no-explicit-any */
import * as dotenv from 'dotenv';
import mongoose from 'mongoose';
import { randomBytes } from 'crypto';  
dotenv.config()
class Database {
   private static _database: Database
   env: any = process.env
   private constructor() {
      const url = this.env.NODE_ENV === 'test'? this.randomizeMongoURL(this.env.DB_CONNECTION_URL):
      this.env.DB_CONNECTION_URL;
        mongoose.connect(url)
        .then(() => console.log('Connected with database'))
        .catch(() => console.log('Not connected with database'))
   }
   private randomizeMongoURL(url: string): string {
		return url.replace(
			/([^/]\/)([^/][a-zA-Z-_0-9]+)/,
			`$1${randomBytes(4).toString('hex')}`,
		);
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