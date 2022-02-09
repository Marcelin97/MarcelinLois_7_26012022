module.exports = (sequelize, Sequelize) => {
  const Post = sequelize.define("post", {
    title: {
      type: Sequelize.STRING,
      unique: false,
      allowNull: false,
      validate: {
        len: [5, 255],
      },
    },
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
  });

  Post.associate = (models) => {
    Post.belongsTo(models.user, {
      foreignKey: "userId",
      as: "user",
    });
    Post.hasMany(models.comment, {
      as: "comments",
    });
  };

  return Post;
};
