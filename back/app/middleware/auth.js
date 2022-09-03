const jwt = require("jsonwebtoken");
const { user, community_moderator, community } = require("../models");

// * Auth middleware
const isLoggedIn = async (req, res, next) => {
  try {
    // on va utiliser le faite qu'on connaît la forme de se headers pour récupérer le token
    // on utilise les headers de la requête et le header autorisation que l'on va splite autour d'un espace
    // sa nous retourne un tableau avec bear en premier et le token en deuxième élément
    // donc sa nous retournera uniquement le token
    const token = req.headers.authorization.split(" ")[1];
    // console.log(token);
    // la seconde étape et de décoder le token
    // on va utiliser le package jsonwebtoken et la fonction verify
    // (on vérifie le token et on veut vérifier la clé secrete)
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    // console.log(decodedToken);
    // quand on décode le token cela devient un objet JS
    // donc on va pouvoir récupérer le userId qui est dedans
    const userId = decodedToken.id;
    // nous ajoutons un objet  auth  à l'objet de requête qui contient le  userId  extrait du token
    req.auth = { userID: userId };
    // console.log(req.auth)
    // si jamais il y a un userId dans le corp de la requete on veut vérifier que cela correspond bien a celle du token
    // dans le if c'est si cela ne correspond pas
    if (req.body.userId && req.body.userId !== userId) {
      // on peut utiliser throw pour renvoyé une erreur
      throw "User ID non valable !";
      // sinon si tout va bien on peut passer la requête au prochain middleware
    } else {
      next();
    }
  } catch (error) {
    console.log("error", error);
    // 401 pour une erreur d'authentification
    res.status(401).json({ error: error || "Unauthenticated request" });
  }
};

// * Admin middleware
const isAdmin = async (req, res, next) => {
  try {
    const currentUser = await user.findOne({ where: { id: req.auth.userID } });
    if (!currentUser) {
      return res.status(404).json({ error: "Logged in user not found" });
    }
    
    // TODO Check is super admin
    if (!currentUser.isAdmin) {
      return res.status(403).json({ error: "Insufficient rights" });
    }

    next();
  } catch (error) {
    res
      .status(401)
      .json({ error: error.message || "Unauthenticated request" });
  }
};

// * Is creator, admin or moderator
const isCreatorOrAdminOrModerator = async (req, res, next) => {
  try {
    let communityFind = null;
    let post = null;
    let comment = null;
    let isModerator = false;
    let isAdmin = false;
    let isAuthor = false;
    let isOwner = false;

    const currentUser = await user.findOne({ where: { id: req.auth.userID } });
    if (currentUser == null) throw new Error("Logged in user not found");

    // TODO Check is super admin
    if (currentUser.isAdmin) isAdmin = true;
    console.log("iciii", currentUser.id);

    // TODO Check is community moderator / owner
    // find moderator
    let myCommunityModerators = await community_moderator.findOne({
      where: { userId: currentUser.id },
    });

    if (!myCommunityModerators || myCommunityModerators == undefined)
      throw new Error("Your're not on the moderator list.");

    // check if the currentUser is moderator of this community
    isModerator = myCommunityModerators.userId === currentUser.id;
    if (isModerator == null)
      throw new Error("Your're not the owner of this community.");
    console.log("isModerator", isModerator);

    // Find community
    if (req.params.id) {
      communityFind = await community.findByPk(req.params.id);
      // console.log(communityFind);
      if (communityFind == null)
        throw new Error("This community does not exist.");
    }

    // check if currentUser is owner of this community
    isOwner = communityFind.userId === currentUser.id;
    if (isOwner == null)
      throw new Error("Your're not the owner of this community.");
    console.log("isOwner", isOwner);

    // Access denied
    if (!isAdmin && !isModerator && !isOwner)
      throw new Error("You do not have permission to access this content.");
    
    // Access granted
    next();
  } catch (error) {
    console.error(error.message);
    res.status(403).json({ error: error.message || "Insufficient rights" });
  }
};

module.exports = {
  isLoggedIn,
  isAdmin,
  isCreatorOrAdminOrModerator,
};
