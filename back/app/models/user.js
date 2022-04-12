module.exports = (sequelize, Sequelize) => {
  // * Model Definition
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
      validate: {
        notNull: {
          msg: "Please enter your username",
        },
        is: {
          args: /^[a-z0-9]+$/i,
          msg: "Username can only contain numbers and letters",
        },
      },
      unique: true,
      validate: {
        notEmpty: true,
        len: {
          args: [3, 25],
          msg: "The username needs to be between 3 and 25 characteres long",
        },
      },
    },
    email: {
      type: Sequelize.STRING(),
      trim: true,
      required: true,
      unique: {
        args: true,
        msg: "The email address is already registered",
      },
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: "The email address is empty",
        },
        notEmpty: {
          args: true,
          msg: "The email address is empty",
        },
        len: {
          args: [5, 60],
          msg: "Email address must be between 5 and 60 characters",
        },
      },
    },
    password: {
      type: Sequelize.STRING(64),
      allowNull: false,
      validate: {
        notEmpty: true,
      },
      validate: {
        notNull: {
          args: true,
          msg: "Password is empty",
        },
        notEmpty: {
          args: true,
          msg: "Password is empty",
        },
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
      // ? ex : "birthday": "1990-02-17" - "year-month-day"
      type: Sequelize.DATE,
      defaultValue: Sequelize.NOW,
    },
    imageUrl: {
      type: Sequelize.STRING,
      validate: {
        notEmpty: true,
      },
    },
    isAdmin: {
      type: Sequelize.BOOLEAN,
      unique: false,
      defaultValue: false,
    },
  });

  // * Sequelize associations
  User.associate = (models) => {
    User.hasMany(models.comment, {
      as: "author",
      foreignKey: "postId"
    });
    User.hasMany(models.post, {
      as: "creator",
      foreignKey: "creatorId"
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
      as: "commentParent",
    });
    User.hasMany(models.commentReplies, {
      as: "replies",
    });
    User.hasMany(models.savePost, {
      as: "savePosts",
    });
    // User.hasMany(models.follower, {
    //   sourceKey: "userId",
    // });
  
    User.hasOne(models.refreshToken, {
      foreignKey: "userId",
      targetKey: "id",
    });

    // * Many to Many associations

    // ! One user can own 0 or many communities
    User.hasMany(models.community, { as: "communities" });

    // ! One user can join one or many communities
    User.belongsToMany(models.community, {
      through: "follower",
    });

    // ! One user can manage one or many communities
    User.belongsToMany(models.community, {
      through: "community_moderator",
      // foreignKey: "moderatorId", // replaces `userId`
      // otherKey: "communityId", // replaces `communityId`
    });
  };

  return User;
};
