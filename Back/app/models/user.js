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
      validate: {
        len: {
          args: [3, 25],
          msg: "The username needs to be between 3 and 25 characteres long",
        },
      },
    },
    email: {
      type: Sequelize.STRING(50),
      trim: true,
      unique: true,
      len: [5, 60],
      allowNull: false,
      validate: {
        isEmail: { args: true, msg: "Please enter a valid email addresss" },
      },
      isEmail: true,
    },
    password: {
      type: Sequelize.STRING(255),
      allowNull: false,
      validate: {
        isLongEnough: function (val) {
          if (val.length < 8) {
            throw new Error("Please choose a longer password");
          }
        },
      },
    },
    birthday: {
      type: Sequelize.DATE,
      defaultValue: Sequelize.NOW,
    },
    avatarURL: {
      type: Sequelize.STRING(),
      default: `${process.env.ASSET_DIR}/blank-profile-picture-g3c1a4a1bf_1280.png`,
    },
    imageUrn: Sequelize.STRING,
    imageUrl: {
      type: Sequelize.VIRTUAL,
      get() {
        return this.imageUrn
          ? `${process.env.APP_URL}/images/profiles/${this.imageUrn}`
          : "https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y";
      },
    },
    roles: {
      type: Sequelize.ENUM(["user", "admin"]),
      unique: false,
      defaultValue: "user",
    },
  });

  // Sequelize associations
  User.associate = models => {
    User.hasMany(models.comment, {
      as: "comments"
    });
    User.hasMany(models.post, {
      as: "posts"
    });
    User.hasMany(models.moderator, {
      as: "moderators"
    });
    // User.belongsTo(models.community, {
    //   foreignKey: "communityId",
    //   as: "community",
    // });
    User.hasMany(models.likePost, {
      as: "likePosts"
    });
    User.hasMany(models.messagePrivate, {
      foreignKey: "fromUserId"
    });
    User.hasMany(models.messagePrivate, {
      foreignKey: "toUserId"
    });
    User.hasMany(models.userReport, {
      foreignKey: "UserReportedId",
      as: "UserReported",
    });
    User.hasMany(models.userReport, {
      foreignKey: "FromUserId",
      as: "User",
    });

    // Many to Many associations
    User.belongsToMany(models.community, { through: "Community_users" });
    User.belongsToMany(models.community, { through: "followers" });
  };

  return User;
};
