const { user } = require("../models");

//* checkDuplicateUsernameOrEmail

module.exports = async (req, res, next) => {
  //* Verify Username
  const username = await user.findOne({
    where: {
      username: req.body.username,
    },
  });

  if (username) {
    return res.status(400).json({message: "Failed! Username is already in use!"});
  }
 

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
    //* Verify Email
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
