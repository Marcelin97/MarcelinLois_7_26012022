const express = require("express");
const router = express.Router();

//* User controller
const userCtrl = require("../controllers/user");

//* Middlewares
const auth = require("../middleware/auth");
const verifySignUp = require("../middleware/verifySignUp");
const multer = require('../middleware/multer-config');
const { inputValidation } = require("../middleware/inputValidation");

//=================================>
//* SIGNUP
//=================================>
router.post("/signup", verifySignUp, multer, userCtrl.signup);

//=================================>
//* LOGIN
//=================================>
router.post("/login", userCtrl.login);

//=================================>
//* REFRESH TOKEN
//=================================>
router.post("/refreshtoken", userCtrl.refreshToken);

//=================================>
//* READ DATAS CONNECTED USER
//=================================>
router.get("/read", auth, userCtrl.readUser);

//=================================>
//* READ DATAS ONE USER
//=================================>
router.get("/readByName", userCtrl.readByName);

//=================================>
//* READ DATAS ALL USERS
//=================================>
router.get("/readAll", userCtrl.readAll);

//=================================>
//* UPDATE
//=================================>
router.patch("/update", auth, inputValidation, multer, userCtrl.update);

//=================================>
//* DELETE
//=================================>
router.delete("/delete", auth, userCtrl.delete);

//=================================>
//* EXPORT DATAS
//=================================>
router.get("/export", auth, userCtrl.exportUser);

//=================================>
//* REPORT
//=================================>
router.post("/report/:id", auth, userCtrl.report);
//? router.post("users/:id/report", auth, userCtrl.report);

//=================================>
//* LOGOUT
//=================================>
// router.post("/logout", auth, userCtrl.logout);

module.exports = router;
