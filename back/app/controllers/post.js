const {
  user,
  post,
  community,
  postReport,
  likePost,
  savePost,
  follower,
} = require("../models");

// * Import the fileSystem module
const fs = require("fs");

// * Create posts
exports.createPost = (req, res, next) => {
  // TODO: Find the community to create post
  community
    .findByPk(req.body.communityId)
    .then((result) => {
      if (!result) {
        return res.status(404).json({ message: "Community not found" });
      }

      // TODO : Check if image
      if (req.file) {
        post
          .create({
            ...req.body,
            imageUrl: `/images/${req.file.filename}`,
            communityId: result.id,
            creatorId: req.auth.userID,
          })

          .then((datas) => {
            res.status(201).json({
              status: 201,
              message: " Post create successfully",
              datas,
            });
          })
          .catch((error) =>
            res.status(500).json({ error: error.name, message: error.message })
          );
      } else {
        post
          .create({
            ...req.body,
            communityId: result.id,
            creatorId: req.auth.userID,
          })

          .then((datas) => {
            res.status(201).json({
              status: 201,
              message: " Post create successfully",
              datas,
            });
          })
          .catch((error) =>
            res.status(500).json({ error: error.name, message: error.message })
          );
      }
    })
    .catch((error) => {
      res.status(500).json({ error: error.message });
    });
};

// * Read one post by a specific ID
exports.readPostById = (req, res, next) => {
  post
    .findOne({
      where: {
        id: req.params.id,
      },
      include: {
        all: true,
      },
    })
    .then((result) => {
      // TODO : Check if post exist
      if (!result) {
        return res.status(404).json({ message: "Post not found" });
      }

      res.status(200).json({
        status: 200,
        message: "Post find with success",
        result,
      });
    })
    .catch((err) => {
      res.status(500).json({ err, error: { msg: "Couldn´t find post" } });
    });
};

// * Read all post by community
exports.readAllPostByCommunity = (req, res, next) => {
  community
    .findOne({
      where: {
        id: req.params.id,
      },
      include: [
        {
          model: post,
          as: "posts",
          attributes: [
            "id",
            "title",
            "imageUrl",
            "content",
            "communityId",
            "creatorId",
          ],
        },
      ],
      order: [["createdAt", "DESC"]],
      limit: 6,
    })
    .then((result) => {
      // TODO : Check if i find post by community
      if (!result) {
        return res
          .status(404)
          .json({ message: "Any post found in this community" });
      }

      res.status(200).json({
        status: 200,
        message: "Posts find with success in this community",
        result,
      });
    })
    .catch((err) => {
      res.status(500).json({ err, error: { msg: "Couldn´t find post" } });
    });
};

// * Read all posts by community follow
exports.readAllPostByCommunityFollow = (req, res, next) => {
  follower
    .findAll({
      where: { userId: req.auth.userID },
      include: [
        {
          model: community,
          required: true,
          include: {
            model: post,
            required: true,
            as: "posts",
          },
        },
      ],
      order: [["createdAt", "DESC"]],
    })
    .then((result) => {
      if (result.length <= 0) {
        return res
          .status(404)
          .json({ message: "Post by community follow is empty" });
      }
      if (result) {
        return res.status(200).json({
          status: 200,
          message: "Followed community posts are found",
          result,
        });
      }
    })
    .catch((err) => {
      res.status(500).json({
        err,
        error: { msg: "Couldn´t find posts by followed community" },
      });
    });
};

// * Read all posts with more likes
exports.manyLikes = (req, res, next) => {
  likePost
    .findAll({
      where: {
        vote: [1],
      },
      include: {
        all: true,
      },
      limit: 6,
    })
    .then((result) => {
      // TODO : Check if i find post by community
      if (result.length <= 0) {
        return res
          .status(404)
          .json({ message: "Any post found with lot of likes" });
      }
      res.status(200).json({
        status: 200,
        message: "Posts find with lot of likes",
        result,
      });
    })
    .catch((err) => {
      res
        .status(500)
        .json({ err, error: { msg: "Couldn´t find post with lot of likes" } });
    });
};

// * Read all posts
exports.readAllPosts = async (req, res, next) => {
  post
    .findAll(
      {
        order: [["createdAt", "DESC"]],
        limit: 6,
        raw: true,
      },
      {
        include: {
          all: true,
        },
      }
    )
    .then(async (result) => {
      // TODO : Check if post exist
      if (!result) {
        return res.status(404).json({ message: "Posts not found" });
      }

      const count = await post.count();
      // console.log(count);

      res.status(200).json({
        status: 200,
        message: "Posts find with success",
        count,
        result,
      });
    })
    .catch((err) => {
      res.status(500).json({ err, error: { msg: "Couldn´t find post" } });
    });
};

