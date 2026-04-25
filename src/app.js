const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");
require("dotenv").config();

const chatRoutes = require("./routes/chatRoutes");
const adminRoutes = require("./routes/adminRoutes");
const { errorHandler, notFound } = require("./middleware/errorHandler");
const { adminAuth } = require("./middleware/auth");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "../public")));

// Public routes (no auth)
app.use("/api", chatRoutes);

// Admin API routes (protected)
app.use("/api/admin", adminAuth, adminRoutes);

// Serve admin HTML files (protected)
const adminPath = path.join(__dirname, "../admin");

app.get("/admin", adminAuth, (req, res) => {
  res.sendFile(path.join(adminPath, "index.html"));
});

app.get("/admin/:page", adminAuth, (req, res) => {
  const page = req.params.page;
  const filePath = path.join(adminPath, page);

  if (fs.existsSync(filePath) && page.endsWith(".html")) {
    res.sendFile(filePath);
  } else {
    res.status(404).json({ error: `Page ${page} not found` });
  }
});

// Public test pages (no auth)
app.get("/coffee-shop.html", (req, res) => {
  res.sendFile(path.join(__dirname, "../public", "coffee-shop.html"));
});

app.get("/gym-website.html", (req, res) => {
  res.sendFile(path.join(__dirname, "../public", "gym-website.html"));
});

// Error handling
app.use(notFound);
app.use(errorHandler);

module.exports = app;
