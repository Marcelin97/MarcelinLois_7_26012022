module.exports = (sequelize, Sequelize) => {
  // * Model Definition
  const Comment = sequelize.define("comment", {
    content: {
      type: Sequelize.TEXT,
      unique: false,
      required: false,
      default: "",
      allowNull: false,
      validate: {
        len: [1, 1000],
      },
    },
    likes: {
      type: Sequelize.INTEGER,
      unique: false,
      allowNull: false,
      defaultValue: 0,
      validate: {
        min: 0,
      },
    },
  });

  // * Sequelize associations
  Comment.associate = (models) => {
    // is linked to
    Comment.belongsTo(models.user, {
      // foreignKey: "userId",
      as: "users",
    });
    Comment.belongsTo(models.post, {
      // foreignKey: "postId",
      as: "posts",
    });
    // Reply a comment
    Comment.hasMany(models.commentReplies, {
      as: "commentReplies",
      foreignKey: "commentId",
      targetKey: "id",
    });

    // Like a comment
    Comment.hasMany(models.likeComment, {
      as: "likeComments",
    });
  };

  return Comment;
};
