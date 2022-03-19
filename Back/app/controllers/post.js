const { user, post, community, like } = require("../models");
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
      post.findOne({
        where: {
          id: req.params.id,
        },
      })
    .then((result) => {
      // TODO : Check if post exist
      if (!result) {
        return res.status(404).json({ message: "Post not found" });
      }

      // TODO : gestion de l'image
      try {
        const file = req.file;
        if (file) {
          // console.log(file);
          req.body.icon = `/images/${req.file.filename}`;
          // console.log(req.file.filename);

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
            data: result,
          });
        })
        .catch((error) =>
          res.status(500).json({ error: error.name, message: error.message })
        );
    }).catch((err) => {
        const message = "Post could not be edited";
        res.status(500).json({ error: err.message, message });
    });
}