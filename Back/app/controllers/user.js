const db = require("../models"); // models path
const User = db.user;
const Op = db.Sequelize.Op;
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const CryptoJS = require("crypto-js");
const Auth = require("./../middleware/auth");

//=================================>
/////////////////// ENCRYPTED EMAIL
//=================================>
function encrypted(email) {
  return CryptoJS.AES.encrypt(
    email,
    CryptoJS.enc.Base64.parse(process.env.PASSPHRASE),
    {
      iv: CryptoJS.enc.Base64.parse(process.env.IV),
      mode: CryptoJS.mode.ECB,
      padding: CryptoJS.pad.Pkcs7,
    }
  ).toString();
}
//=================================>
/////////////////// ENCRYPTED EMAIL
//=================================>

//=================================>
/////////////////// DECRYPT EMAIL
//=================================>
function decryptEmail(email) {
  var bytes = CryptoJS.AES.decrypt(
    email,
    CryptoJS.enc.Base64.parse(process.env.PASSPHRASE),
    {
      iv: CryptoJS.enc.Base64.parse(process.env.IV),
      mode: CryptoJS.mode.ECB,
      padding: CryptoJS.pad.Pkcs7,
    }
  );
  return bytes.toString(CryptoJS.enc.Utf8);
}
//=================================>
/////////////////// DECRYPT EMAIL
//=================================>

exports.signup = (req, res, next) => {
  if (!req.body.username && !req.body.email) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
    return;
  }

  let { firstName, lastName, username, email } = req.body;
  const password = bcrypt.hashSync(req.body.password, 10);
  // const emailCrypted = encrypted(req.body.email);

  User.create({
    username,
    firstName,
    lastName,
    email,
    password,
  }).then((user) => {
    return res
      .status(201)
      .json({
        message: "User created successfully",
        user,
      })
      .catch((err) => {
        return res.status(400).json({
          message:
            err.message || "Some error occurred while creating the User.",
        });
      });
  });
};

exports.login = (req, res) => {
  User.findOne({
    where: {
      username: req.body.username,
    },
  })
    .then((user) => {
      if (!user) {
        return res.status(404).send({ message: "User Not found." });
      }
      var passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );
      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: "Invalid Password!",
        });
      }
      var token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
        expiresIn: 86400, // 24 hours
      });
      res.status(200).send({
        user,
        accessToken: token,
      });
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};

// Retrieve all Users from the database.
exports.findAll = (req, res) => { 
  User.findAll()
    .then((users) => {
      if (users.length <= 0) {
        return res.status(404).send("Users not found");
      }
      res.status(200).json(users);
    })
    .catch((error) => res.status(500).json({ error }));
};

// Find a single User with an username
(exports.findByName = async (req, res) => {
  User.findOne({
    where: {
      username: req.body.username,
    },
  })
    .then((user) => {
      if (!user) {
        return res.status(404).send("User Not Found.");
      }

      res.status(200).send({ user });
    })
    .catch((err) => {
      res.status(500).send("Error -> " + err);
    });
}),
  
// Find a single User with an id
exports.findById = async (req, res) => {
  try {
    const conectedUser = await Auth.validateToken(req, res);
    const userId = conectedUser.id;

    const user = await User.findByPk(userId);
    res.status(200).json({ user });
  } catch (error) {
    res.status(401).json({ error: { msg: "Couldn´t find user" } });
  }
},

// Update email
exports.updateMail = async (req, res) => {
    try {
      const { email } = req.body;

      const conectedUser = await Auth.validateToken(req, res);
      const userId = conectedUser.id;

      const exists = await User.findByPk(userId, { attributes: ["email"] });
      if (exists == null) {
        return res.status(422).json({ error: { message: "User not exist" } });
      }

      const emailAlreadyRegistered = await User.findOne({
        where: { email },
        attributes: ["email"],
      });
      if (emailAlreadyRegistered) {
        return res
          .status(422)
          .json({ error: { message: "This email is already in use" } });
      }

      const user = await User.update(
        { email },
        { where: { id: userId } }
        // { attributes: { exclude: ["password", "createdAt", "updatedAt"] } }
      );
      res.status(200).json({ message: "User edit successfully", user });
    } catch (error) {
      res.status(401).json({ error: { msg: "Couldn´t edit user" } });
    }
};

