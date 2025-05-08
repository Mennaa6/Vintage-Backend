const express = require("express");
const router = express.Router();
const {
  createOrder,
  getAllOrdersByUser,
  getSingleOrderByUser,
} = require("../controllers/orderController");

// Create order
router.post("/", createOrder);

// Get all orders for a specific user
router.get("/user/:userId", getAllOrdersByUser);

// Get single order for a user
router.get("/user/:userId/order/:orderId", getSingleOrderByUser);

module.exports = router;
