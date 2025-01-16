const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');


let mongoServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create({
    instance: {

      port: 27017, // Use a specific port
    },


  });
  // const uri = mongoServer.getUri()

  mongoose.set('strictQuery', false); 
   await mongoose.connect(process.env.MONGO_URI, {
         useNewUrlParser: true,
         useUnifiedTopology: true
  });
});

afterAll(async () => {
  await mongoose.disconnect();
  if (mongoServer) await mongoServer.stop();
});

// const mongoose = require('mongoose');
// const { MongoMemoryServer } = require('mongodb-memory-server');
// const app = require('../index'); // Ensure you're importing your app
// let mongoServer, server;

// beforeAll(async () => {
//   mongoServer = await MongoMemoryServer.create({
//     instance: {
//       port: 27017, // Use a specific port
//     },
//   });

//   mongoose.set('strictQuery', false);
//   await mongoose.connect(process.env.MONGO_URI, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   });

//   // Start the server
//   server = app.listen(process.env.PORT || 3000, '0.0.0.0');
// });

// afterAll(async () => {
//   await mongoose.disconnect();
//   if (mongoServer) await mongoServer.stop();
//   if (server) server.close(); // Ensure server is closed
// });
