const express = require("express");
const router = express.Router();
// J'importe mon middleware pour la limite de requête
// et je l'applique sur ma route d'authentification.
const rateLimiter = require("../middleware/rateLimiter");

// * All routes
const userRoutes = require("./user");
const communityRoutes = require("./community")
const postsRoutes = require("./post");
const commentsRoutes = require("./comment");


// * on applique nos routes à notre router
router.use("/auth", rateLimiter, userRoutes);
router.use("/community", communityRoutes);
router.use("/posts", postsRoutes);
router.use("/comments", commentsRoutes);

module.exports = router;
