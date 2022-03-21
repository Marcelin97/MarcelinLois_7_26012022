const express = require("express");
const router = express.Router();

//* User controller
const postsCtrl = require("../controllers/post");

//* Middlewares
const { isLoggedIn, isAdmin } = require("../middleware/auth");
const multer = require("../middleware/multer-config");

router.post("/", isLoggedIn, multer, postsCtrl.createPost);
router.get("/read/:id", isLoggedIn, postsCtrl.getPostById);
router.get("/readAll", isLoggedIn, postsCtrl.getAllPosts);
router.patch("/update/:id", isLoggedIn, multer, postsCtrl.updatePost);

router.post("/:id/likes",isLoggedIn, postsCtrl.likePost);
// router.get("/:id/likes", hasRole("admin"), postsController.getPostLikes);

router.post("/:id/reports", isLoggedIn, postsCtrl.reportPost);

router.delete("/delete/:id", isLoggedIn, postsCtrl.deletePost); // add isAdmin or isModerator

module.exports = router;
