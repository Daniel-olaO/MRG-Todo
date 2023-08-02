import mongoose from 'mongoose';
import * as crypto from "crypto";
import { MongoMemoryServer } from 'mongodb-memory-server';

let mongod: MongoMemoryServer;

export const connect = async () => {
   mongod = await MongoMemoryServer.create();
   const uri = await mongod.getUri();
   const randomURL = randomizeMongoURL(uri);
  await mongoose.createConnection(randomURL);
};

export const disconnect = async () => {
  if (mongod){
   await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
    await mongod.stop();
  }
};

const randomizeMongoURL = (url: string): string => {
		return url.replace(
			/([^/]\/)([^/][a-zA-Z-_0-9]+)/,
			`$1${crypto.randomBytes(4).toString('hex')}`,
		);
}