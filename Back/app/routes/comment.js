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

// router.post("/:commentId/like", authMiddleware, commentController.like);
// router.post("/:commentId/report", authMiddleware, commentController.report);

// router.get("/post/:postId", commentController.readAll);

module.exports = router;
