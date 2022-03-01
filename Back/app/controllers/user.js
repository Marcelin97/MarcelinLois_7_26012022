const { user } = require("../models");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const CryptoJS = require("crypto-js");
// Import the filesystem module
const fs = require("fs");
const path = require("path");

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

// Check if the string is an email.
function validateEmail(email) {
  const res =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return res.test(String(email).toLowerCase());
}

// Password regex
const passwordRegex = new RegExp(
  /^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[^\w\d\s:])([^\s]){8,16}$/
);

// Signup a user
exports.signup = async (req, res, next) => {
  // Check if request contain username and email
  if (!req.body.username && !req.body.email) {
    return res.status(400).json({ error : "Content can not be empty!" });
  }

  // Check email validation
  if (!validateEmail(req.body.email)) {
    return res.status(400).json({ error : "L'email indiqué est invalide." });
  }

  // Check password validation
  if (passwordRegex.test(req.body.password) == false) {
    return res.status(401).send("Please enter a strong password");
  }

  // Path to my default image
  image = `${req.protocol}://${req.get("host")}/images/public/anonyme_avatar.png`;

  //  Crypte email
  const emailCrypted = encrypted(req.body.email);

  // Hash password
  bcrypt
    .hash(req.body.password, 10)
    .then((hashPass) => {
      const userObject = {
        ...req.body,
        email: emailCrypted,
        password: hashPass,
        imageUrl: req.file ? req.file.location : image,
      };
      user
        .create(userObject)
        .then((createdUser) => {
          res.status(201).send({
            status: 200,
            message: "User created successfully",
            createdUser,
          });
        })
        .catch((error) => {
          res.status(500).json({ error });
        });
    })
    .catch((error) =>
      res.status(500).json({ error: error.name, message: error.message || "Some error occurred while creating the User." })
    );
};

// Connected a user
exports.login = (req, res) => {
  var emailEncrypted = encrypted(req.body.email);
  user
    .findOne({
      where: {
        email: emailEncrypted,
      },
    })
    .then((user) => {
      if (!user) {
        return res.status(404).json({ message: "User Not found." });
      }
      var passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );
      if (!passwordIsValid) {
        return res.status(401).json({
          accessToken: null,
          message: "Invalid Password!",
        });
      }
      var token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
        expiresIn: 86400, // 24 hours
      });
      res.status(200).json({
        status: 200,
        accessToken: token,
        user,
      });
    })
    .catch((error) => {
      res.status(500).json({
        error: error.name,
        message: error.message,
      });
    });
};

// Read user info
exports.readUser = async (req, res) => {
  user
    .findOne({
      include: {
        all: true,
      },
      where: {
        id: req.auth.userID,
      },
    })
    .then((data) => {
      var emailEncrypted = data.email;
      data.email = decryptEmail(emailEncrypted);
      res.status(200).json({
        status: 200,
        data,
      });
    })
    .catch((error) =>
      res.status(500).json({
        error: error.name,
        message: error.message,
      })
    );
};

// Find a single User with an username
exports.readByName = async (req, res) => {
  user
    .findOne({
      include: {
        all: true,
      },
      where: {
        username: req.body.username,
      },
    })
    .then((user) => {
      if (!user) {
        return res.status(404).json({ message: "User Not Found." });
      }
      res.status(200).json({
        status: 200,
        user,
      });
    })
    .catch((error) => {
      res.status(500).json({
        error: error.name,
        message: error.message,
      });
    });
};

// Retrieve all Users from the database.
exports.readAll = (req, res) => {
  user
    .findAll()
    .then((users) => {
      if (users.length <= 0) {
        return res.status(404).json({ message: "Users not found" });
      }
      res.status(200).json({
        status: 200,
        data: users,
      });
    })
    .catch((error) =>
      res.status(500).json({
        error: error.name,
        message: error.message,
      })
    );
};

// // Update password
// exports.update = async (req, res) => {
//   console.log("test");
//   user
//     .findOne({
//       where: { id: req.auth.userID },
//     })
//     .then(async (result) => {
//       console.log(result);
//       // if not, respond with a 404 code
//       if (!result) {
//         return res.status(404).json({ message: "User not found" });
//       }
//       console.log("test")
//       //Body avec firstname, lastname, username, email, password, imageUrl
//       //       //Facile : firstname, lastname, username
//       //       //Gestion image ==> req.body.img = string de l'image après avoir stockée l'image
//       //       //Gestion password ==> req.body.password
//       if(req.body.newPassword && req.body.newPassword !== req.body.oldPassword){
//         const isGoodPassword = await bcrypt.compare(result.password,  req.body.oldPassword);
//         if (!isGoodPassword) {
//           return res.status(403).json({ error: "Incorrect old password !" });
//         }

//         const hashPass = await bcrypt.hash(req.body.newPassword, 10);
//         req.body.password=hashPass;
//       }

//       //Gestion email ==> req.body.email
//       if(req.body.email){
//         req.body.email=encrypted(req.body.email)
//       }
//       console.log(...req.body);
//       user.update(
//           req.body,
//           { where: { id: result.id } }
//       ).then(() => {
//         res.status(200).json({
//           message: "User updated successfully",
//           status: 200,
//           data: user,
//         });
//       })

//     })
//     .catch((error) =>
//       res.status(500).json({
//         error: error.name,
//         message: error.message,
//       })
//     );
// };

// Delete a User with the specified id in the request
exports.delete = async (req, res) => {
  user
    .destroy({
      where: {
        id: req.auth.userID,
      },
    })
    .then((userId) => {
      if (!userId) {
        return res.status(404).json({
          message: "User not found",
        });
      }
      return res.status(204).json({
        status: 204,
        message: "User Deleted successfully",
      });
    })
    .catch((error) => {
      return res.status(400).json({
        error: error.name,
        message: error.message,
      });
    });
};

// Export user info
exports.exportUser = async (req, res) => {
  user
    .findOne({
      include: [
        { association: "comments" },
        { association: "posts" },
        { association: "moderators" },
        { association: "likePosts" },
        { association: "userReported" },
        { association: "postReport" },
        { association: "replies" },
        { association: "messageToUserId" },
      ],
      where: {
        id: req.auth.userID,
      },
    })
    .then((datas) => {
      var emailEncrypted = datas.email;
      datas.email = decryptEmail(emailEncrypted);
      const dataFile = path.join(
        __dirname,
        "export",
        `datasUser.${req.auth.userID}.txt`
      );
      const file = JSON.stringify(datas, null, 4);
      fs.writeFileSync(dataFile, file);
      return res.status(200).json({
        status: 200,
        file,
      });
    })
    .catch((error) =>
      res.status(500).json({
        error: error.name,
        message: error.message,
      })
    );
};

// Logout
exports.logout = async (req, res) => {
  res.cookie("jwt", "", { maxAge: 1 });
  res.status(200).json({ msg: "Vous vous êtes déconnecté" });
};

exports.logout = (request, response, next) => {
  const token = request.cookies.jwt;
  const decodedToken = jwt.verify(token, `${process.env.TOKEN_KEY}`);
  const userId = decodedToken.userId;

  if (userId) {
    response.cookie("jwt", "", { maxAge: 1 });
    response.redirect("/");
  } else {
    return response
      .status(403)
      .json({ message: "Vous n'êtes pas authentifié !" });
  }
};
