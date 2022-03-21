const express = require("express");
const router = express.Router();

//* Community controller
const communityCtrl = require("../controllers/community");

//* Middlewares
const { isLoggedIn, isAdmin } = require("../middleware/auth");
const multer = require("../middleware/multer-config");

//=================================>
//* CREATE COMMUNITY
//=================================>
router.post("/", isLoggedIn, multer, communityCtrl.create);

//=================================>
//* READ DATAS ONE COMMUNITY
//=================================>
router.get("/readOne/:id", isLoggedIn, communityCtrl.readOne);

//=================================>
//* READ DATAS ALL COMMUNITIES
//=================================>
router.get("/readAllCommunities", isLoggedIn, communityCtrl.readAllCommunity);

//=================================>
//* UPDATE COMMUNIY
//=================================>
router.patch(
  "/updateCommunity/:id",
  isLoggedIn,
  isAdmin,
  multer,
  communityCtrl.updateCommunity
);

//=================================>
//* DELETE COMMUNIY
//=================================>
router.delete(
  "/deleteCommunity/:id",
  isLoggedIn,
  isAdmin,
  communityCtrl.deleteCommunity
);

//=================================>
//* FOLLOW COMMUNIY
//=================================>
router.post("/follow/:id",isLoggedIn, communityCtrl.followCommunity);

//=================================>
//* UNFOLLOW COMMUNIY
//=================================>
router.post("/unfollow/:id", isLoggedIn, communityCtrl.unfollowCommunity);

//=================================>
//* REPORT COMMUNIY
//=================================>
router.post("/report/:id", isLoggedIn, communityCtrl.reportCommunity);

//=================================>
//* ADD MODERATOR COMMUNIY
//=================================>
router.post("/moderator/:id", isLoggedIn, communityCtrl.addModerator);

//=================================>
//* DELETE MODERATOR COMMUNIY
//=================================>
router.delete("/moderator/delete/:id", isLoggedIn, communityCtrl.deleteModerator);

module.exports = router;

