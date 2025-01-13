const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const { database } = keys;


const mongoConfig = {
  useNewUrlParser: true,
  serverSelectionTimeoutMS: 5000,
};


let mongoServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create({
    instance: {
      port: 27017, // Use a specific port
    },
  });
  // const uri = mongoServer.getUri();

  mongoose.set('strictQuery', false); 
    await mongoose.connect(database.url, mongoConfig);
});

afterAll(async () => {
  await mongoose.disconnect();
  if (mongoServer) await mongoServer.stop();
});
