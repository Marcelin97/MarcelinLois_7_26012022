module.exports = (sequelize, Sequelize) => {
  //* Model Definition
  const Post = sequelize.define("post", {
    title: {
      type: Sequelize.STRING,
      unique: false,
      allowNull: false, //? THIS COLUMN CANNOT BE EMPTY
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
    isRead: {
      type: Sequelize.BOOLEAN,
      unique: false,
      allowNull: false,
      defaultValue: false,
    },
  });

  //* Sequelize associations
  Post.associate = (models) => {
    // is linked to
    Post.belongsTo(models.user, {
      foreignKey: "userId",
      as: "user",
    });
    Post.hasMany(models.comment, {
      as: "comments",
    });
    Post.hasMany(models.likePost, {
      as: "likePosts",
    });
  };

  return Post;
};
