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
  // isModerator,
  // isAdmin
  commentsCtrl.updateComment
);

router.delete(
  "/delete/:id",
  isLoggedIn,
  // isModerator,
  // isAdmin
  commentsCtrl.deleteComment
);

router.post(
  "/likes/:id",
  isLoggedIn,
  commentsCtrl.likeDislikeComment
);

router.post("/reports/:id", isLoggedIn, commentsCtrl.reportComment);

router.get("/read/:id", isLoggedIn, commentsCtrl.readCommentById);

router.get("/readAll",isLoggedIn, commentsCtrl.readAllComments);

module.exports = router;
