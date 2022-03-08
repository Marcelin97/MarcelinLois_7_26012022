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

//=================================>
/////////////////// CREATE COMMUNITY
//=================================>
router.post("/community", multer, communityCtrl.create);

router.get("/community/:id", communityCtrl.readOne);

//=================================>
//////////// READ DATAS ALL USERS
//=================================>
router.get("/community/readAllCommunities", communityCtrl.readAllCommunity);

// router.put("/:communityId", authMiddleware, communityModeratorMiddleware, imageUploadMiddleware, communityController.update);
// router.delete("/:communityId", authMiddleware, communityModeratorMiddleware, communityController.delete);
// router.get("/:communityId/reports", authMiddleware, communityModeratorMiddleware, communityController.readReports);
// router.post("/:communityId/follow", authMiddleware, communityController.follow);
// router.delete("/:communityId/unfollow", authMiddleware, communityController.unfollow);
// router.post("/:communityId/moderator", authMiddleware, communityModeratorMiddleware, communityController.addModerator);
// router.delete("/:communityId/moderator", authMiddleware, communityModeratorMiddleware, communityController.deleteModerator);
//on exporte le router de ce fichier
module.exports = router;
