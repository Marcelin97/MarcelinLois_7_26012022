module.exports = (sequelize, Sequelize) => {
  //* Model Definition
  const CommentReport = sequelize.define("commentReport", {
    content: {
      type: Sequelize.TEXT,
      unique: false,
      allowNull: false,
      validate: {
        len: [5, 255],
      },
    },
  });

  //* Sequelize associations
  CommentReport.associate = (models) => {
    // is linked to
    CommentReport.belongsTo(models.user);
    CommentReport.belongsTo(models.comment);
  };

  return CommentReport;
};
