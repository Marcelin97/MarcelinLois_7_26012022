const {
  user,
  post,
  comment,
  likeComment,
  commentReport,
  commentReplies,
} = require("../models");

// Import the filesystem module
const fs = require("fs");

// * Create comment
exports.createComment = (req, res, next) => {
  let transaction;
  // TODO : Find a post to create a related comment
  post
    .findOne({
      where: { id: req.body.postId },
      include: {
        all: true,
      },
    })
    .then(async (postFind) => {
      if (!postFind) {
        return res.status(404).json({ message: "Post not exists" });
      }

      postFind.createComment({
        content: req.body.content,
        userId: req.auth.userID,
        postId: postFind.id,
      });

      // ! Must be added to the postFind
      postFind.increment("commentsCount", { by: 1, transaction });

      // ! Save the postFind to update comments count
      await postFind.save({ where: { id: req.body.postId } });
      post
        .findOne({
          where: { id: req.body.postId },
          include: {
            all: true,
          },
        })
        .then((result) => {
          return res.status(200).json({
            post: result,
            status: 201,
            message: "Comment created",
          });
        })
        .catch((err) => {
          return res.status(500).json({
            message: "Failed to write a comment",
            err,
          });
        });
    })
    .catch((err) => {
      return res.status(500).json({
        message: "Failed to write a comment",
        err,
      });
    });
};

// * Read a comment by post
exports.readAllComments = (req, res, next) => {
  post
    .findByPk(req.params.id)
    .then((post) => {
      if (!post) {
        return res.status(404).json({ message: "Post not exists" });
      }
      // console.log(post);
      comment
        .findAll({ where: { postId: post.id } })
        .then((commentFind) => {
          // console.log("commentaire", commentFind);
          if (commentFind.length <= 0) {
            return res.status(404).json({ message: "Comment(s) not exists" });
          }

          res.status(200).json({
            status: 200,
            message: "Comment(s) find with success",
            commentFind,
          });
        })
        .catch((err) => {
          return res.status(404).json({ err, message: "Comment not found" });
        });
    })
    .catch((err) => {
      const message = "Could not read all comments by post";
      res.status(500).json({ error: err.message, message });
    });
};

// * Update a comment
exports.updateComment = (req, res, next) => {
  // TODO : Find the comment to update
  const { content } = req.body;

  comment
    .findByPk(req.params.id)
    .then(async (result) => {
      if (!result) {
        return res.status(404).json({ message: "Comment not exists" });
      }

      // TODO : Find logged in user
      const currentUser = await user.findOne({
        where: { id: req.auth.userID },
      });
      if (currentUser == null) throw new Error("Logged in user not found");

      //! TODO : Check if current user is the owner of the post
      isOwner = result.userId == currentUser.id;

      //! TODO : Check if the current user is admin
      isAdmin = currentUser.isAdmin;

      // ! Access denied
      if (!isAdmin && !isOwner) {
        return res.status(403).json({
          error: "You do not have the necessary rights for this action.",
        });
      }

      result.content = content || result.content;

      // TODO : Content management
      if (content) {
        result.content = content;
      }

      await result.save();
      res.status(200).json({
        message: "Comment updated",
        status: 200,
        datas: result,
      });
    })
    .catch((err) => {
      const message = "Comment could not be edited";
      res.status(500).json({ error: err.message, message });
    });
};

// * Delete a comment
exports.deleteComment = (req, res, next) => {
  let transaction;
  // TODO : Find the comment to update
  comment
    .findByPk(req.params.id)
    .then((result) => {
      if (!result) {
        return res.status(404).json({ message: "Comment not exists" });
      }

      // ! Must be the owner to delete the comment
      if (result.userId == req.auth.userID) {
        comment.destroy({ where: { id: req.params.id } });

        post
          .findOne({ where: { id: result.postId } })
          .then((post) => {
            // ! Decrement the comment linked to this post
            post.decrement("commentsCount", { by: 1, transaction });
            // ! Save the post to update comments count
            post.save();
          })
          .catch((err) => {
            res.status(404).json({ err, error: { msg: "Couldn´t find post" } });
          });

        return res.status(200).send("Comment has been deleted!");
      } else {
        return res.status(403).send("You can't delete another user comment");
      }
    })
    .catch((err) => {
      res.status(500).json({ error: err.name, message: err.message });
    });
};

// * Like a comment
exports.likeDislikeComment = async (req, res) => {
  try {
    let commentFind = await comment.findOne({ where: { id: req.params.id } });
    if (commentFind == null) throw new Error("Ce commentaire n'existe pas.");

    let like = req.body.vote;
    let liked = await likeComment.findOne({
      where: { userId: req.auth.userID, commentId: commentFind.id },
    });

    // If user want to like
    if (liked == null && like == 1) {
      await likeComment.create({
        vote: true,
        userId: req.auth.userID,
        commentId: commentFind.id,
      });

      commentFind.likes += 1;
    }

    // If user want to unlike
    if (liked != null && like == 0) {
      await liked.destroy();
      commentFind.likes -= 1;
    }

    // Save Comment model to update likes count
    await commentFind.save();

    return res.status(200).json({ message: "super" });
  } catch (error) {
    console.error(error);
    // return Helper.errorResponse(req, res, error.message);
  }
};

// * Report a comment
exports.reportComment = (req, res, next) => {
  comment
    .findOne({ where: { id: req.params.id } })
    .then((comment) => {
      if (!comment) {
        return res.status(404).json({ message: "Comment not exists" });
      }

      commentReport.create({
        ...req.body,
        commentId: comment.id,
        userId: req.auth.userID,
      });

      return res.status(200).json({
        status: 200,
        message: "Comment successfully reported",
      });
    })
    .catch((error) => {
      res.status(500).json({ error: error.message });
    });
};

// * Reply a comment
exports.commentReply = (req, res) => {
  comment
    .findOne({ where: { id: req.params.id } })
    .then((comment) => {
      if (!comment) {
        return res.status(404).json({ message: "Comment not exists" });
      }

      commentReplies.create({
        replyBody: req.body.replyBody,
        userId: req.auth.userID,
        postId: comment.postId,
        commentId: comment.id,
      });

      return res.status(200).json({
        status: 200,
        message: "Comment reply successfully created",
      });
    })
    .catch((err) => {
      res.status(500).json({ error: err.name, message: err.message });
    });
};

// * Delete a comment reply
exports.deleteCommentReply = (req, res, next) => {
  // TODO : Find the comment reply to delete
  commentReplies
    .findByPk(req.params.id)
    .then((result) => {
      if (!result) {
        return res.status(404).json({ message: "Comment reply not exists" });
      }

      // ! Must be the owner to delete the comment reply
      if (result.userId == req.auth.userID) {
        commentReplies.destroy({ where: { id: req.params.id } });

        return res.status(200).send("Comment has been deleted!");
      } else {
        return res
          .status(403)
          .send("You can't delete another user comment reply");
      }
    })
    .catch((err) => {
      res.status(500).json({
        error: err.name,
        message: err.message,
      });
    });
};