// * Update a post
exports.updatePost = (req, res, next) => {
  const { title, content } = req.body;
  post
    .findOne({ where: { id: req.params.id } })
    .then(async (result) => {
      // TODO : Check if post exist
      if (!result) {
        return res.status(404).json({ message: "Post not found" });
      }

      // TODO : Find logged in user
      const currentUser = await user.findOne({
        where: { id: req.auth.userID },
      });
      if (currentUser == null) throw new Error("Logged in user not found");

      //! TODO : Check if current user is the owner of the post
      isOwner = result.creatorId == currentUser.id;

      //! TODO : Check if the current user is admin
      isAdmin = currentUser.isAdmin;

      // ! Access denied
      if (!isAdmin && !isOwner) {
        return res.status(403).json({
          error: "You do not have the necessary rights for this action.",
        });
      }

      result.title = title || result.title;
      result.content = content || result.content;

      // TODO : Content management
      if (content) {
        result.content = content;
      }

      // TODO : Title management
      if (title) {
        result.title = title;
      }

      // TODO : gestion de l'image
      try {
        const file = req.file;
        if (file) {
          // TODO : Delete the old image
          try {
            // Si je trouve une image à mon utilisateur
            if (result.imageUrl) {
              // je récupère l'image de mon utilisateur
              const filename = result.imageUrl.split("/images/")[1];
              // je supprime l'image
              fs.unlinkSync(`images/${filename}`);
            }
            result.imageUrl = `/images/${req.file.filename}`;
          } catch (error) {
            return res.status(404).json({ message: "Image not found" });
          }
        }
      } catch (error) {
        res.status(401).json({ error: { msg: "Couldn´t edit image Post" } });
      }

      await result.save();
      res.status(200).json({
        message: "Post updated",
        status: 200,
        datas: result,
      });
    })
    .catch((err) => {
      const message = "Post could not be edited";
      res.status(500).json({ error: err.message, message });
    });
};

// * Delete post
exports.deletePost = (req, res, next) => {
  // TODO : Must be admin or moderator to delete a post
  post
    .findOne({ where: { id: req.params.id } })
    .then((result) => {
      if (!result) {
        return res.status(404).json({ message: "Post not exists" });
      }

      // ! Must be the owner
      if (req.auth.userID !== result.creatorId) {
        return res.status(403).json({ message: "Insufficient permissions" });
      }

      // TODO : Delete file
      if (result.imageUrl == null) {
        post
          .destroy({ where: { id: req.params.id } })
          .then(() =>
            res.status(200).json({
              status: 200,
              message: "Post has been deleted!",
            })
          )
          .catch((err) => res.status(501).json(err));
      } else {
        const imagePost = result.imageUrl.split("/images/")[1];
        fs.unlink(`images/${imagePost}`, () => {
          post
            .destroy({ where: { id: req.params.id } })
            .then(() =>
              res.status(200).json({
                status: 200,
                message: "Post has been deleted!",
              })
            )
            .catch((err) => res.status(500).json(err));
        });
      }
    })
    .catch((err) => {
      res
        .status(500)
        .json({ err, error: { msg: "Couldn´t delete this post" } });
    });
};

