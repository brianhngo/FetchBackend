// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const receiptController = require('../controllers/receiptControllers');

// /receipts/process
router.post('/process', receiptController.processReceipt);

// /receipts/:id/points
router.get('/:id/points', receiptController.getReceiptPoints);

module.exports = router;
