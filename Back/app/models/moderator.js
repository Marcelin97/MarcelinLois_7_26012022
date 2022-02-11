module.exports = (sequelize, Sequelize) => {
  const Moderator = sequelize.define("moderator", {
    isAdmin: {
      type: Sequelize.BOOLEAN,
      unique: false,
      allowNull: false,
    },
  });

  // Sequelize associations
  Moderator.associate = (models) => {
    // is linked to
    Moderator.belongsTo(models.community);
    Moderator.belongsTo(models.user);
  };

  return Moderator;
};
