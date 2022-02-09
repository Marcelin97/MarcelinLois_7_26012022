module.exports = (sequelize, Sequelize) => {
  const Moderator = sequelize.define("moderator", {
    isAdmin: {
      type: Sequelize.BOOLEAN,
      unique: false,
      allowNull: false
    }
  });

  Moderator.associate = models => {
    Moderator.belongsTo(models.community);
    Moderator.belongsTo(models.user);
  };

  return Moderator;
};
