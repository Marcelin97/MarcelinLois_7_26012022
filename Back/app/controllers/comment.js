const {
  user,
  post,
  comment,
  likeComment,
  commentReport
} = require("../models");

// Import the filesystem module
const fs = require("fs");

// * Create posts
exports.createComment = (req, res, next) => {
  let transaction;
  post
    .findOne({ where: { id: req.body.postId } })
    .then((post) => {
      if (!post) {
        return res.status(404).json({ message: "Publication introuvable" });
      }

      post.createComment({
        content: req.body.content,
        userId: req.auth.userID,
        PostId: post.id,
      });

      // ! Must be add to the post
      post.increment("commentsCount", { by: 1, transaction });

      // ! Save the post to update comments count
      post.save({ where: { id: req.body.postId } });

      return res.status(200).json({
        status: 200,
        message: "Comment created",
      });
    })
    .catch((err) => {
      return res.status(500).send({
        message: "Failed to write a comment",
        err,
      });
    });
};

// * Update a comment
exports.updateComment = (req, res, next) => {
  // Find the comment to update
  comment
    .findByPk(req.params.id)
    .then((result) => {
      if (!result) {
        return res.status(404).json({ message: "Comment not exists" });
      }

      // ! Must be the owner of the comment to edit
      if (result.userId != req.auth.userID) {
        return res.status(401).send({
          message: "Can't edit another users post",
        });
      }

      result
        .update(req.body, { where: { id: result.id } })
        .then(() => {
          res.status(200).send({
            status: 200,
            message: "Comment Edited Successfully",
          });
        })
        .catch((err) =>
          res.status(500).json({ error: err.name, message: err.message })
        );
    })
    .catch((err) => {
      res.status(401).send({
        message: "Something went wrong",
        err,
      });
    });
};

// * Delete a comment
exports.deleteComment = (req, res, next) => {
  let transaction;
  comment
    .findByPk(req.params.id)
    .then((result) => {
      if (!result) {
        return res.status(404).json({ message: "Comment not exists" });
      }

      // ! Must be the owner
      if (result.userId == req.auth.userID) {
        comment.destroy({
          where: {
            id: req.params.id,
          },
        });

        post
          .findOne({ where: { id: result.postId } })
          .then((post) => {
            // ! Must be delete to the post count
            post.decrement("commentsCount", { by: 1, transaction });
            // ! Save the post to update comments count
            post.save();
          })
          .catch((err) => {
            console.log(err);
          });

        return res.status(200).send("Comment has been deleted!");
      } else {
        return res.status(500).send("You can't delete another user comment");
      }
    })
    .catch((err) => {
      res.status(500).json({ error: err.name, message: err.message });
    });
};

// *Like a comment
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
        return res.status(404).json({ message: "Post not exists" });
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

// * Get one comment
exports.readCommentById = (req, res, next) => {
  comment
    .findOne({
      where: {
        id: req.params.id,
      },
      include: [
        {
          model: user,
          as: "author",
          attributes: ["id", "username", "imageUrl"],
        },
        {
          model: post,
          as: "post",
          attributes: ["id", "title", "content", "communityId", "creatorId"],
        },
      ],
    })
    .then((result) => {
      // TODO : Check if comment exist
      if (!result) {
        return res.status(404).json({ message: "Comment not found" });
      }
      res.status(200).json({
        status: 200,
        message: "Comment find with success",
        result,
      });
    })
    .catch((err) => {
      res.status(401).json({ err, error: { msg: "Couldn´t find comment" } });
    });
};

// * Get all comments
// comments.findAndCountAll({
//   offset,
//   limit,
//   order: [["createdAt", "DESC"]],
// });

// * Reply a comment

// * Delete a reply comment
