module.exports = function (sequelize, Sequelize) {
  // * Model Definition
  const Follower = sequelize.define("follower", {});

  // * Sequelize associations
    Follower.associate = function (models) {
      // is linked to
      Follower.belongsTo(models.user, {
        onDelete: "CASCADE",
      });
      Follower.belongsTo(models.community);
    };

  // Return the Follower model
  return Follower;
};
