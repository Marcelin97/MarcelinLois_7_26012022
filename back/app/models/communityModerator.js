module.exports = function (sequelize, Sequelize) {
  // * Model Definition
  const CommunityModerator = sequelize.define("community_moderator", {
    isModerator: {
      type: Sequelize.BOOLEAN,
      unique: false,
      defaultValue: false,
      allowNull: false,
    },
  });

  // * Sequelize associations
  CommunityModerator.associate = (models) => {
    // is linked to
    CommunityModerator.belongsTo(models.user, {
      onDelete: "CASCADE",
    });
    CommunityModerator.belongsTo(models.community, {
      onDelete: "CASCADE",
    });
  };

  // Return the CommunityModerator model
  return CommunityModerator;
};
