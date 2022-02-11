module.exports = function (sequelize, Sequelize) {
  // Model Definition
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
    // isRead: {
    //   type: Sequelize.BOOLEAN,
    //   unique: false,
    //   allowNull: false,
    //   defaultValue: false,
    // },
  });

  // Sequelize associations
  Notification.associate = (models) => {
    // is linked to
    Notification.belongsTo(models.user, {
      foreignKey: "userId",
      as: "user",
    });
    Notification.belongsTo(models.post, {
      foreignKey: "postId",
      as: "post",
    });
    Notification.belongsTo(models.comment, {
      foreignKey: "commentId",
      as: "comment",
    });
    Notification.belongsTo(models.messagePrivate, {
      foreignKey: "fromUserId",
      as: "fromUser",
    });
    Notification.belongsTo(models.likeComment, {
      // foreignKey: "",
      as: "likeComment",
    });
    Notification.belongsTo(models.likePost, {
      // foreignKey: "",
      as: "likePost",
    });
  };

  return Notification;
};