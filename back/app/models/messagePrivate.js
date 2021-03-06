module.exports = (sequelize, Sequelize) => {
  // * Model Definition
  const MessagePrivate = sequelize.define("messagePrivate", {
    content: {
      type: Sequelize.TEXT,
      unique: false,
      required: false,
      default: "",
      allowNull: false,
      validate: {
        len: [1, 1000],
      },
    },
    isRead: {
      type: Sequelize.BOOLEAN,
      unique: false,
      allowNull: false,
      defaultValue: false,
    },
  });

  // * Sequelize associations
  MessagePrivate.associate = (models) => {
    // is linked to
    MessagePrivate.belongsTo(models.user, {
      foreignKey: "fromUserId",
      as: "messageFromUserId",
    });
    MessagePrivate.belongsTo(models.user, {
      foreignKey: "toUserId",
      as: "messageToUserId",
    });
  };

  return MessagePrivate;
};
