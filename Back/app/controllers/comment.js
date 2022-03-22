const {
  user,
  post,
  community,
  postReport,
  likePost,
  savePost,
} = require("../models");

// Import the filesystem module
const fs = require("fs");

// * Create posts
exports.createComment = (req, res, next) => {
    Posts.findOne({ where: { id: req.body.postId } })
    .then((post) => {
        if (!post) {
          return res.status(404).json({ message: "Publication introuvable" });
        }

        post.createComment({})
    }).catch((err) => {
        
    });

    try {

        comments.create()
            .then((comment) => {
        models.Comments.findOne({
          where: {
            id: comment.id,
          },
          include: [
            {
              model: models.User,
              as: "author",
              attributes: ["username", "gravatar"],
            },
            {
              model: models.CommentReplies,
              as: "commentReplies",
              include: [
                {
                  model: models.User,
                  as: "author",
                  attributes: ["username", "gravatar", "bio"],
                },
              ],
            },
          ],
        }).then(async (newComment) => {
          const body = req.body.comment_body;
          if (usernames.some((user) => body.includes(user))) {
            const regex = /^@/i;
            const sentence = body.split(" ");
            for (let i = 0; i < sentence.length; i++) {
              const word = sentence[i];
              let username;
              if (regex.test(word)) {
                console.log("this test passed bro", word);
                username = word;
                const newUsername = username.slice(1);
                if (usernames.includes(newUsername)) {
                  NotificationServ.userMention(
                    currentUser,
                    newComment.postId,
                    newUsername,
                    newComment.userId
                  );
                  console.log(newUsername + " got mentioned");
                }
              }
            }
            console.log("this got called");

            pusherConfig.trigger("post-comments", "user-mention", {
              comment: newComment,
            });
          } else {
            console.log("no luck finding user");
          }
          console.log("dsdsdssdsd", currentUser, newComment.userId); // con

          NotificationServ.newCommentNotification(
            currentUser,
            newComment.postId,
            newComment.userId
          );

          pusherConfig.trigger("post-comments", "new-comment", {
            comment: newComment,
          });
          return res.status(200).send({
            message: "comment created",
            comment: newComment,
          });
        });
      });
    } catch (error) {
      console.log("There was an error", error);
      return res.status(500).send({
        message: "Failed to write a comment",
        error,
      });
    }
};

// * Update a comment
// editComment: async (req: any, res: Response) => {
//     let transaction;
//     console.log("testtttt", req.body);
//     const currentUser = isUser(req);
//     if (req.body.comment_body && req.body.gifUrl) {
//       return res.status(401).send({
//         message: "Can't edit both",
//       });
//     }
//     console.log("dfdfdfd", req.params.userId, currentUser);
//     if (req.params.userId != currentUser) {
//       return res.status(401).send({
//         message: "Can't edit another users post",
//       });
//     } else {
//       try {
//         transaction = await models.sequelize.transaction();
//         return models.Comments.update(
//           {
//             comment_body: filterbadWords(req.body.commentData)
//               ? filterbadWords(req.body.commentData)
//               : "",
//             gifUrl: req.body.gifUrl ? req.body.gifUrl : "",
//           },
//           {
//             where: {
//               id: req.params.commentId,
//             },
//           },
//           { transaction }
//         ).then(async (comment) => {
//           console.log("anothfdf", comment);
//           await transaction.commit();
//           return res.status(200).send({
//             message: "Comment Edited Successfully",
//           });
//         });
//       } catch (err) {
//         console.log("something went wrong", err);
//         res.status(401).send({
//           message: "Something went wrong",
//         });
//       }
//     }
//   },

// * Delete a comment
// deleteComment: async (req: any, res: Response) => {
//     const currentUser = isUser(req);
//     if (req.params.userId == currentUser) {
//       try {
//         await models.Comments.destroy({
//           where: {
//             id: req.params.id,
//           },
//         });
//         return res.status(200).send("Comment has been deleted!");
//       } catch (error) {
//         console.log("There was an error", error);
//         res.status(401).send("Failed to delete comment");
//       }
//     } else {
//       return res.status(500).send("You can't delete another user comment");
//     }
//   },

// * Reply a comment
// replyComment: async (req: any, res: Response) => {
//     const currentUser = isUser(req);
//     console.log("dsfsfsf checking for reqboyd", req.body);
//     try {
//       await models.CommentReplies.create({
//         postId: req.params.postId,
//         commentId: req.params.commentId,
//         userId: currentUser,
//         replyBody: req.body.replyBody,
//       }).then((reply) => {
//         models.CommentReplies.findOne({
//           where: {
//             id: reply.id,
//           },
//           include: [
//             {
//               model: models.User,
//               as: "author",
//               attributes: ["username", "gravatar"],
//             },
//           ],
//         }).then((newReply) => {
//           return res.status(200).send({
//             reply: newReply,
//             message: "Reply added successfully",
//           });
//         });
//       });
//     } catch (err) {
//       res.status(401).send("Failed to add reply");
//     }
//   },

// * Delete a reply
// deleteReply: async (req: any, res: Response) => {
//     try {
//       await models.CommentReplies.destroy({
//         where: {
//           id: req.params.id,
//           postId: req.params.postId,
//         },
//       });
//       return res.status(200).send({
//         message: "Reply has been deleted",
//       });
//     } catch (err) {
//       console.log(err);
//       res.status(401).send("Failed to delete reply");
//     }
//   },