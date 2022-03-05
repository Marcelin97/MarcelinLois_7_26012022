module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define("user", {
    firstName: {
      type: Sequelize.STRING,
      required: true,
    },
    lastName: {
      type: Sequelize.STRING,
      required: true,
    },
    username: {
      type: Sequelize.STRING,
      required: true,
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: true,
        isAlphanumeric: true,
        len: {
          args: [3, 25],
          msg: "The username needs to be between 3 and 25 characteres long",
        },
      },
    },
    email: {
      type: Sequelize.STRING(50),
      trim: true,
      required: true,
      unique: true,
      len: [1, 60],
      allowNull: false,
    },
    password: {
      type: Sequelize.STRING(255),
      allowNull: false,
      validate: {
        notEmpty: true,
      },
      validate: {
        isLongEnough: function (val) {
          if (val.length < 8) {
            throw new Error("Please choose a longer password");
          }
        },
      },
    },
    birthday: {
      // ex : "birthday": "1990-02-17" - "year-month-day"
      type: Sequelize.DATE,
      defaultValue: Sequelize.NOW,
    },
    imageUrl: {
      type: Sequelize.STRING,
      validate: {
        notEmpty: true,
      },
    },
    roles: {
      type: Sequelize.ENUM(["user", "admin"]),
      unique: false,
      defaultValue: "user",
    },
    // isAdmin: {
    //   type: Sequelize.BOOLEAN,
    //   unique: false,
    //   defaultValue: false,
    // },
  });

  // Sequelize associations
  User.associate = (models) => {
    User.hasMany(models.comment, {
      as: "comments",
    });
    User.hasMany(models.post, {
      as: "posts",
    });
    User.hasMany(models.moderator, {
      as: "moderators",
    });
    User.hasMany(models.likePost, {
      as: "likePosts",
    });
    User.hasMany(models.messagePrivate, {
      as: "messageFromUserId",
      foreignKey: "fromUserId",
    });
    User.hasMany(models.messagePrivate, {
      as: "messageToUserId",
      foreignKey: "toUserId",
    });
    User.hasMany(models.notification, {
      as: "notifications",
    });
    User.hasMany(models.userReport, {
      foreignKey: "userReportedId",
      as: "userReported",
    });
    User.hasMany(models.userReport, {
      foreignKey: "fromUserId",
      as: "userFrom",
    });
    User.hasMany(models.postReport, {
      as: "postReport",
    });
    User.hasMany(models.comment, {
      foreignKey: "commentId",
      as: "commentParent",
    });
    User.hasMany(models.comment, {
      as: "replies",
    });

    // Many to Many associations
    User.belongsToMany(models.community, { through: "followers" });
  };

  return User;
};
