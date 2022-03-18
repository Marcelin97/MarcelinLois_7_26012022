module.exports = (sequelize, Sequelize) => {
  //* Model Definition
  const Comment = sequelize.define("comment", {
    imageUrl: {
      type: Sequelize.STRING,
      required: false,
      default: "",
    },
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
  });

  //* Sequelize associations
  Comment.associate = (models) => {
    // is linked to
    Comment.belongsTo(models.user, {
      foreignKey: "userId",
      as: "user",
    });
    Comment.belongsTo(models.post, {
      foreignKey: "postId",
      as: "post",
    });

    // boucle commentaire d'un commentaire
    Comment.belongsTo(models.comment, {
      foreignKey: "commentId",
      as: "commentParent",
    });
    Comment.hasMany(models.comment, {
      as: "reply",
    });

    // like a comment
    Comment.hasMany(models.likeComment, {
      as: "likeComment",
    });
  };

  return Comment;
};
