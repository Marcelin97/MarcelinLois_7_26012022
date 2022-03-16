module.exports = (sequelize, Sequelize) => {
  //* Model Definition
  const Community = sequelize.define(
    "community",
    {
      userId: {
        type: Sequelize.INTEGER,
      },

      title: {
        type: Sequelize.STRING,
        required: true,
        unique: {
          args: true,
          msg: "Title must be unique",
        },
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
        require: true,
      },
      isActive: {
        type: Sequelize.BOOLEAN,
        defaultValue: true,
      },
    },
    { tableName: "community" }
  );

  //* Sequelize associations
  Community.associate = (models) => {
    Community.hasMany(models.post, {
      as: "posts",
    });
   
    // One community is owned by one user
    Community.belongsTo(models.user, { foreignKey: "userId", as: "owner" });

    //* One community can be joined by 0 or many users
    Community.belongsToMany(models.user, { through: "users_community" });
  };

  return Community;
};
