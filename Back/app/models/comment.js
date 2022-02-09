module.exports = (sequelize, Sequelize) => {
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
        len: [20, 5000],
      },
    },
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
    comments: {
      type: Sequelize.INTEGER,
      unique: false,
      allowNull: false,
      defaultValue: 0,
    },
  });

  Comment.associate = (models) => {
    Comment.belongsTo(models.user, {
      foreignKey: "userId",
      as: "user",
    });
    Comment.belongsTo(models.post, {
      foreignKey: "postId",
      as: "post",
    });
    Comment.hasMany(models.comment, {
      as: "reply",
    });
  };

  return Comment;
};
