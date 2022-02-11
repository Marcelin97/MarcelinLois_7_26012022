module.exports = (sequelize, Sequelize) => {
  const Community = sequelize.define("community", {
    title: {
      type: Sequelize.STRING,
      required: true,
      allowNull: false,
      validate: {
        len: [3, 255],
      },
    },
    about: {
      type: Sequelize.TEXT,
      unique: false,
    },
    icon: {
      type: Sequelize.STRING,
      unique: false,
    },
    active: {
      type: Sequelize.BOOLEAN,
      require: false,
      default: true,
    },
  });

  // Sequelize associations
  Community.associate = (models) => {
    Community.hasMany(models.post, {
      as: "posts",
    });
    Community.hasMany(models.user, {
      as: "users",
    });
    Community.hasOne(models.moderator, {
      as: "moderators",
    });

    // Many to Many associations
    Community.belongsToMany(models.user, { through: "Community_users" });
    Community.belongsToMany(models.user, { through: "followers" });
  };

  return Community;
};
