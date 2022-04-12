const express = require("express");
const router = express.Router();

// * Community controller
const communityCtrl = require("../controllers/community");

// * Middlewares
const { isLoggedIn, isAdmin, isModerator } = require("../middleware/auth");
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
// * UPDATE COMMUNIY
//=================================>
router.patch(
  "/updateCommunity/:id",
  isLoggedIn,
  // isModerator, // ! middleware to protect route
  multer,
  communityCtrl.updateCommunity
);

//=================================>
// * DELETE COMMUNITY
//=================================>
router.delete(
  "/deleteCommunity/:id",
  isLoggedIn,
  communityCtrl.deleteCommunity
);

//=================================>
// * FOLLOW COMMUNITY
//=================================>
router.post("/:id/follow",isLoggedIn, communityCtrl.followCommunity);

//=================================>
// * UNFOLLOW COMMUNITY
//=================================>
router.post("/:id/unfollow", isLoggedIn, communityCtrl.unfollowCommunity);

//=================================>
// * REPORT COMMUNITY
//=================================>
router.post("/:id/report", isLoggedIn, communityCtrl.reportCommunity);

//=================================>
// * ADD MODERATOR COMMUNITY
//=================================>
router.post("/:id/moderator", isLoggedIn, communityCtrl.addModerator);

//=================================>
// * DELETE MODERATOR COMMUNITY
//=================================>
router.delete(
  "/:id/moderator/delete",
  isLoggedIn,
  isAdmin, // ! middleware to protect route
  communityCtrl.deleteModerator
);

module.exports = router;

