module.exports = function (sequelize, Sequelize) {
  //* Model Definition
  const Notification = sequelize.define("notification", {
    userId: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    title: {
      type: Sequelize.STRING(255),
    },
    content: {
      type: Sequelize.TEXT,
      unique: false,
      allowNull: false,
    },
    status: {
      type: Sequelize.ENUM,
      allowNull: false,
      values: ["read", "unread"],
    },
    link: {
      type: Sequelize.STRING,
      unique: false,
      allowNull: false,
    },
  });

  //* Sequelize associations
  Notification.associate = (models) => {
    // is linked to
    Notification.belongsTo(models.user, {
      foreignKey: "userId",
      as: "user",
    });
  };

  return Notification;
};
