module.exports = (sequelize, Sequelize) => {
  // Model Definition
  const UserReport = sequelize.define("userReport", {
    content: {
      type: Sequelize.TEXT,
      unique: false,
      allowNull: false,
      validate: {
        len: [5, 255],
      },
    },
  });

  // Sequelize associations
    UserReport.associate = (models) => {
      // is linked to
      UserReport.belongsTo(models.user, {
        foreignKey: "UserReportedId",
        as: "UserReported",
      });
      UserReport.belongsTo(models.user, {
        foreignKey: "FromUserId",
        as: "User",
      });
      UserReport.belongsTo(models.community);
    };

  return UserReport;
};
