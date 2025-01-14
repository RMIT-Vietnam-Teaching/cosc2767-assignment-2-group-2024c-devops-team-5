// Load environment variables from a .env file into process.env
// Import environment variables from a .env file into process.env
// import('dotenv').then((dotenv) => dotenv.config());
// require('dotenv').config();

// // Import required modules
// const express = require('express');
// const chalk = require('chalk');
// const cors = require('cors');
// const helmet = require('helmet');

// // Import custom modules
// const keys = require('./config/keys');
// const routes = require('./routes');
// const socket = require('./socket');

import('dotenv').then((dotenv) => dotenv.config());

// Import required modules
import express from 'express';
import chalk from 'chalk';
import cors from 'cors';
import helmet from 'helmet';

// Import custom modules
import keys from './config/keys.js';
import routes from './routes/index.js';
import socket from './socket/index.js';
import setupDB from './utils/db.js';


// Destructure port from keys configuration
const { port } = keys;

// Initialize the Express application
const app = express();

// Middleware to parse URL-encoded data and JSON data
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Middleware to enhance security by setting various HTTP headers
app.use(
  helmet({
    contentSecurityPolicy: false, // Disable CSP for compatibility reasons
    frameguard: true // Enable frameguard to prevent clickjacking
  })
);

// Middleware to enable Cross-Origin Resource Sharing
app.use(cors());

// Setup the database connection
try{

  setupDB();
} catch(err){
  console.log(err);
  process.exit(1);
}

// Configure Passport.js for authentication
require('./config/passport')(app);

// Use the defined routes for handling requests
app.use(routes);

// Start the server and listen on the specified port
const server = app.listen(port, '0.0.0.0', () => {
  console.log(
    `${chalk.green('✓')} ${chalk.blue(
      `Listening on port ${port}. Visit http://localhost:${port}/ in your browser.`
    )}`
  );
});

// Initialize WebSocket server
socket(server);



// Export the Express application for testing purposes
module.exports = app;
