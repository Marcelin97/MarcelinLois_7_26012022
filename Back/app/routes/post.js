const express = require("express");
const router = express.Router();

//* User controller
const postsCtrl = require("../controllers/post");

//* Middlewares
const { isLoggedIn, isAdmin } = require("../middleware/auth");
const multer = require("../middleware/multer-config");

router.post("/", isLoggedIn, multer, postsCtrl.createPost);
router.get("/read/:id",isLoggedIn, postsCtrl.getPostById);
router.get("/readAll", isLoggedIn, postsCtrl.getAllPosts);


// router.post("/:id/likes", postsController.handleLike);
// router.post("/:id/reports", postsController.reportPost);

// router.get("/reports", hasRole("admin"), postsController.getReportedPosts);
// router.get("/:username/feed", postsController.getPostsFeed);
// router.get("/:id/likes", hasRole("admin"), postsController.getPostLikes);
// router.delete("/:id/likes", postsController.unlikePost);
// router.get("/:id/reports", hasRole("admin"), postsController.getPostReports);

// router.patch("/:id", postsController.updatePost);

// router.delete("/:id", postsController.deletePost);
// router.delete(
//   "/:id/reports",
//   hasRole("admin"),
//   postsController.deletePostReports
// );

module.exports = router;