const Sequelize = require("sequelize");
require("dotenv").config();
const bunyan = require("bunyan");

const log = bunyan.createLogger({
  name: "MySQL Driver",
  streams: [
    {
      stream: process.stdout,
      level: "info"
    },
    {
      stream: process.stdout,
      level: "debug"
    },
    {
      stream: process.stderr,
      level: "error"
    },
    {
      type: "rotating-file",
      path: "./logs/MySQL.log",
      period: "1d", // daily rotation
      count: 3 // keep 3 back copies
    }
  ]
});

let host = process.env.MYSQL_HOST || "localhost";
let database = process.env.MYSQL_DATABASE || "groupomania";
let username = process.env.MYSQL_USERNAME || "root";
let password = process.env.MYSQL_PASSWORD;
let port = process.env.MYSQL_PORT || 3306;

const sequelize = new Sequelize(database, username, password, {
  host: host,
  port: port,
  dialect: "mysql",
  logging: log.debug.bind(log) // Alternative way to use custom logger, displays all messages
});

try {
  (async () => {
    await sequelize.authenticate();
  })().catch(err => {
    console.log(err);
  });
  console.log("connection has established");
} catch (error) {
  console.log("Unable to connect", error);
}
