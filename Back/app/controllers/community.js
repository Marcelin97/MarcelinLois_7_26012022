const { user } = require("../models");
const { community } = require("../models");
// Import the filesystem module
const fs = require("fs");
const path = require("path");

//* Create community
exports.create = async (req, res, next) => {
  try {
    // console.log(req.file);
    // TODO : Check if request contain files uploaded
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

//* Read community
exports.readOne = async (req, res) => {
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
    if (communityFind == null)
      throw new Error("Cette communauté n'existe pas.");

    return res.status(201).json({
      status: 201,
      data: communityFind,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//* Read all communities active
exports.readAllCommunity = async (req, res) => {
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
        data: communitiesActive,
      });
    })
    .catch((error) => {
      res.status(500).json({ error: error.message, message });
    });
};
