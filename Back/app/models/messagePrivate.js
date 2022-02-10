module.exports = (sequelize, Sequelize) => {
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
    });

  MessagePrivate.associate = (models) => {
    MessagePrivate.belongsTo(models.user, {
      foreignKey: "fromUserId",
      as: "fromUser",
    });
    MessagePrivate.belongsTo(models.user, {
      foreignKey: "toUserId",
      as: "toUser",
    });
  };

  return MessagePrivate;
};
