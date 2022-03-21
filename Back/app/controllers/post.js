const { user, post, community, like, likePost } = require("../models");
// Import the filesystem module
const fs = require("fs");

// * Create posts
exports.createPost = (req, res, next) => {
  // Find the community to create post
  community
    .findByPk(req.body.communityId)
    .then((result) => {
      if (!result) {
        return res.status(404).json({ message: "Community not found" });
        }
        
        // if (!req.files) {
        //                   return res
        //                     .status(422)
        //                     .json({ error: { msg: "Image is required" } });

        // }
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
                res
                  .status(500)
                  .json({ error: error.name, message: error.message })
              );
        }
    })
    .catch((error) => {
      res.status(500).json({ error: error.message });
    });
};

// Read one post by a specific ID
exports.getPostById = (req, res, next) => {
  post
    .findOne({
      where: {
        id: req.params.id,
      },
      include: [
        {
          model: user,
          as: "creator",
          attributes: ["id", "username", "imageUrl"],
        },
        {
          model: community,
          as: "category",
          attributes: ["id", "title", "about"],
        },
      ],
    })
    .then((result) => {
      res.status(200).json({
        status: 200,
        message: "Post find with success",
        result,
      });
    })
    .catch((err) => {
      res.status(401).json({ err, error: { msg: "Couldn´t find post" } });
    });
};

// * Read all posts
exports.getAllPosts = (req, res, next) => {
  post
    .findAll({
      include: [
        {
          model: user,
          as: "creator",
          attributes: ["id", "username", "imageUrl"],
        },
        {
          model: community,
          as: "category",
          attributes: ["id", "title", "about"],
        },
      ],
      order: [["createdAt", "DESC"]],
      limit: 6,
    })
    .then(async (result) => {
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
      res.status(401).json({ err, error: { msg: "Couldn´t find post" } });
    });
};

// * Update a post
exports.updatePost = (req, res, next) => {
  post
    .findOne({ where: { id: req.params.id } })
    .then((result) => {
      // TODO : Check if post exist
      if (!result) {
        return res.status(404).json({ message: "Post not found" });
      }

      // TODO : gestion de l'image
      try {
        const file = req.file;
        if (file) {
          req.body.imageUrl = `/images/${req.file.filename}`;
          // TODO : Delete the old image
          try {
            // Si je trouve une image à mon utilisateur
            if (result.imageUrl) {
              // je récupère l'image de mon utilisateur
              const filename = result.imageUrl.split("/images/")[1];
              // je supprime l'image
              fs.unlinkSync(`images/${filename}`);
            }
          } catch (error) {
            return res.status(404).json({ message: "Image not found" });
          }
        }
      } catch (error) {
        res.status(401).json({ error: { msg: "Couldn´t edit image Post" } });
      }

      // TODO : gestion du text
      result
        .update(req.body, { where: { id: result.id } })
        .then(() => {
          res.status(200).json({
            message: "Post updated",
            status: 200,
            datas: result,
          });
        })
        .catch((err) =>
          res.status(500).json({ error: err.name, message: err.message })
        );
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
exports.likePost = (req, res, next) => {
  let vote = req.body.vote;
  let transaction;
  // TODO : Find the post to be like
  post
    .findOne({ where: { id: req.params.id } })
    .then((post) => {
      if (!post) {
        return res.status(404).json({ message: "Post not exists" });
      }
      // console.log(post)
      // TODO : Check if the current user is in the list of liked posts
      likePost
        .findOne({
          where: { userId: req.auth.userID, postId: post.id },
        })
        .then((result) => {
          // TODO : If no like and If user want to like
          if (!result && vote == true) {
            likePost.create({
              vote: true,
              postId: post.id,
              userId: req.auth.userID,
            });
            // ! Must be add to the post
            // post.likes += 1;
            post.increment("likes", { by: 1, transaction });

            return res.status(200).json({ message: "You liked this post" });
          }

          // TODO : If user want to unlike
          if (result && vote == false) {
            likePost.destroy({
              where: { userId: req.auth.userID, postId: post.id },
            });

            // ! Must be delete to the post
            // post.likes -= 1;
            post.decrement("likes", { by: 1, transaction });

            return res.json({
              message: "You removed your like from the post",
            });
          }

          // ! Save the post to update likes count
          post.save({ where: { id: req.params.id } });
        })
        .catch((err) => {
          res.status(500).json({ error: err.name, message: err.message });
        });
    })
    .catch((err) => {
      res.status(500).json({ err, error: { msg: "Couldn´t like post" } });
    });
};
