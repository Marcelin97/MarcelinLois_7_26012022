module.exports = function (sequelize, Sequelize) {
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

  // Reference Definition
  UserReport.associate = (models) => {
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

  // Return the UserReport model
  return UserReport;
};
