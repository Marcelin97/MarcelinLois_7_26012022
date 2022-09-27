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
    if (communityFind == null) {
      return res.status(404).json({ message: "Community not found" });
    }

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
      order: [["createdAt", "DESC"]],
      raw: true,
    })
    .then((communitiesActive) => {
      if (communitiesActive.length <= 0) {
        return res.status(404).json({ message: "Communities active not found" });
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
    .then(async (result) => {
      // console.log(result);
      // TODO : Check if community exist
      if (!result) {
        return res.status(404).json({ message: "Community not found" });
      }

      // TODO : Find logged in user
      const currentUser = await user.findOne({
        where: { id: req.auth.userID },
      });
      if (currentUser == null) throw new Error("Logged in user not found");

      // TODO : Check if the current user is the owner of this community
      isOwner = result.userId == currentUser.id;

      // TODO : Check if the current user is admin
      isAdmin = currentUser.isAdmin;

      // ! Access denied
      if (!isAdmin && !isOwner) {
        return res
          .status(403)
          .json({
            error: "You do not have the necessary rights for this action.",
          });
      }

      // TODO : Image management
      try {
        const file = req.file;
        if (file) {
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
            // console.log(error);
            return res.status(404).json({ message: "Image not found" });
          }
        }
      } catch (error) {
        res.status(401).json({ error: { msg: "Unable to edit image" } });
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
    .then(async (result) => {
      // TODO : Check if community exist
      if (!result) {
        return res.status(404).json({ message: "Community not found" });
      }

      // TODO : Find logged in user
      const currentUser = await user.findOne({
        where: { id: req.auth.userID },
      });
      if (currentUser == null) throw new Error("Logged in user not found");

      // TODO : Check if the current user is the owner of this community
      isOwner = result.userId == currentUser.id;

      // TODO : Check if the current user is admin
      isAdmin = currentUser.isAdmin;

      // ! Access denied
      if (!isAdmin && !isOwner) {
        return res
          .status(403)
          .json({
            error: "You do not have the necessary rights for this action.",
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
// ? Seul le propriétaire de la communauté ou l'admin peut accorder des autorisations de modérateur
exports.addModerator = (req, res, next) => {
  // Find the community to add moderator
  community
    .findByPk(req.params.id)
    .then(async (result) => {
      if (!result) {
        return res.status(404).json({ message: "Community not found" });
      }

      // TODO : Find logged in user
      const currentUser = await user.findOne({
        where: { id: req.auth.userID },
      });
      if (currentUser == null) throw new Error("Logged in user not found");

      // TODO : Check if the current user is the owner of this community
      isOwner = result.userId == currentUser.id;

      // TODO : Check if the current user is admin
      isAdmin = currentUser.isAdmin;

      // ! Access denied
      if (!isAdmin && !isOwner)
        throw new Error("You do not have permission to access this content.");

      // TODO : Find a user
      user
        .findOne({ where: { id: req.body.id } })
        .then(async (resultUser) => {
          if (!resultUser) {
            return res.status(404).json({ message: "Moderator not found" });
          }

          // Search for moderator if exist
          let moderator = await community_moderator.findOne({
            where: { userId: resultUser.id, communityId: result.id },
          });
          if (moderator == null) {
            // TODO : If not already moderator, add it
            community_moderator.create({
              userId: resultUser.id,
              communityId: result.id,
              isModerator: 1 ? 1 : 0
            });
          } else {
            // If already moderator, update fields
            moderator.isModerator = 1 ? 1 : 0;
            await moderator.save();
          }
          return res.status(200).json({
            status: 200,
            message:
              resultUser.username + " " +"is now moderator of this community :" +
              " " +
              result.title,
          });
        })
        .catch((err) => {
          return res.status(404).json({ error : err.message, message: "Moderator not found" });
        });
    })
    .catch((error) => {
      res.status(500).json({ error: error.message });
    });
};

// Delete community moderator
exports.deleteModerator = (req, res, next) => {
  // TODO : Find the community to delete moderator
  community
    .findByPk(req.params.id)
    .then(async (result) => {
      if (!result) {
        return res.status(404).json({ message: "Community not found" });
      }

      // TODO : Find logged in user
      const currentUser = await user.findOne({
        where: { id: req.auth.userID },
      });
      if (currentUser == null) throw new Error("Logged in user not found");

      // TODO : Check if the current user is the owner of this community
      isOwner = result.userId == currentUser.id;

      // TODO : Check if the current user is admin
      isAdmin = currentUser.isAdmin;

      // ! Access denied
      if (!isAdmin && !isOwner)
        throw new Error("You do not have permission to access this content.");

      // TODO : Find a user in moderators list
      community_moderator
        .findAll({ where: { communityId: result.id } })
        .then((resultUser) => {
          // console.log("moderator list", resultUser);
          if(resultUser != null)
          // TODO : Delete this user to the moderator list
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

exports.readCommunityModerator = (req, res, next) => {
  // TODO : Find the community to delete moderator
  community
    .findByPk(req.params.id)
    .then((community) => {
      if (!community) {
        return res.status(404).json({ message: "Community not found" });
      }

      // TODO : Find a user in moderators list
      community_moderator
        .findAll({ where: { communityId: community.id } })
        .then((moderatorsList) => {
          if (moderatorsList.length == 0 || moderatorsList.length == null) {
            return res.status(404).json({ message: "Moderators not found" });
          }

          // console.log("moderator list", moderatorsList);
          return res.status(201).json({
            status: 201,
            message: "Moderator(s) found successfully",
            datas: moderatorsList,
          });
        })
        .catch((error) => {
          return res
            .status(404)
            .json({ error, message: "Moderatorbgrfbf not found" });
        });
    })
    .catch((error) => {
      res.status(500).json({ error: error.message });
    });
};
