module.exports = (sequelize, Sequelize) => {
  // * Model Definition
  const LikePost = sequelize.define("likePost", {
    vote: {
      type: Sequelize.INTEGER,
<<<<<<< HEAD
      allowNull: true
=======
      allowNull: true 
>>>>>>> 81a707f5a2e5937f05c10f0fc6368fda96ab6dd8
    },
  });

  // * Sequelize associations
  LikePost.associate = (models) => {
    // is linked to
    LikePost.belongsTo(models.post, {
      onDelete: "CASCADE",
    });
    LikePost.belongsTo(models.user, {
      onDelete: "CASCADE",
    });
  };

  return LikePost;
};
