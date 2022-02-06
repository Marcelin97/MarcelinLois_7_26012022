module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define("user", {
    name: {
      type: Sequelize.STRING,
      required: true,
    },
    username: {
      type: Sequelize.STRING,
      required: true,
    },
    gender: {
      type: Sequelize.STRING,
      enum: ["MALE", "FEMALE", "UNSPECIFIED", "NULL"],
      default: "NULL"
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
    },
    avatarURL: {
      type: Sequelize.STRING(),
      default: `${process.env.ASSET_DIR}/blank-profile-picture-g3c1a4a1bf_1280.png`
    },
    isAdmin: {
    type: Sequelize.ENUM(['user', 'admin']),
    unique: false,
    defaultValue: 'user',
    },
  });
  return User;
};