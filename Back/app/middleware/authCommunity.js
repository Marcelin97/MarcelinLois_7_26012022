const { user } = require("../models");
const { moderator } = require("../models");
const { community } = require("../models");

//* Le créateur de la communauté devient automatiquement modérateur de sa communauté

// TODO : Seul le propriétaire de la communauté peut update / delete la communauté / readReports /

// * vérifie le role de l'utilisateur connecté
module.exports = async function (req, res, next) {
  try {
    // 401 Unauthorized

    // TODO : I find community
    if (req.params.communityId) {
      communityExist = await community.findOne(req.params.communityId);
      if (communityExist == null)
        throw new Error("This community does not exist.");
    }
    
    // TODO : I find the current user
    const currUser = await user.findOne({ where: { id: req.auth.userID } });
    if (currUser == null) throw new Error("You are not authenticated.");

    // TODO : Check if current user is admin
    if (currUser.roles === "admin") return true;

    // TODO : Check if moderator is admin
    const moderatorIsAdmin = await moderator.findOne({
      where: { isAdmin: true },
    });
    if (!moderatorIsAdmin) {
      throw new Error("You don't have community admin rights");
    }

    // TODO : Check if current user is moderator
    const currUserIsModerator = await moderator.findOne({
      where: { userId: currUser.id },
    });

    // TODO : Check if user community is the same has moderator community
    const currUserCommunity = await moderator.findOne({
      where: { communityId: currUser.communityId },
    });

    if (!currUserIsModerator && !currUserCommunity) {
      throw new Error("Access denied.");
    }
  } catch (error) {
    res.status(401).json({ error: error || "Requête non authentifiée" });
  }
};
