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
    .findOne({ where: { id: req.body.postId } })
    .then((post) => {
      if (!post) {
        return res.status(404).json({ message: "Post not exists" });
      }

      post.createComment({
        content: req.body.content,
        userId: req.auth.userID,
        PostId: post.id,
      });

      // ! Must be added to the post
      post.increment("commentsCount", { by: 1, transaction });

      // ! Save the post to update comments count
      post.save({ where: { id: req.body.postId } });

      return res.status(200).json({
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
};

// * Update a comment
exports.updateComment = (req, res, next) => {
  // TODO : Find the comment to update
  comment
    .findByPk(req.params.id)
    .then((result) => {
      if (!result) {
        return res.status(404).json({ message: "Comment not exists" });
      }

      // ! Must be the owner to be able to edit the comment
      if (result.userId != req.auth.userID) {
        return res.status(401).send({
          message: "Can't edit another users post",
        });
      }

      result
        .update(req.body, { where: { id: result.id } })
        .then((datas) => {
          res.status(200).send({
            status: 200,
            message: "Comment Edited Successfully",
            datas,
          });
        })
        .catch((err) =>
          res.status(500).json({ error: err.name, message: err.message })
        );
    })
    .catch((err) => {
      res.status(500).json({
        message: "Something went wrong",
        err,
      });
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
exports.likeDislikeComment = (req, res, next) => {
  let vote = req.body.vote;
  let transaction;
  // TODO : Find the post to be like
  comment
    .findOne({ where: { id: req.params.id } })
    .then((comment) => {
      if (!comment) {
        return res.status(404).json({ message: "Post not exists" });
      }
      // console.log(post)
      // TODO : Check if the current user is in the list of liked posts
      likeComment
        .findOne({
          where: { userId: req.auth.userID, commentId: comment.id },
        })
        .then((result) => {
          // TODO : If no like and If user want to like
          if (!result && vote == true) {
            likeComment.create({
              vote: true,
              commentId: comment.id,
              userId: req.auth.userID,
            });
            // ! Must be add to the post
            comment.increment("likes", { by: 1, transaction });

            return res.status(200).json({ message: "You liked this comment" });
          }

          // TODO : If user want to unlike
          if (result && vote == false) {
            likeComment.destroy({
              where: { userId: req.auth.userID, commentId: comment.id },
            });

            // ! Must be delete to the post
            comment.decrement("likes", { by: 1, transaction });

            return res.json({
              message: "You removed your like from the comment",
            });
          }

          // ! Save the post to update likes count
          comment.save({ where: { id: req.params.id } });
        })
        .catch((err) => {
          res.status(500).json({ error: err.name, message: err.message });
        });
    })
    .catch((err) => {
      res.status(500).json({ err, error: { msg: "Couldn´t like post" } });
    });
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
