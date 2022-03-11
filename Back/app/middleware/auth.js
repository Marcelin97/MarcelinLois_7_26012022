const jwt = require("jsonwebtoken");
// const { user } = require("../models");

//* Le créateur de la communauté devient automatiquement modérateur de sa communauté

// TODO : Seul le propriétaire de la communauté peut update / delete la communauté / readReports /

// * vérifie le role de l'utilisateur connecté

const isAdmin = async (req, res, next) => {
  const user = await user.findByPk(req.userId)
  console.log(user);
  if (!user) {
    return res.status(404).json({'error': 'Logged in user not found'});
  }

  if (!user.isAdmin) {
    return res.status(403).json({'error': 'Insufficient rights'})
  }

  next();
};

const isLoggedIn = async (req, res, next) => {
 try {
   //on va utiliser le faite qu'on connaît la forme de se headers pour récupérer le token
   //on utilise les headers de la requête et le header autorisation que l'on va splite autour d'un espace
   // sa nous retourne un tableau avec bear en premier et le token en deuxième élément
   //donc sa nous retournera uniquement le token
   const token = req.headers.authorization.split(" ")[1];
   //la seconde étape et de décoder le token
   //on va utiliser le package jsonwebtoken et la fonction verify
   //(on vérifie le token et on veut vérifier la clé secrete)
   const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
   // console.log(decodedToken);
   //quand on décode le token cela devient un objet JS
   // donc on va pouvoir récupérer le userId qui est dedans
   const userId = decodedToken.id;
   //nous ajoutons un objet  auth  à l'objet de requête qui contient le  userId  extrait du token
   req.auth = { userID: userId };
   //si jamais il y a un userId dans le corp de la requete on veut vérifier que cela correspond bien a celle du token
   //dans le if c'est si cela ne correspond pas
   if (req.body.userId && req.body.userId !== userId) {
     //on peut utiliser throw pour renvoyé une erreur
     throw "User ID non valable !";
     //sinon si tout va bien on peut passer la requête au prochain middleware
   } else {
     next();
   }
 } catch (error) {
   // 401 pour une erreur d'authentification
   res.status(401).json({ error: error || "Requête non authentifiée" });
 }
};

// autorisation d'un modérateur

// Seul le propriétaire de la communauté peut accorder des autorisations de modérateur.

// // le modérateur
// const isModerator = (req, res, next) => {
//   User.findByPk(req.userId).then((user) => {
//     user.getRoles().then((roles) => {
//       for (let i = 0; i < roles.length; i++) {
//         if (roles[i].name === "moderator") {
//           next();
//           return;
//         }
//       }

//       res.status(403).send({
//         message: "Require Moderator Role!",
//       });
//     });
//   });
// };

// const isModeratorOrAdmin = (req, res, next) => {
//   User.findByPk(req.userId).then((user) => {
//     user.getRoles().then((roles) => {
//       for (let i = 0; i < roles.length; i++) {
//         if (roles[i].name === "moderator") {
//           next();
//           return;
//         }

//         if (roles[i].name === "admin") {
//           next();
//           return;
//         }
//       }

//       res.status(403).send({
//         message: "Require Moderator or Admin Role!",
//       });
//     });
//   });
// };



module.exports = {
  isLoggedIn,
  isAdmin
};
