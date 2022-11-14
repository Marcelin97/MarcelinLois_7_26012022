const express = require("express");
const router = express.Router();

// * Comment controller
const commentsCtrl = require("../controllers/comment");

// * Middlewares
const { isLoggedIn } = require("../middleware/auth");

//=================================>
// * CREATE A COMMENT
//=================================>
router.post("/", isLoggedIn, commentsCtrl.createComment);

//=================================>
// * READ ALL COMMENT BY POST
//=================================>
router.get("/readAll/:id", isLoggedIn, commentsCtrl.readAllComments);

//=================================>
// * UPDATE A COMMENT
//=================================>
router.put(
  "/update/:id",
  isLoggedIn,
  commentsCtrl.updateComment
);

//=================================>
// * DELETE A COMMENT
//=================================>
router.delete(
  "/delete/:id",
  isLoggedIn,
  commentsCtrl.deleteComment
);

//=================================>
// * LIKE OR DISLIKE A COMMENT
//=================================>
router.post("/likes/:id", isLoggedIn, commentsCtrl.likeDislikeComment);

//=================================>
// * REPORT A COMMENT
//=================================>
router.post("/reports/:id", isLoggedIn, commentsCtrl.reportComment);

//=================================>
// * REPLY A COMMENT
//=================================>
router.post("/reply/:id", isLoggedIn, commentsCtrl.commentReply);

//=================================>
// * DELETE A COMMENT REPLY
//=================================>
router.delete("/delete/reply/:id", isLoggedIn, commentsCtrl.deleteCommentReply);

module.exports = router;
