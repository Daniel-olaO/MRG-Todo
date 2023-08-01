const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');

let mongod: any = null;

export const connect = async () => {
   mongod = new MongoMemoryServer.create();
  const uri = await mongod.getUri();

  await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
  });
};
export const dropCollections = async () => {
  if (mongod) {
    const collections = await mongoose.connection.db.collections();
    for (let collection of collections) {
      await collection.remove();
    }
  }
};
export const disconnect = async () => {
  if (mongod){
   await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
    await mongod.stop();
  }
};
