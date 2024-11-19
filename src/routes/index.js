// This file will be responsible for maintaing all the routes directions.

const express = require('express');
const router = express.Router();

const receiptRoutes = require('./receiptsRoutes');

// Register the routes with the app
router.use('/receipts', receiptRoutes);

module.exports = router;
