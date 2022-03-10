const express = require("express");
const router = express.Router();

//* Community controller
const communityCtrl = require("../controllers/community");

//* Middlewares
const auth = require("../middleware/auth");
const authCommunity = require("../middleware/authCommunity");
const multer = require("../middleware/multer-config");

//=================================>
//* CREATE COMMUNITY
//=================================>
router.post("/community", auth, multer, communityCtrl.create);

//=================================>
//* READ DATAS ONE COMMUNITY
//=================================>
router.get("/community/:id", communityCtrl.readOne);

//=================================>
//* READ DATAS ALL COMMUNITIES
//=================================>
router.get("/community/readAllCommunities", communityCtrl.readAllCommunity);

//=================================>
//* UPDATE COMMUNIY
//=================================>
// router.put("/community/:id/update", multer, communityCtrl.update);

// router.delete("/community/:id/delete", communityCtrl.delete);
// router.get("/community/:id/reports",communityCtrl.readReports);
// router.post("/community/:id/follow", communityCtrl.follow);
// router.delete("/community/:id/unfollow", communityCtrl.unfollow);
// router.post("/community/:id/moderator", communityCtrl.addModerator);
// router.delete("/community/:id/moderator", communityCtrl.deleteModerator);

module.exports = router;