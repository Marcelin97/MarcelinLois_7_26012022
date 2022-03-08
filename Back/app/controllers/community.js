const { user } = require("../models");
const { community } = require("../models");
// Import the filesystem module
const fs = require("fs");
const path = require("path");

// Create community
exports.create = async (req, res, next) => {
  try {
    // console.log(req.file);
    // Check if request contain files uploaded
    const { file } = req;
    if (!file) {
      return res.status(422).json({ error: { msg: "Icon is required" } });
    }

    community
      .findOne({
        where: {
          title: req.body.title,
        },
      })
      .then((result) => {
        if (result) {
          res.status(400).send({
            message: "Failed! title is already in use!",
          });
        }
      });

    let communityCreate = await community.create({
      title: req.body.title,
      about: req.body.about,
      isActive: true,
      icon: `/images/${req.file.filename}`,
    });
    res.status(201).send({
      status: 200,
      message: "Community created successfully",
      communityCreate,
    });
  } catch (error) {
    res.status(500).json({ error: error.message, message });
  }
};

// Read community
// exports.readOne = async (req, res) => {
//   try {
//     let community = await db.Community.findByPk(req.params.communityId, {
//       include: [
//         db.Post,
//         { model: db.CommunityModerator, include: db.User },
//         db.Follower,
//       ],
//     });
//     if (community == null) throw new Error("Cette communauté n'existe pas.");

//     // Set image full url
//     const baseUri = req.protocol + "://" + req.get("host");
//     community.icon = baseUri + "/" + prefixPath + "/" + community.icon;

//     return Helper.successResponse(req, res, { community }, hateoas(req));
//   } catch (error) {
//     console.error(error);
//     return Helper.errorResponse(req, res, error.message);
//   }
// };
