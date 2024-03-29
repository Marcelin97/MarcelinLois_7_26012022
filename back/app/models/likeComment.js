module.exports = (sequelize, Sequelize) => {
  // * Model Definition
  const LikeComment = sequelize.define("likeComment", {
    vote: {
      type: Sequelize.INTEGER,
      allowNull: true 
    },
  });

  // * Sequelize associations
  LikeComment.associate = (models) => {
    // is linked to
    LikeComment.belongsTo(models.comment, {
      foreignKey: "commentId",
      as: "comments",
      onDelete: "CASCADE",
    });
    LikeComment.belongsTo(models.user, {
      foreignKey: "userId",
      as: "users",
      onDelete: "CASCADE",
    });
  };

  return LikeComment;
};
