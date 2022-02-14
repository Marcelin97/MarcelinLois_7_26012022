const express = require("express");
const router = express.Router();

// //on a besoin de notre contrôler pour associé les fonctions au différentes routes
const userCtrl = require("../controllers/user");

//ici je vais récupéré mes middlewares à appliqué sur mes routes user
//middleware d'authentification que nous appliquerons à nos routes pour les protégés
const auth = require("../middleware/auth");

const verifySignUp = require("../middleware/verifySignUp");

//=================================>
/////////////////// SIGNUP
//=================================>
router.post("/signup", verifySignUp, userCtrl.signup);

//=================================>
/////////////////// LOGIN
//=================================>
router.post("/login", userCtrl.login);

//=================================>
/////////////////// READ DATAS
//=================================>
// router.get(
//   "/read-datas",
//   auth,
//   userCtrl.readDatas
// );
//=================================>
/////////////////// EXPORT DATAS
//=================================>

//=================================>
/////////////////// DELETE
//=================================>

//=================================>
/////////////////// UPDATE
//=================================>

//=================================>
/////////////////// REPORT
//=================================>

//on exporte le router de ce fichier
module.exports = router;
