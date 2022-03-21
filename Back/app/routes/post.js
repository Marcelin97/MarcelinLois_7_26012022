const express = require("express");
const router = express.Router();

//* User controller
const postsCtrl = require("../controllers/post");

//* Middlewares
const { isLoggedIn, isAdmin } = require("../middleware/auth");
const multer = require("../middleware/multer-config");

router.post("/", isLoggedIn, multer, postsCtrl.createPost);
router.get("/read/:id", isLoggedIn, postsCtrl.readPostById);
router.get("/readAll", isLoggedIn, postsCtrl.readAllPosts);
router.patch("/update/:id", isLoggedIn, multer, postsCtrl.updatePost);
router.delete("/delete/:id", isLoggedIn, postsCtrl.deletePost); // add isAdmin or isModerator

router.post("/:id/reports", isLoggedIn, postsCtrl.reportPost);

router.post("/:id/likes", isLoggedIn, postsCtrl.likeDislikePost);
// router.get("/:id/likes", hasRole("admin"), postsController.getPostLikes);

router.post("/:postId/save", postsCtrl.saveUnsavePost);



module.exports = router;
