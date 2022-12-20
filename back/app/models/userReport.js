module.exports = (sequelize, Sequelize) => {
  // * Model Definition
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

  // * Sequelize associations
  UserReport.associate = (models) => {
    // is linked to
    UserReport.belongsTo(models.user, {
      foreignKey: "userReportedId",
      as: "userReported",
      onDelete: "CASCADE",
    });
    UserReport.belongsTo(models.user, {
      foreignKey: "fromUserId",
      as: "userFrom",
      onDelete: "CASCADE",
    });
  };

  return UserReport;
};
