const express = require("express");
const router = express.Router();

// * Community controller
const communityCtrl = require("../controllers/community");

// * Middlewares
const { isLoggedIn } = require("../middleware/auth");
const multer = require("../middleware/multer-config");

//=================================>
// * CREATE COMMUNITY
//=================================>
router.post("/", isLoggedIn, multer, communityCtrl.create);

//=================================>
// * READ DATAS ONE COMMUNITY
//=================================>
router.get("/readOne/:id", isLoggedIn, communityCtrl.readOne);

//=================================>
// * READ DATAS ALL COMMUNITIES
//=================================>
router.get("/readAllCommunities", isLoggedIn, communityCtrl.readAllCommunity);

//=================================>
// * UPDATE COMMUNITY
//=================================>
router.patch("/updateCommunity/:id", isLoggedIn, multer, communityCtrl.updateCommunity);

//=================================>
// * DELETE COMMUNITY
//=================================>
router.delete("/deleteCommunity/:id", isLoggedIn, communityCtrl.deleteCommunity);

//=================================>
// * FOLLOW COMMUNITY
//=================================>
router.post("/:id/follow", isLoggedIn, communityCtrl.followCommunity);

//=================================>
// * UNFOLLOW COMMUNITY
//=================================>
router.post("/:id/unfollow", isLoggedIn, communityCtrl.unfollowCommunity);

//=================================>
// * REPORT COMMUNITY
//=================================>
router.post("/:id/report", isLoggedIn, communityCtrl.reportCommunity);

//=================================>
// * READ MODERATOR BY COMMUNITY
//=================================>
router.get("/:id/moderator/list", isLoggedIn, communityCtrl.readCommunityModerator);

//=================================>
// * ADD MODERATOR COMMUNITY
//=================================>
router.post("/:id/moderator", isLoggedIn, communityCtrl.addModerator);

//=================================>
// * DELETE MODERATOR COMMUNITY
//=================================>
router.delete("/:id/moderator/delete", isLoggedIn, communityCtrl.deleteModerator);

module.exports = router;
