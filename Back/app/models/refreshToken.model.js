// const config = require("../config/auth.config");
require("dotenv").config();

//* use uuid library for creating a random token
const { v4: uuidv4 } = require("uuid");

module.exports = (sequelize, Sequelize) => {
  //* Model Definition
  const RefreshToken = sequelize.define("refreshToken", {
    token: {
      type: Sequelize.STRING,
    },
    expiryDate: {
      type: Sequelize.DATE,
    },
  });

  RefreshToken.createToken = async function (user) {
    let expiredAt = new Date();
    expiredAt.setSeconds(
      expiredAt.getSeconds() + process.env.JWTRefreshExpirationTest // 4 minutes
    );

    let _token = uuidv4();
    let refreshToken = await this.create({
      token: _token,
      userId: user.id,
      expiryDate: expiredAt.getTime(),
    });
    return refreshToken.token;
  };
  RefreshToken.verifyExpiration = (token) => {
    return token.expiryDate.getTime() < new Date().getTime();
  };

  //* Sequelize associations
  RefreshToken.associate = (models) => {
    RefreshToken.belongsTo(models.user, {
      foreignKey: "userId",
      targetKey: "id",
    });
  };

  return RefreshToken;
};
