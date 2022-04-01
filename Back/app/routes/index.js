const express = require("express");
const router = express.Router();

// * Middlewares secure
const rateLimiter = require("../middleware/rateLimiter");
const slowDown = require("../middleware/speedLimiter");

// * All routes
const userRoutes = require("./user");
const communityRoutes = require("./community")
const postsRoutes = require("./post");
const commentsRoutes = require("./comment");


// * on applique nos routes à notre router
router.use("/auth", rateLimiter, slowDown, userRoutes);
router.use("/community", rateLimiter, slowDown, communityRoutes);
router.use("/posts", rateLimiter, slowDown, postsRoutes);
router.use("/comments", rateLimiter, slowDown, commentsRoutes);

module.exports = router;
