
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define("user", {
    name: {
      type: DataTypes.STRING,
      required: true,
    },
    username: {
      type: DataTypes.STRING,
      required: true,
    },
    gender: {
      type: DataTypes.STRING,
      enum: ["MALE", "FEMALE", "UNSPECIFIED", "NULL"],
      default: "NULL"
    },
    email: {
      type: DataTypes.STRING(50),
      trim: true,
      unique: true,
    },
    password: {
      type: DataTypes.STRING(),
    },
    birthday: {
      type: DataTypes.DATE,
    },
    avatarURL: {
      type: DataTypes.STRING(),
      default: `${process.env.ASSET_DIR}/blank-profile-picture-g3c1a4a1bf_1280.png`
    },
    isAdmin: {
    type: DataTypes.ENUM(['user', 'admin']),
    unique: false,
    defaultValue: 'user',
    },
  });
  return User;
};