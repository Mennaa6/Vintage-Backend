require("dotenv").config();
const express = require("express");
const cors = require("cors");

const connectDB = require("./connect");
const authRoutes = require("./routes/authRoutes");
const productRoutes = require("./routes/products");
const userRoutes = require("./routes/users");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);

// Error Handling Middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    status: "error",
    message: "Something went wrong!",
  });
});

// Start the server if DB connection succeeds
const PORT = process.env.PORT || 3000;
const start = async () => {
  try {
    await connectDB(process.env.DB);
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (err) {
    console.error("Failed to connect to DB:", err);
  }
};

start();

module.exports = app;
