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
router.post("/community", multer, communityCtrl.create);

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
// router.put("/community/:id", multer, communityCtrl.update);


// router.delete("/:communityId", authMiddleware, communityModeratorMiddleware, communityController.delete);
// router.get("/:communityId/reports", authMiddleware, communityModeratorMiddleware, communityController.readReports);
// router.post("/:communityId/follow", authMiddleware, communityController.follow);
// router.delete("/:communityId/unfollow", authMiddleware, communityController.unfollow);
// router.post("/:communityId/moderator", authMiddleware, communityModeratorMiddleware, communityController.addModerator);
// router.delete("/:communityId/moderator", authMiddleware, communityModeratorMiddleware, communityController.deleteModerator);

module.exports = router;
