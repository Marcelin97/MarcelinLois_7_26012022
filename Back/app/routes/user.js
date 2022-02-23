const express = require("express");
const router = express.Router();

// //on a besoin de notre contrôler pour associé les fonctions au différentes routes
const userCtrl = require("../controllers/user");

//ici je vais récupéré mes middlewares à appliqué sur mes routes user
//middleware d'authentification que nous appliquerons à nos routes pour les protégés
const auth = require("../middleware/auth");

//middleware verify username and email
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
//////////// READ DATAS ONE USER
//=================================>
router.get("/findByName", userCtrl.findByName);

//=================================>
//////////// READ DATAS ALL USERS
//=================================>
router.get("/findAll", userCtrl.findAll);

//=================================>
/////////////////// EXPORT DATAS
//=================================>
router.get("/export", auth, userCtrl.exportUser);

//=================================>
/////////////////// DELETE
//=================================>
router.delete("/delete", userCtrl.delete);

//=================================>
/////////////////// UPDATE
//=================================>
router.put("/updateMail", userCtrl.updateMail);
router.put("/updatePass", userCtrl.updatePassword);

//=================================>
/////////////////// REPORT
//=================================>

router.get("/read", auth, userCtrl.readUser);

//on exporte le router de ce fichier
module.exports = router;
