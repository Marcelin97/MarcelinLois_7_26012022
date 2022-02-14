const express = require("express");
const router = express.Router();

// on importe nos routes
const userRoutes = require("./user");

// on applique nos routes à notre router
router.use("/auth", userRoutes);

// on exporte le router de ce fichier
module.exports = router;
