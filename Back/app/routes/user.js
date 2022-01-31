const express = require("express");
const router = express.Router();

// //on a besoin de notre contrôler pour associé les fonctions au différentes routes
// const userCtrl = require("../controllers/user");

//ici je vais récupéré mes middlewares à appliqué sur mes routes user

router.get('/', function (req, res, next) {
    res.send('respond with a ressource');
});
//=================================>
/////////////////// SIGNUP
//=================================>
// router.post("/signup",userCtrl.signup);

//=================================>
/////////////////// LOGIN
//=================================>
// router.post("/login", userCtrl.login);

//=================================>
/////////////////// READ DATAS
//=================================>

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