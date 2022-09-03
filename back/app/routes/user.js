const express = require("express");
const router = express.Router();

// * User controller
const userCtrl = require("../controllers/user");

// * Middlewares
const { isLoggedIn} = require("../middleware/auth");
const multer = require("../middleware/multer-config");
const { inputValidation } = require("../middleware/inputValidation");

//=================================>
// * SIGNUP
//=================================>
router.post("/signup", multer, userCtrl.signup);

//=================================>
// * LOGIN
//=================================>
router.post("/login", userCtrl.login);

//=================================>
// * REFRESH TOKEN
//=================================>
router.post("/refreshtoken", userCtrl.refreshToken);

//=================================>
// * READ DATAS CONNECTED USER
//=================================>
router.get("/read", isLoggedIn, userCtrl.readUser);

//=================================>
// * READ DATAS ONE USER
//=================================>
router.get("/readByName/:id", isLoggedIn, userCtrl.readByName);

//=================================>
// * READ DATAS ALL USERS
//=================================>
router.get("/readAll", isLoggedIn, userCtrl.readAll);

//=================================>
// * UPDATE
//=================================>
router.patch("/update", isLoggedIn, inputValidation, multer, userCtrl.update);

//=================================>
// * DELETE
//=================================>
router.delete("/delete", isLoggedIn, userCtrl.delete);

//=================================>
// * EXPORT DATAS
//=================================>
router.get("/export", isLoggedIn, userCtrl.exportUser);

//=================================>
// * REPORT
//=================================>
router.post("/report/:id", isLoggedIn, userCtrl.report);
// ? router.post("users/:id/report", auth, userCtrl.report);

module.exports = router;
