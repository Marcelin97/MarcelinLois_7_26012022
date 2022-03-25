module.exports = function (sequelize, Sequelize) {
  // * Model Definition
  const CommunityModerator = sequelize.define("community_moderator", {
    isAdmin: {
      type: Sequelize.BOOLEAN,
      unique: false,
      defaultValue: false,
      allowNull: false,
    },
  });

  // * Sequelize associations
  CommunityModerator.associate = (models) => {
    // is linked to
    CommunityModerator.belongsTo(models.user);
    CommunityModerator.belongsTo(models.community);
  };

  // Return the CommunityModerator model
  return CommunityModerator;
};
