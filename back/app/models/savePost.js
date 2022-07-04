module.exports = (sequelize, Sequelize) => {
  // * Model Definition
  const SavePost = sequelize.define("savePost", {
    save: {
      type: Sequelize.BOOLEAN,
      unique: false,
      defaultValue: false,
    },
  });

  // * Sequelize associations
  SavePost.associate = (models) => {
    // is linked to
    SavePost.belongsTo(models.user, {
      foreignKey: "userId",
      as: "users",
    });
    SavePost.belongsTo(models.post, {
      foreignKey: "postId",
      as: "savePosts",
    });
  };

  return SavePost;
};
