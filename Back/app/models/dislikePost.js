module.exports = (sequelize, Sequelize) => {
  // * Model Definition
  const DislikePost = sequelize.define("dislikePost", {
    vote: {
      type: Sequelize.BOOLEAN,
      unique: false,
      defaultValue: false,
    },
  });

  // * Sequelize associations
  DislikePost.associate = (models) => {
    // is linked to
    DislikePost.belongsTo(models.post, {
      foreignKey: "postId",
      as: "DislikePosts",
    });
    DislikePost.belongsTo(models.user, {
      foreignKey: "userId",
      as: "user",
    });
  };

  return DislikePost;
};
