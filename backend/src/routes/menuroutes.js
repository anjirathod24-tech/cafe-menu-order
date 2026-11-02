
const express = require("express");
const router = express.Router();

const {
  getMenuItems,
  addMenuItem,
  updateMenuItem,
  deleteMenuItem,
} = require("../controllers/MenuController");

/**
 * @swagger
 * components:
 *   schemas:
 *     Menu:
 *       type: object
 *       required:
 *         - name
 *         - price
 *         - category
 *       properties:
 *         name:
 *           type: string
 *           example: Cappuccino
 *         description:
 *           type: string
 *           example: Fresh coffee with milk
 *         price:
 *           type: number
 *           example: 120
 *         category:
 *           type: string
 *           example: Beverages
 *         image:
 *           type: string
 *           example: ""
 *         available:
 *           type: boolean
 *           example: true
 */

/**
 * @swagger
 * /api/menu:
 *   get:
 *     summary: Get all menu items
 *     tags: [Menu]
 *     responses:
 *       200:
 *         description: Menu items retrieved successfully
 */
router.get("/", getMenuItems);

/**
 * @swagger
 * /api/menu:
 *   post:
 *     summary: Add a new menu item
 *     tags: [Menu]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Menu'
 *     responses:
 *       201:
 *         description: Menu item added successfully
 */
router.post("/", addMenuItem);

/**
 * @swagger
 * /api/menu/{id}:
 *   put:
 *     summary: Update a menu item
 *     tags: [Menu]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Menu item ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Menu'
 *     responses:
 *       200:
 *         description: Menu item updated successfully
 *       400:
 *         description: Invalid menu item data
 *       404:
 *         description: Menu item not found
 */
router.put("/:id", updateMenuItem);

/**
 * @swagger
 * /api/menu/{id}:
 *   delete:
 *     summary: Delete a menu item
 *     tags: [Menu]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Menu item ID
 *     responses:
 *       200:
 *         description: Menu item deleted successfully
 *       404:
 *         description: Menu item not found
 */
router.delete("/:id", deleteMenuItem);

module.exports = router;
