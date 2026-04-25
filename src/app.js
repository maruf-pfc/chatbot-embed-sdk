const express = require("express");
const cors = require("cors");
const path = require("path");
const fs = require("fs");
require("dotenv").config();

const chatRoutes = require("./routes/chatRoutes");
const adminRoutes = require("./routes/adminRoutes");
const { errorHandler, notFound } = require("./middleware/errorHandler");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "../public")));

// Heath Check
app.get("/health", (req, res) => {
  res.status(200).json({ status: "OK" });
});

// Routes
app.use("/api", chatRoutes);
app.use("/api/admin", adminRoutes);

// Admin paths
const adminPath = path.join(__dirname, "../admin");
const publicPath = path.join(__dirname, "../public");

app.use("/admin", express.static(adminPath));

app.get("/admin", (req, res) => {
  res.sendFile(path.join(adminPath, "index.html"));
});

app.get("/admin/:page", (req, res) => {
  const page = req.params.page;
  const filePath = path.join(adminPath, page);

  console.log(`Looking for: ${filePath}`); // Debug log

  // Check if file exists and is an HTML file
  if (fs.existsSync(filePath) && page.endsWith(".html")) {
    res.sendFile(filePath);
  } else {
    res.status(404).json({ error: `Page ${page} not found` });
  }
});
// Serve test page
app.get("/test.html", (req, res) => {
  res.sendFile(path.join(publicPath, "test.html"));
});

// Error handling
app.use(notFound);
app.use(errorHandler);

module.exports = app;
