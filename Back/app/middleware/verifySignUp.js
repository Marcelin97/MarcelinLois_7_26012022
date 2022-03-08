// const db = require("../models");
// const User = db.user;
const { user } = require("../models");

// checkDuplicateUsernameOrEmail

module.exports = (req, res, next) => {
  user.findOne({
    where: {
      username: req.body.username,
    },
  }).then((result) => {
    if (result) {
      res.status(400).send({
        message: "Failed! Username is already in use!",
      });
      return;
    }
    // Email
    user.findOne({
      where: {
        email: req.body.email,
      },
    }).then((result) => {
      if (result) {
        res.status(400).send({
          message: "Failed! Email is already in use!",
        });
        return;
      }
      next();
    });
  });
};
