const express = require("express");
const router = express.Router();

const communityCtrl = require("../controllers/community");

//ici je vais récupéré mes middlewares à appliqué sur mes routes user
//middleware d'authentification que nous appliquerons à nos routes pour les protégés
const auth = require("../middleware/auth");

//middleware d'authentification que nous appliquerons à nos routes pour les protégés
const authCommunity = require("../middleware/authCommunity");

//middleware pour les fichiers
const multer = require("../middleware/multer-config");

router.post("/community", auth, authCommunity, communityCtrl.create);

//on exporte le router de ce fichier
module.exports = router;
