
const express = require("express");
const router = express.Router();

const {
  placeOrder,
  getOrders,
  updateOrderStatus,
} = require("../controllers/OrderController");

/**
 * @swagger
 * /api/orders:
 *   post:
 *     summary: Place a new customer order
 *     tags: [Orders]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - customerName
 *               - phone
 *               - items
 *             properties:
 *               customerName:
 *                 type: string
 *                 example: Anjali
 *               phone:
 *                 type: string
 *                 example: "9876543210"
 *               items:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     menuItem:
 *                       type: string
 *                       example: "6ae626a20cacd587d071ab7e"
 *                     name:
 *                       type: string
 *                       example: Cappuccino
 *                     quantity:
 *                       type: integer
 *                       example: 2
 *                     price:
 *                       type: number
 *                       example: 140
 *     responses:
 *       201:
 *         description: Order placed successfully
 */
router.post("/", placeOrder);

/**
 * @swagger
 * /api/orders:
 *   get:
 *     summary: Get all customer orders
 *     tags: [Orders]
 *     responses:
 *       200:
 *         description: Orders retrieved successfully
 */
router.get("/", getOrders);

/**
 * @swagger
 * /api/orders/{id}/status:
 *   put:
 *     summary: Update order status
 *     tags: [Orders]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               status:
 *                 type: string
 *                 enum: [Pending, Preparing, Ready, Completed, Cancelled]
 *                 example: Preparing
 *     responses:
 *       200:
 *         description: Order status updated successfully
 */
router.put("/:id/status", updateOrderStatus);

module.exports = router;
