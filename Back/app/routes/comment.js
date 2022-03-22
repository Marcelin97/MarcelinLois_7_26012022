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
// router.put(
//   "/:commentId",
//   authMiddleware,
//   moderatorMiddleware,
//   commentController.update
// );
// router.delete(
//   "/:commentId",
//   authMiddleware,
//   moderatorMiddleware,
//   commentController.delete
// );
// router.post("/:commentId/like", authMiddleware, commentController.like);
// router.post("/:commentId/report", authMiddleware, commentController.report);
// router.delete(
//   "/:commentId/report/:reportId",
//   authMiddleware,
//   commentController.deleteReport
// );
// router.get("/post/:postId", commentController.readAll);

module.exports = router;
