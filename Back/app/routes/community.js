const express = require("express");
const router = express.Router();

//* Community controller
const communityCtrl = require("../controllers/community");

//* Middlewares
const { isLoggedIn, isAdmin} = require("../middleware/auth");
const multer = require("../middleware/multer-config");

//=================================>
//* CREATE COMMUNITY
//=================================>
router.post("/", isLoggedIn, isAdmin, multer, communityCtrl.create);

//=================================>
//* READ DATAS ONE COMMUNITY
//=================================>
router.get("/readOne/:id",isLoggedIn, communityCtrl.readOne);

//=================================>
//* READ DATAS ALL COMMUNITIES
//=================================>
router.get("/readAllCommunities", communityCtrl.readAllCommunity);

//=================================>
//* UPDATE COMMUNIY
//=================================>
router.patch("/updateCommunity/:id", isLoggedIn, multer, communityCtrl.updateCommunity);

//=================================>
//* DELETE COMMUNIY
//=================================>
router.delete("/deleteCommunity/:id", isLoggedIn, communityCtrl.deleteCommunity);

// router.post("/community/:id/follow", communityCtrl.follow);
// router.delete("/community/:id/unfollow", communityCtrl.unfollow);
// router.post("/community/:id/moderator", communityCtrl.addModerator);
// router.delete("/community/:id/moderator", communityCtrl.deleteModerator);

module.exports = router;
