const express = require("express");
const router = express.Router();

//* All routes
const userRoutes = require("./user");
const communityRoutes = require("./community")
const postsRoutes = require("./post");
const commentsRoutes = require("./comment");


//* on applique nos routes à notre router
router.use("/auth", userRoutes);
router.use("/community", communityRoutes);
router.use("/posts", postsRoutes);
router.use("/comments", commentsRoutes);

module.exports = router;
