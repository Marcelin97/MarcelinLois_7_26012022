module.exports = (sequelize, Sequelize) => {
  // * Model Definition
  const LikeComment = sequelize.define("likeComment", {
    vote: {
      type: Sequelize.BOOLEAN,
      unique: false,
      allowNull: false,
    },
  });

  // * Sequelize associations
  LikeComment.associate = (models) => {
    // is linked to
    LikeComment.belongsTo(models.comment, {
      foreignKey: "commentId",
      as: "post",
    });
    LikeComment.belongsTo(models.user, {
      foreignKey: "userId",
      as: "user",
    });
  };

  return LikeComment;
};
