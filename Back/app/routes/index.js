const express = require("express");
const router = express.Router();

//* All routes
const userRoutes = require("./user");
const communityRoutes = require("./community")
const postsRoutes = require("./post");


//* on applique nos routes à notre router
router.use("/auth", userRoutes);
router.use("/community", communityRoutes);
router.use("/posts", postsRoutes);

module.exports = router;
