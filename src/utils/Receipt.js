// utils/ReceiptProcessor.js

class ReceiptProcessor {
  constructor(receipt) {
    this.retailer = receipt.retailer;
    this.purchaseDate = new Date(receipt.purchaseDate);
    this.purchaseTime = new Date(`1970-01-01T${receipt.purchaseTime}Z`);
    this.items = receipt.items;
    this.total = parseFloat(receipt.total);
  }

  calculatePoints() {
    let points = 0;

    // Rule 1: One point for every alphanumeric character in the retailer name
    points += this.retailer.replace(/[^a-zA-Z0-9]/g, '').length;

    // Rule 2: 50 points if the total is a round dollar amount with no cents
    if (this.total % 1 === 0) {
      points += 50;
    }

    // Rule 3: 25 points if the total is a multiple of 0.25
    if (this.total % 0.25 === 0) {
      points += 25;
    }

    // Rule 4: 5 points for every two items
    points += Math.floor(this.items.length / 2) * 5;

    // Rule 5: Points based on item description length (multiple of 3)
    this.items.forEach((item) => {
      const trimmedDescription = item.shortDescription.trim();
      if (trimmedDescription.length % 3 === 0) {
        points += Math.ceil(item.price * 0.2);
      }
    });

    // Rule 6: 6 points if the purchase day is odd
    if (this.purchaseDate.getDate() % 2 !== 0) {
      points += 6;
    }

    // Rule 7: 10 points if the purchase time is between 2:00pm and 4:00pm
    if (
      this.purchaseTime.getHours() >= 14 &&
      this.purchaseTime.getHours() < 16
    ) {
      points += 10;
    }

    return points;
  }
}

module.exports = ReceiptProcessor;
