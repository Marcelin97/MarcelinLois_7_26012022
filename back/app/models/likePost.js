module.exports = (sequelize, Sequelize) => {
  // * Model Definition
  const LikePost = sequelize.define("likePost", {
    vote: {
      type: Sequelize.BOOLEAN,
      unique: false,
      defaultValue: false,
    },
  });

  // * Sequelize associations
  LikePost.associate = (models) => {
    // is linked to
    LikePost.belongsTo(models.post, {
      foreignKey: "postId",
      as: "posts",
    });
    LikePost.belongsTo(models.user, {
      foreignKey: "userId",
      as: "users",
    });
  };

  return LikePost;
};
