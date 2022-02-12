module.exports = (sequelize, Sequelize) => {
  // Model Definition
  const PostReport = sequelize.define("postReport", {
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
    PostReport.associate = (models) => {
      // is linked to
      PostReport.belongsTo(models.user);
      PostReport.belongsTo(models.post);
      PostReport.belongsTo(models.community);
    };

  return PostReport;
};
