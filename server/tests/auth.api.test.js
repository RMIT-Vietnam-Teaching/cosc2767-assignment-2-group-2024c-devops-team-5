// const request = require("supertest");
// const mongoose = require("mongoose");
// const bcrypt = require("bcryptjs");
// const app = require("../index");
// const User = require("../models/user");

// // Configuration
// const MONGODB_URI = process.env.MONGO_URI || "mongodb://localhost:27017/test-db";

// // Increase timeout for database operations
// jest.setTimeout(30000);


// describe("Auth API Integration Tests", () => {
//   let testUser;

//   beforeAll(async () => {
//     try {
//       await mongoose.connect(MONGODB_URI);
//       console.log("Connected to MongoDB test database");
//     } catch (error) {
//       console.error("Error connecting to MongoDB:", error);
//       throw error;
//     }
//   });

//   beforeEach(async () => {
//     try {
//       await User.deleteMany({});
      
//       // Create test user
//       testUser = await User.create({
//         email: "testuser@example.com",
//         firstName: "Test",
//         lastName: "User",
//         password: await bcrypt.hash("password123", 10),
//       });
//     } catch (error) {
//       console.error("Error in test setup:", error);
//       throw error;
//     }
//   });

//   afterAll(async () => {
//     try {
//       await mongoose.connection.close();
//       console.log("Closed MongoDB connection");
//     } catch (error) {
//       console.error("Error during cleanup:", error);
//       throw error;
//     }
//   });

//   describe("POST /api/auth/login", () => {
//     it("should login with valid credentials", async () => {
//       const res = await request(app)
//         .post("/api/auth/login")
//         .send({
//           email: "testuser@example.com",
//           password: "password123",
//         });

//       expect(res.status).toBe(200);
//       expect(res.body).toHaveProperty("token");
//       expect(res.body.user).toBeDefined();
//     });

//     it("should fail with invalid email", async () => {
//       const res = await request(app)
//         .post("/api/auth/login")
//         .send({
//           email: "wrong@example.com",
//           password: "password123",
//         });

//       expect(res.status).toBe(400);
//     });
//   });

//   describe("POST /api/auth/register", () => {
//     it("should register new user", async () => {
//       const res = await request(app)
//         .post("/api/auth/register")
//         .send({
//           email: "new@example.com",
//           firstName: "New",
//           lastName: "User",
//           password: "password123",
//         });
//       expect(res.status).toBe(200);
//       expect(res.body.user).toBeDefined();
//     });

//     it("should prevent duplicate email", async () => {
//       const res = await request(app)
//         .post("/api/auth/register")
//         .send({
//           email: "testuser@example.com",
//           firstName: "Test",
//           lastName: "User",
//           password: "password123",
//         });

//       expect(res.status).toBe(400);
//     });
//   });
// });;;



const request = require("supertest");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const app = require("../index");
const User = require("../models/user");

// Mock mailgun-js
jest.mock('mailgun-js', () => {
  return () => ({
    messages: () => ({
      send: jest.fn().mockResolvedValue({ message: 'Email sent' })
    })
  });
});

// Configuration
const MONGODB_URI = process.env.MONGO_URI || "mongodb://localhost:27017/test-db";

// Prevent app from starting server
let server;
beforeAll(async () => {
  // Store original listen function
  const originalListen = app.listen.bind(app);
  app.listen = jest.fn(() => {
    console.log('Prevented automatic server start');
    return { close: () => {} };
  });

  try {
    await mongoose.connect(MONGODB_URI);
    console.log("Connected to MongoDB test database");
    
    // Create a server instance for testing
    server = originalListen(0); // Use port 0 for random available port
  } catch (error) {
    console.error("Error in setup:", error);
    throw error;
  }
});

beforeEach(async () => {
  try {
    await User.deleteMany({});
    
    // Create test user
    const testUser = await User.create({
      email: "testuser@example.com",
      firstName: "Test",
      lastName: "User",
      password: await bcrypt.hash("password123", 10),
    });
  } catch (error) {
    console.error("Error in test setup:", error);
    throw error;
  }
});

afterAll(async () => {
  try {
    if (server) {
      await new Promise((resolve) => server.close(resolve));
    }
    await mongoose.connection.close();
    console.log("Cleaned up test resources");
  } catch (error) {
    console.error("Error in cleanup:", error);
  }
});

describe("Auth API Integration Tests", () => {
  describe("POST /api/auth/login", () => {
    it("should login with valid credentials", async () => {
      const res = await request(app)
        .post("/api/auth/login")
        .send({
          email: "testuser@example.com",
          password: "password123",
        });

      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty("token");
      expect(res.body.user).toBeDefined();
    }, 10000);

    it("should fail with invalid email", async () => {
      const res = await request(app)
        .post("/api/auth/login")
        .send({
          email: "wrong@example.com",
          password: "password123",
        });

      expect(res.status).toBe(400);
    }, 10000);
  });

  describe("POST /api/auth/register", () => {
    it("should register new user", async () => {
      const res = await request(app)
        .post("/api/auth/register")
        .send({
          email: "new@example.com",
          firstName: "New",
          lastName: "User",
          password: "password123",
        });

      expect(res.status).toBe(200);
      expect(res.body.user).toBeDefined();
    }, 10000);

    it("should prevent duplicate email", async () => {
      const res = await request(app)
        .post("/api/auth/register")
        .send({
          email: "testuser@example.com",
          firstName: "Test",
          lastName: "User",
          password: "password123",
        });

      expect(res.status).toBe(400);
    }, 10000);
  });
});

