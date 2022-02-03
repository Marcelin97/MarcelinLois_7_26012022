const Sequelize = require("sequelize");

let host = process.env.MYSQL_HOST || "localhost";
let database = process.env.MYSQL_DATABASE || "groupomania";
let username = process.env.MYSQL_USERNAME || "root";
let password = process.env.MYSQL_PASSWORD || "";
let port = process.env.MYSQL_PORT || 3306;

const sequelize = new Sequelize(database, username, password, {
  host: host,
  dialect: dbConfig.dialect,
  operatorsAliases: false,

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
});