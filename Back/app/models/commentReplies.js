module.exports = (sequelize, Sequelize) => {
  //* Model Definition
  const CommentReplies = sequelize.define("commentReplies", {
    replyBody: {
      type: Sequelize.TEXT,
      unique: false,
      required: false,
      default: "",
      allowNull: false,
      validate: {
        len: [1, 1000],
      },
    },
  });

  //* Sequelize associations
  CommentReplies.associate = (models) => {
    // is linked to
    CommentReplies.belongsTo(models.user, {
      foreignKey: "userId",
      as: "author",
    });
    CommentReplies.belongsTo(models.post, {
      foreignKey: "postId",
      targetKey: "id",
    });
    CommentReplies.belongsTo(models.comment, {
      as: "commentReplies",
      foreignKey: "commentId",
      targetKey: "id",
    });
  };

  return CommentReplies;
};
