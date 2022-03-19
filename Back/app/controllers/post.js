const {user, post, community} = require("../models");

// * Create posts
exports.createPost = (req, res, next) => {
  // Find the community to create post
  community
    .findByPk(req.body.communityId)
    .then((result) => {
      if (!result) {
        return res.status(404).json({ message: "Community not found" });
      }

        
 post
   .create({
     ...req.body,
     imageUrl: `/images/${file.filename}`,
     communityId: result.id,
     creatorId: req.auth.userID,
   })
   .then(() => {
     res.status(201).json({
       message: " Post create successfully",
     });
   })
   .catch((error) =>
     res.status(500).json({ error: error.name, message: error.message })
   );
        
        
        
    })
    .catch((error) => {
      res.status(500).json({ error: error.message });
    });
}