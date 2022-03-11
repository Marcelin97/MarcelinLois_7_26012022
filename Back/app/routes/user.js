const express = require("express");
const router = express.Router();

//* User controller
const userCtrl = require("../controllers/user");

//* Middlewares
// const auth = require("../middleware/auth");
// const verifySignUp = require("../middleware/verifySignUp");
const multer = require("../middleware/multer-config");
const { inputValidation } = require("../middleware/inputValidation");

//=================================>
//* SIGNUP
//=================================>
router.post("/signup", multer, userCtrl.signup);

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
router.get("/read", userCtrl.readUser);

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
router.patch("/update",inputValidation, multer, userCtrl.update);

//=================================>
//* DELETE
//=================================>
router.delete("/delete", userCtrl.delete);

//=================================>
//* EXPORT DATAS
//=================================>
router.get("/export", userCtrl.exportUser);

//=================================>
//* REPORT
//=================================>
router.post("/report/:id", userCtrl.report);
//? router.post("users/:id/report", auth, userCtrl.report);

//=================================>
//* LOGOUT
//=================================>
// router.post("/logout", auth, userCtrl.logout);

module.exports = router;
