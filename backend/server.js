const express = require("express");
const cors = require("cors");
const swaggerUi = require("swagger-ui-express");
const swaggerJsdoc = require("swagger-jsdoc");
require("dotenv").config();

const connectDB = require("./src/config/db");
const menuRoutes = require("./src/routes/menuroutes");
const orderRoutes = require("./src/routes/orderRoutes");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Swagger Configuration
const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Cafe Menu & Order Management API",
      version: "1.0.0",
      description: "API documentation for Cafe Menu and Order Management System",
    },
    servers: [
      {
        url: "http://localhost:5000",
      },
    ],
  },
  apis: ["./src/routes/*.js"],
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);

// Swagger Route
app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// API Routes
app.use("/api/menu", menuRoutes);
app.use("/api/orders", orderRoutes);

// Test API
app.get("/", (req, res) => {
  res.send("Cafe Menu & Order Management API is Running!");
});

// Start Server
const PORT = process.env.PORT || 5000;

const startServer = async () => {
  await connectDB();

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};

startServer();
