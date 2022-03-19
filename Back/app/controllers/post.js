const { user, post, community, like } = require("../models");

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
          imageUrl: `/images/${file.filename}`,
          communityId: result.id,
          creatorId: req.auth.userID,
        })
        .then(() => {
          res.status(201).json({
            message: " Post create successfully",
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
          as: "posts",
          attributes: ["id", "title", "about"],
        },
        //   limit the likes based on the logged in user
        //   {
        //     model: like,
        //   },
      ],
    })
    .then((result) => {
      res.status(200).json({ result });
    })
    .catch((err) => {
      console.log(err.name, err.message);
    });

};

