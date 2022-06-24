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
      foreignKey: "userId",
      as: "author",
    });
    Comment.belongsTo(models.post, {
      foreignKey: "postId",
      as: "post",
    });
    // Reply a comment
    Comment.hasMany(models.commentReplies, {
      as: "commentReplies",
      foreignKey: "commentId",
      targetKey: "id",
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });

    // Like a comment
    Comment.hasMany(models.likeComment, {
      as: "likeComment",
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });
  };

  return Comment;
};
