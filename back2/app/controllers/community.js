const {
  user,
  community,
  communityReport,
  community_moderator,
} = require("../models");

// Import the filesystem module
const fs = require("fs");

// * Create community
exports.create = async (req, res, next) => {
  // TODO : Check if request contain files uploaded
  const { file } = req;
  if (!file) {
    return res.status(422).json({ error: { msg: "Icon is required" } });
  }
  community
    .create({
      ...req.body,
      icon: `/images/${file.filename}`,
      userId: req.auth.userID,
    })
    .then((datas) => {
      res.status(201).send({
        status: 200,
        message: "Community created successfully",
        datas,
      });
    })
    .catch((error) => {
      res.status(500).json({ error: error.message });
    });
};

// * Read community
exports.readOne = async (req, res, next) => {
  try {
    const { id } = req.params;
    // console.log(id);
    let communityFind = await community.findOne(
      { where: { id } },
      {
        include: {
          all: true,
        },
      }
    );
    // console.log(communityFind);
    if (communityFind == null) throw new Error("Community not found");

    return res.status(201).json({
      status: 201,
      message: "Community found successfully",
      datas: communityFind,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// * Read all communities active
exports.readAllCommunity = async (req, res, next) => {
  community
    .findAll({
      where: {
        isActive: true,
      },
      raw: true,
    })
    .then((communitiesActive) => {
      if (communitiesActive.length <= 0) {
        return res.status(404).json({ message: "Communities not found" });
      }
      res.status(200).json({
        status: 200,
        datas: communitiesActive,
      });
    })
    .catch((error) => {
      res.status(500).json({ error: error.message });
    });
};

// * Update community
exports.updateCommunity = async (req, res, next) => {
  community
    .findByPk(req.params.id)
    .then((result) => {
      // console.log(result);
      // TODO : Check if community exist
      if (!result) {
        return res.status(404).json({ message: "Community not found" });
      }

      // TODO : Check if current user is the owner of the community
      if (result.userId != req.auth.userID) {
        return res
          .status(403)
          .json({ error: "You are not the creator of this community." });
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
            if (result.icon) {
              // je récupère l'image de mon utilisateur
              const filename = result.icon.split("/images/")[1];
              // je supprime l'image
              fs.unlinkSync(`images/${filename}`);
            }
          } catch (error) {
            return res.status(404).json({ message: "Image not found" });
          }
        }
      } catch (error) {
        res
          .status(401)
          .json({ error: { msg: "Couldn´t edit image community" } });
      }
      
      result
        .update(req.body, { where: { id: result.id } })
        .then(() => {
          res.status(200).json({
            message: "Community updated",
            status: 200,
            data: result,
          });
        })
        .catch((error) =>
          res.status(500).json({ error: error.name, message: error.message })
        );
    })
    .catch((error) => {
      const message = "Community could not be edited";
      res.status(500).json({ error: error.message, message });
    });
};

// * Delete Community
exports.deleteCommunity = async (req, res, next) => {
  community
    .findByPk(req.params.id)
    .then((result) => {
      // TODO : Check if community exist
      if (!result) {
        return res.status(404).json({ message: "Community not found" });
      }

      // TODO : Check if current user is the owner of the community
      if (result.userId != req.auth.userID) {
        return res.status(403).json({
          error: "You cannot delete a community that you did not create.",
        });
      }

      if (result.icon == null) {
        community
          .destroy({
            where: {
              id: req.params.id,
            },
          })
          .then(() =>
            res.status(200).json({
              message: "Community deleted successfully",
            })
          )
          .catch((error) => res.status(501).json(error));
      } else {
        const iconCommunity = result.icon.split("/images/")[1];
        fs.unlink(`images/${iconCommunity}`, () => {
          community
            .destroy({
              where: {
                id: req.params.id,
              },
            })
            .then(() =>
              res.status(200).json({
                message: "Community deleted successfully",
              })
            )
            .catch((error) => res.status(501).json(error));
        });
      }
    })
    .catch((error) => {
      const message = "Community could not be deleted";
      res.status(500).json({ error: error.message, message });
    });
};

// * Follow community
exports.followCommunity = (req, res, next) => {
  // Find the community to follow
  community
    .findByPk(req.params.id)
    .then((result) => {
      if (!result) {
        return res.status(404).json({ message: "Community not found" });
      }

      user
        .findOne({ where: { id: req.auth.userID } })
        .then((resultUser) => {
          result.addUser(resultUser);

          return res.status(200).json({
            status: 200,
            message:
              "Community" + " " + result.title + " " + "successfully follow",
          });
        })
        .catch((err) => {
          return res.status(404).json({ err, message: "Follower not found" });
        });
    })
    .catch((error) => {
      res.status(500).json({ error: error.message });
    });
};

// * unfollow
exports.unfollowCommunity = (req, res, next) => {
  // Find the community to unfollow
  community
    .findByPk(req.params.id)
    .then((result) => {
      if (!result) {
        return res.status(404).json({ message: "Community not found" });
      }

      user
        .findOne({ where: { id: req.auth.userID } })
        .then((resultUser) => {
          result.removeUser(resultUser);

          return res.status(200).json({
            status: 200,
            message:
              "Community" + " " + result.title + " " + "successfully unfollow",
          });
        })
        .catch((err) => {
          return res.status(404).json({ err, message: "Follower not found" });
        });
    })
    .catch((error) => {
      res.status(500).json({ error: error.message });
    });
};

// * Report community
exports.reportCommunity = (req, res, next) => {
  // Find the community to report
  community
    .findByPk(req.params.id)
    .then((result) => {
      if (!result) {
        return res.status(404).json({ message: "Community not found" });
      }
      communityReport.create({
        ...req.body,
        communityId: result.id,
        userId: req.auth.userID,
      });

      return res.status(200).json({
        status: 200,
        message: "Community successfully reported",
      });
    })
    .catch((error) => {
      res.status(500).json({ error: error.message });
    });
};

//* Add Moderator
// ? // Seul le propriétaire de la communauté peut accorder des autorisations de modérateur
exports.addModerator = (req, res, next) => {
  // Find the community to add moderator
  community
    .findByPk(req.params.id)
    .then((result) => {
      if (!result) {
        return res.status(404).json({ message: "Community not found" });
      }

      // TODO : Check if the current user is the owner of this community
      if (result.userId != req.auth.userID)
        throw new Error("You do not have permission to manage community roles");

      // TODO : Find a user
      user
        .findOne({ where: { id: req.body.id } })
        .then((resultUser) => {
          // result.addUser(resultUser);

          // TODO : Add this user to the moderator list
          community_moderator.create({
            userId: resultUser.id,
            communityId: result.id,
            isAdmin: true,
          });

          return res.status(200).json({
            status: 200,
            message:
              "You have been appointed moderator of this community :" +
              " " +
              result.title,
          });
        })
        .catch((err) => {
          return res.status(404).json({ err, message: "Moderator not found" });
        });
    })
    .catch((error) => {
      res.status(500).json({ error: error.message });
    });
};

//* Delete Moderator
exports.deleteModerator = (req, res, next) => {
  // Find the community to delete moderator
  community
    .findByPk(req.params.id)
    .then((result) => {
      if (!result) {
        return res.status(404).json({ message: "Community not found" });
      }

      // TODO : Check if the current user is the owner of this community
      if (result.userId != req.auth.userID)
        throw new Error(
          "You do not have permission to manage community roles."
        );

      // TODO : Find a user
      user
        .findOne({ where: { id: req.body.id } })
        .then((resultUser) => {
          result.addUser(resultUser);

          // TODO : Add this user to the moderator list
          community_moderator.destroy({
            where: { userId: resultUser.id, communityId: result.id },
          });
          return res.status(200).json({
            status: 200,
            message:
              "You have been desappointed moderator of this community :" +
              " " +
              result.title,
          });
        })
        .catch((err) => {
          return res.status(404).json({ err, message: "Moderator not found" });
        });
    })
    .catch((error) => {
      res.status(500).json({ error: error.message });
    });
};