// * Like post
// ? gestion neutre si pas like et pas dislike
exports.likePost = async (req, res, next) => {
  let like = req.body.vote;

  // TODO : Find the post to be like
  post
    .findOne({ where: { id: req.params.id } })
    .then(async (result) => {
      if (!result) {
        return res.status(404).json({ message: "Post not exists" });
      }
      // TODO : Search if current user already like of dislike this post
      const likePostFind = await likePost.findOne({
        where: { userId: req.auth.userID, postId: result.id },
      });

      function changeLike(userId, postId, state) {
        switch (state) {
          case -1:
            if (likePostFind) {
              // Edit row to set vote to -1
              // UPDATE
              likePost
                .update(req.body, {
                  where: {
                    userId,
                    postId,
                  },
                })
                .then((datas) => {
                  return res.status(201).json({
                    status: 201,
                    message: "You disliked this post",
                    data: datas,
                  });
                })
                .catch(next);
            } else {
              // Create row and set vote to -1
              // INSERT
              likePost
                .create({
                  vote: -1,
                  userId,
                  postId,
                })
                .then((datas) => {
                  return res.status(201).json({
                    status: 201,
                    message: "You disliked this post",
                    data: datas,
                  });
                })
                .catch(next);
            }
            break;

          case 0:
            likePost.destroy({ where: { userId, postId } });
            return res
              .status(200)
              .json({ message: "you removed your like or your dislike" });

          case 1:
            if (likePostFind) {
              // Edit row to set vote to 1
              // UPDATE
              likePost
                .update(req.body, {
                  where: {
                    userId,
                    postId,
                  },
                })
                .then((datas) => {
                  return res.status(201).json({
                    status: 201,
                    message: "You loved this post",
                    data: datas,
                  });
                })
                .catch(next);
            } else {
              // Create row and set vote to 1
              // INSERT
              likePost
                .create({
                  vote: 1,
                  userId,
                  postId,
                })
                .then((datas) => {
                  return res.status(201).json({
                    status: 201,
                    message: "You loved this post",
                    data: datas,
                  });
                })
                .catch(next);
            }
            break;
        }
      }

      // changeLike(req.auth.userID, result.id, like);

      switch (like) {
        // If it is a like
        case 1:
          changeLike(req.auth.userID, result.id, 1);
          // res.status(200).json({ message: "You loved this post" });
          break;

        // if it's nolike/nodislike
        case 0:
          changeLike(req.auth.userID, result.id, 0);
          // res.status(200).json({ message: "you removed your like or your dislike" });
          break;

        // if it's a dislike
        case -1:
          changeLike(req.auth.userID, result.id, -1);
          // res.status(200).json({ message: "You disliked this post" });
          break;
        default:
          break;
      }
    })
    .catch((err) => {
      res.status(500).json({ err, error: { msg: "Couldn´t like post" } });
    });
};

// * Report post
exports.reportPost = (req, res) => {
  // TODO : Find the community to report
  post
    .findOne({ where: { id: req.params.id } })
    .then((post) => {
      if (!post) {
        return res.status(404).json({ message: "Post not exists" });
      }

      postReport
        .create({
          ...req.body,
          postId: post.id,
          userId: req.auth.userID,
        })
        .then(() => {
          res.status(200).json({
            status: 200,
            message: "Post successfully reported",
            datas,
          });
        })
        .catch((error) =>
          res.status(500).json({ error: error.name, message: error.message })
        );
    })
    .catch((error) => {
      res.status(500).json({ error: error.message });
    });
};

// * Save post
exports.saveUnsavePost = (req, res) => {
  let save = req.body.save;
  // TODO : Find the post to be save
  post
    .findOne({ where: { id: req.params.id } })
    .then((post) => {
      if (!post) {
        return res.status(404).json({ message: "Post not exists" });
      }
      // console.log(post)
      // TODO : Check if the current user is in the list of saved posts
      savePost
        .findOne({
          where: { userId: req.auth.userID, postId: post.id },
        })
        .then((result) => {
          // TODO : If user don't already save the post
          if (!result && save == true) {
            savePost.create({
              save: true,
              postId: post.id,
              userId: req.auth.userID,
            });

            return res.status(200).json({ message: "You saved this post" });
          }

          // TODO : If user want to unsave
          if (result && save == false) {
            savePost.destroy({
              where: { userId: req.auth.userID, postId: post.id },
            });

            return res.json({
              message: "The post is no longer saved",
            });
          }
        })
        .catch((err) => {
          res.status(500).json({ error: err.name, message: err.message });
        });
    })
    .catch((err) => {
      res.status(500).json({ err, error: { msg: "Couldn´t save this post" } });
    });
};

exports.readLikeByPost = (req, res) => {
  post
    .findOne({
      where: {
        id: req.params.id,
      },
      include: {
        all: true,
      },
    })
    .then((post) => {
      // TODO : Check if post exist
      if (!post) {
        return res.status(404).json({ message: "Post not found" });
      }

      likePost
        .findAll({ where: { postId: post.id } })
        .then((result) => {
          if (result.length <= 0) {
            return res
              .status(404)
              .json({ message: "Like or dislike not exists" });
          }

          // for (let key of result) {
          //   console.log(key.vote);
          // }

          res.status(200).json({
            status: 200,
            message: "Vote successfully founded",
            result,
          });
        })
        .catch((err) => {
          res.status(500).json({ error: err.name, message: err.message });
        });
    })
    .catch((err) => {
      res.status(500).json({ err, error: { msg: "Couldn´t find post" } });
    });
};
