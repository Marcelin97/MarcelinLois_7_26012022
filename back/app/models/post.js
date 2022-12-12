module.exports = (sequelize, Sequelize) => {
  // * Model Definition
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
    },
    content: {
      type: Sequelize.TEXT,
      unique: false,
      required: false,
      trim: true,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: "Content is empty",
        },
        notEmpty: {
          args: true,
          msg: "Content is empty",
        },
        len: {
          args: [2, 400],
          msg: "The content must contain between 2 and 400 characters",
        },
      },
    },
    commentsCount: {
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
  Post.associate = (models) => {
    // is linked to
    Post.belongsTo(models.user, {
      as: "user",
      foreignKey: "creatorId",
      onDelete: "CASCADE",
    });
    Post.belongsTo(models.community, {
      as: "community",
      foreignKey: "communityId",
    });
    Post.hasMany(models.comment, {
      as: "comments",
      
    });
    Post.hasMany(models.likePost, {
      as: "likePosts",
      foreignKey: "postId",
    });
    Post.hasMany(models.savePost, {
      as: "savePosts",
      foreignKey: "postId",
    });
  };

  return Post;
};
