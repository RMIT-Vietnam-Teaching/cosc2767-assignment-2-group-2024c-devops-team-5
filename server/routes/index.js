// const router = require('express').Router();
// const apiRoutes = require('./api');

// // const keys = require('../config/keys');
// import keys from '../config/keys.js';
// const { apiURL } = keys.app;

// const api = `/${apiURL}`;

// // api routes
// router.use(api, apiRoutes);
// router.use(api, (req, res) => res.status(404).json('No API route found'));

import express from 'express';
import apiRoutes from '../routes/api/index.js';
import keys from '../config/keys.js';

const router = express.Router();
const { apiURL } = keys.app;

const api = `/${apiURL}`;

// api routes
router.use(api, apiRoutes);
router.use(api, (req, res) => res.status(404).json('No API route found'));

export default router;