// Update password
exports.updatePassword = async (req, res) => {
  const conectedUser = await Auth.validateToken(req, res);
  const userId = conectedUser.id;
  console.log(userId);
  // First, check if the user exist in the db
  User.findOne({ where: { id: userId } })
    .then((user) => {
      // if not, respond with a 404 code
      if (!user) {
        return res.status(404).send("User not found");
      }
      // Then, check if the old password is valid
      bcrypt
        .compare(req.body.password, user.password)
        .then((validPass) => {
          if (!validPass) {
            return res.status(401).send("Wrong password");
          }
          // Then, hash the new Password
          bcrypt
            .hash(req.body.newPassword, 10)
            .then((newPassword) => {
              // Finally update the password with the new one
              User.update(
                { password: newPassword},
                {
                  where: {
                    id: userId,
                  },
                }
              )
                .then((response) => res.status(200).json({ user, "message": "User updated successfully" }))
                .catch((error) => res.status(500).json({ error }));
            })
            .catch((error) => res.status(500).json({ error }));
        })
        .catch((error) => res.status(500).json({ error }));
    })
    .catch((error) => res.status(500).json({ error }));
};

// Delete a User with the specified id in the request
exports.delete = async (req, res) => {
const conectedUser = await Auth.validateToken(req, res);
const userId = conectedUser.id;

  User.destroy({
    where: { id: userId }
  }).then((userId) => {
          if (!userId) {
            return res.status(404).send({
              message: "User not found",
            });
    };
    return res.status(200).json({
      "message": "User Deleted successfully"
    })
  }).catch(error => {
    return res.status(400).json({ error })
  })
};


// Export user info
exports.exportUserInfo = async (req, res) => {
const userDatas = [];
const dataFile = `./userDatas/${req.params.id}`;
User.findOne({ where: { id: req.params.id } })
  .then((user) => {
    if (!user) {
      return res.status(404).send("User not found");
    }
    userDatas.push(JSON.stringify(user.dataValues));
    Post.findAll({ where: { user_id: user.id } })
      .then((posts) => {
        if (!posts) {
          userDatas.push("You don't have any posts");
        } else {
          posts.forEach((post) => {
            userDatas.push(JSON.stringify(post.dataValues));
          });
        }
        Comment.findAll({ where: { user_id: user.id } })
          .then((comments) => {
            if (!comments) {
              userDatas.push("You do not have any comments");
            } else {
              comments.forEach((comment) => {
                userDatas.push(JSON.stringify(comment.dataValues));
              });
            }
            fsPromise
              .writeFile(dataFile, userDatas)
              .then(() => {
                res
                  .status(201)
                  .download(dataFile, "Vos_données_personnelles.txt", (err) => {
                    if (err) {
                      return res.status(500).json({ err });
                    }
                    fsPromise.unlink(dataFile, (err) => {
                      if (err) {
                        return res.status(500).json({ err });
                      }
                    });
                  });
              })
              .catch((error) => {
                res.status(500).json({ error });
              });
          })
          .catch((error) => res.status(500).json({ error }));
      })
      .catch((error) => res.status(500).json({ error }));
  })
  .catch((error) => res.status(500).json({ error }));
};

async function getUserDatas() {
  let user = await db.User.findByPk(userId, {
    include: [
      db.Post,
      db.Community,
      db.Moderator,
      db.Follower,
      db.PrivateMessage,
      db.Notification,
      db.PostReport,
      db.PostComment,
      db.CommentLike,
      db.CommentReport
    ],
  });
      console.log(user);

}
