const express = require('express');
const router = express.Router();
const { Payment, Order } = require('../models');

router.post('/', async (req, res) => {
  const { orderId, method, amount } = req.body;
  const payment = await Payment.create({ orderId, method, amount, status: 'COMPLETED' });
  const order = await Order.findByPk(orderId);
  order.status = 'PAID';
  await order.save();
  res.json(payment);
});

module.exports = router;