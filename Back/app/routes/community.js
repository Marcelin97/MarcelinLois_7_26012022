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
router.get("/readAllCommunities", communityCtrl.readAllCommunity);

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
router.post("/follow/:id", communityCtrl.followCommunity);

// router.delete("/unfollow/:id", communityCtrl.unfollow);


module.exports = router;
