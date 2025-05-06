require("dotenv").config();
const express = require("express");
const connectDB = require("./connect");
const authRoutes = require("./routes/authRoutes");
const productRoutes = require("./routes/products");

const app = express();

// Middleware
app.use(express.json());

// Database Connection
connectDB(process.env.DB);

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);

// Error Handling Middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    status: "error",
    message: "Something went wrong!",
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
