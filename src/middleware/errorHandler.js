function errorHandler(err, req, res, next) {
  console.error("Error:", err.stack);

  res.status(err.status || 500).json({
    error: err.message || "Internal server error",
    success: false,
  });
}

function notFound(req, res) {
  res.status(404).json({ error: `Route ${req.url} not found` });
}

module.exports = { errorHandler, notFound };
