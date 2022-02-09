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
    },
    email: {
      type: Sequelize.STRING(50),
      trim: true,
      unique: true,
    },
    password: {
      type: Sequelize.STRING(),
    },
    birthday: {
      type: Sequelize.DATE,
      defaultValue: Sequelize.NOW,
    },
    avatarURL: {
      type: Sequelize.STRING(),
      default: `${process.env.ASSET_DIR}/blank-profile-picture-g3c1a4a1bf_1280.png`,
    },
    roles: {
      type: Sequelize.ENUM(["user", "admin"]),
      unique: false,
      defaultValue: "user",
    },
  });

  User.associate = (models) => {
    User.hasMany(models.comment, {
      as: "comments",
    });
    User.hasMany(models.post, {
      as: "posts",
    });
    User.belongsTo(models.community, {
      // through:"community_user"
      foreignKey: "communityId",
      as: "community",
    });
  };

  return User;
};
