module.exports = (sequelize, Sequelize) => {
  // * Model Definition
  const CommunityReport = sequelize.define("communityReport", {
    content: {
      type: Sequelize.TEXT,
      unique: false,
      allowNull: false,
      validate: {
        len: [5, 255],
      },
    },
  });

  // * Sequelize associations
  CommunityReport.associate = (models) => {
    // is linked to
    CommunityReport.belongsTo(models.user, {
      onDelete: "CASCADE",
    });
    CommunityReport.belongsTo(models.community, {
      onDelete: "CASCADE",
    });
  };

  return CommunityReport;
};
