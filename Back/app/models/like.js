module.exports = (sequelize, Sequelize) => {
  const Like = sequelize.define("like", {
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

  Like.associate = (models) => {
      Like.belongsTo(models.post, {
        foreignKey: "postId",
        as: "post",
      });
    Like.belongsTo(models.user, {
      foreignKey: "userId",
      as: "user",
    });
  };

  return Like;
};
