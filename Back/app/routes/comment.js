const express = require("express");
const router = express.Router();

//* Post controller
const commentsCtrl = require("../controllers/comment");

//* Middlewares
const { isLoggedIn, isAdmin } = require("../middleware/auth");
const multer = require("../middleware/multer-config");

//=================================>
//* CREATE A COMMENT
//=================================>
router.post("/", isLoggedIn, commentsCtrl.createComment);

// router.get("/:commentId", commentController.readOne);

//=================================>
//* UPDATE A COMMENT
//=================================>
router.put(
  "/update/:id",
  isLoggedIn,
  //   moderatorMiddleware,
  commentsCtrl.updateComment
);

router.delete(
  "/delete/:id",
  isLoggedIn,
  //   moderatorMiddleware,
  commentsCtrl.deleteComment
);

router.post(
  "/likes/:id",
  isLoggedIn,
  commentsCtrl.likeDislikeComment
);

router.post("/reports/:id", isLoggedIn, commentsCtrl.reportComment);

// router.get("/post/:postId", commentController.readAll);

module.exports = router;
