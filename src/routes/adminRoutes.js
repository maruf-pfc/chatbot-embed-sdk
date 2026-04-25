const express = require("express");
const adminController = require("../controllers/adminController");

const router = express.Router();

router.get("/clients", adminController.getAllClients);
router.post("/clients", adminController.createOrUpdateClient);
router.delete("/clients/:id", adminController.deleteClient);

module.exports = router;
