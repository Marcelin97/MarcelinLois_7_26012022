const express = require("express");
const router = express.Router();

// * Post controller
const postsCtrl = require("../controllers/post");

// * Middlewares
const { isLoggedIn} = require("../middleware/auth");
const multer = require("../middleware/multer-config");

//=================================>
// * CREATE A POST
//=================================>
router.post("/", isLoggedIn, multer, postsCtrl.createPost);

//=================================>
// * READ A POST BY ID
//=================================>
router.get("/:id/read", isLoggedIn, postsCtrl.readPostById);

//=================================>
// * READ ALL POSTS
//=================================>
router.get("/readAll", isLoggedIn, postsCtrl.readAllPosts);

//=================================>
// * Find all posts by community
//=================================>
router.get("/readAllPostByCommunity/:id", isLoggedIn, postsCtrl.readAllPostByCommunity);

//=================================>
// * Find all posts by community follow
//=================================>
router.get(
  "/readAllPostByCommunityFollow",
  isLoggedIn,
  postsCtrl.readAllPostByCommunityFollow
);

//=================================>
// * Find all posts with a lot of likes
//=================================>
router.get("/manyLikes", isLoggedIn, postsCtrl.manyLikes);

//=================================>
// * UPDATE A POST
//=================================>
router.patch("/:id/update", isLoggedIn, multer, postsCtrl.updatePost);

//=================================>
// * DELETE A POST
//=================================>
router.delete("/:id/delete", isLoggedIn, postsCtrl.deletePost); // add isAdmin or isModerator

//=================================>
// * REPORT A POST
//=================================>
router.post("/:id/reports", isLoggedIn, postsCtrl.reportPost);

//=================================>
// * LIKE A POST
//=================================>
router.post("/:id/likes", isLoggedIn, postsCtrl.likePost);

//=================================>
// * DISLIKE A POST
//=================================>
// router.post("/:id/dislikes", isLoggedIn, postsCtrl.dislikePost);

//=================================>
// * SAVE OR UNSAVE A POST
//=================================>
router.post("/:id/save", isLoggedIn, postsCtrl.saveUnsavePost);

module.exports = router;
