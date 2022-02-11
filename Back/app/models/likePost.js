module.exports = (sequelize, Sequelize) => {
  const LikePost = sequelize.define("likePost", {
    upVotes: {
      type: Sequelize.INTEGER,
      unique: false,
      allowNull: false,
      defaultValue: 0,
    },
    downVotes: {
      type: Sequelize.INTEGER,
      unique: false,
      allowNull: false,
      defaultValue: 0,
    },
  });

  // Sequelize associations
  LikePost.associate = (models) => {
    // is linked to
    LikePost.belongsTo(models.post, {
      foreignKey: "postId",
      as: "post",
    });
    LikePost.belongsTo(models.user, {
      foreignKey: "userId",
      as: "user",
    });
  };

  return LikePost;
};
