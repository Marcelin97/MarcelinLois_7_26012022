const express = require("express");
const router = express.Router();

//* User controller
const postsCtrl = require("../controllers/post");

//* Middlewares
const { isLoggedIn } = require("../middleware/auth");
const multer = require("../middleware/multer-config");

router.post("/", isLoggedIn, multer, postsCtrl.createPost);

// router.post("/:id/share", postsController.sharePost);
// router.post("/:id/likes", postsController.handleLike);
// router.post("/:id/reports", postsController.reportPost);

// router.get("/", postsController.getAllPosts);
// router.get("/reports", hasRole("admin"), postsController.getReportedPosts);
// router.get("/:username/feed", postsController.getPostsFeed);
// router.get("/:id", postsController.getPostById);
// router.get("/:id/likes", hasRole("admin"), postsController.getPostLikes);
// router.get("/:id/comments", postsController.getPostComments);
// router.get("/:id/reports", hasRole("admin"), postsController.getPostReports);

// router.patch("/:id", postsController.updatePost);

// router.delete("/:id", postsController.deletePost);
// router.delete("/:id/share", postsController.unsharePost);
// router.delete("/:id/likes", postsController.unlikePost);
// router.delete(
//   "/:id/reports",
//   hasRole("admin"),
//   postsController.deletePostReports
// );

module.exports = router;