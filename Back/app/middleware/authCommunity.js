const { user } = require("../models");
const { moderator } = require("../models");
const { community } = require("../models");

// Le créateur de la communauté devient automatiquement modérateur de sa communauté

// Seul le propriétaire de la communauté peut update / delete la communauté / readReports /

// vérifie le role de l'utilisateur connecté
module.exports = async function (req, res, next) {
  try {
    // 401 Unauthorized

    // Find for community
    if (req.params.communityId) {
      communityExist = await community.findOne(req.params.communityId);
      if (communityExist == null)
        throw new Error("Cette communauté n'existe pas.");
    }

    // Check if current user is admin of this community

    // I find the current user
    const currUser = await user.findOne({ where: { id: req.auth.userID } });
    console.log(currUser.id);

    // Check if current user is admin 
    if (currUser.roles === "admin") return true;
    return res
      .status(403)
      .send({ error: { status: 403, message: "Access denied." } });

    // je vérifie qu'il est admin d'une communauté
    const currUserIsAdmin = await moderator.findOne({
      where: { userId: currUser },
    });
    if (!currUserIsAdmin) {
      throw new Error("Access denied.");
    }
    console.log(currUserIsAdmin);
  } catch (error) {
    res.status(401).json({ error: error || "Requête non authentifiée" });
  }
};
