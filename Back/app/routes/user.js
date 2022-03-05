const express = require("express");
const router = express.Router();

// //on a besoin de notre contrôler pour associé les fonctions au différentes routes
const userCtrl = require("../controllers/user");

//ici je vais récupéré mes middlewares à appliqué sur mes routes user
//middleware d'authentification que nous appliquerons à nos routes pour les protégés
const auth = require("../middleware/auth");

//middleware verify username and email
const verifySignUp = require("../middleware/verifySignUp");

//middleware pour les fichiers
const multer = require('../middleware/multer-config');

const { inputValidation } = require("../middleware/inputValidation");

//=================================>
/////////////////// SIGNUP
//=================================>
router.post("/signup", verifySignUp, multer, userCtrl.signup);

//=================================>
/////////////////// LOGIN
//=================================>
router.post("/login", userCtrl.login);

//=================================>
///////// READ DATAS CONNECTED USER
//=================================>
router.get("/read", auth, userCtrl.readUser);

//=================================>
//////////// READ DATAS ONE USER
//=================================>
router.get("/readByName", userCtrl.readByName);

//=================================>
//////////// READ DATAS ALL USERS
//=================================>
router.get("/readAll", userCtrl.readAll);

//=================================>
/////////////////// UPDATE
//=================================>
router.patch("/update", auth, inputValidation, multer, userCtrl.update);

//=================================>
/////////////////// DELETE
//=================================>
router.delete("/delete", auth, userCtrl.delete);

//=================================>
/////////////////// EXPORT DATAS
//=================================>
router.get("/export", auth, userCtrl.exportUser);

//=================================>
/////////////////// LOGOUT
//=================================>
// router.post("/logout", auth, userCtrl.logout);

//=================================>
/////////////////// REPORT
//=================================>
router.post("/report/:id", auth, userCtrl.report);

// router.post("users/:id/report", auth, userCtrl.report);

//on exporte le router de ce fichier
module.exports = router;
