// controllers/receiptController.js
const uuid = require('uuid');
const Receipt = require('../utils/Receipt');

const receipts = {};

const processReceipt = (req, res) => {
  try {
    const receipt = req.body;

    const processor = new Receipt(receipt);
    const points = processor.calculatePoints();

    const receiptId = uuid.v4();
    receipts[receiptId] = { points };

    res.status(200).json({ id: receiptId });
  } catch (err) {
    res.status(400).json({ error: 'The receipt is invalid' });
  }
};

const getReceiptPoints = (req, res) => {
  const receiptId = req.params.id;

  const receipt = receipts[receiptId].points;

  if (!receipt) {
    return res.status(404).json({ error: 'No receipt found for that id' });
  }

  res.status(200).json({ points: receipt });
};

module.exports = {
  processReceipt,
  getReceiptPoints,
};
