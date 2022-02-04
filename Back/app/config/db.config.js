// require("dotenv").config();
// const bunyan = require("bunyan");

// const log = bunyan.createLogger({
//   name: "MySQL Driver",
//   streams: [
//     {
//       stream: process.stdout,
//       level: "info"
//     },
//     {
//       stream: process.stdout,
//       level: "debug"
//     },
//     {
//       stream: process.stderr,
//       level: "error"
//     },
//     {
//       type: "rotating-file",
//       path: "./logs/MySQL.log",
//       period: "1d", // daily rotation
//       count: 3 // keep 3 back copies
//     }
//   ]
// });


// const sequelize = new Sequelize(database, username, password, {
//   host: host,
//   port: port,
//   dialect: "mysql",
//   logging: log.debug.bind(log) // Alternative way to use custom logger, displays all messages
// });

module.exports = {
  HOST: process.env.MYSQL_HOST || "localhost",
  USER: process.env.MYSQL_USERNAME || "root",
  PASSWORD: process.env.MYSQL_PASSWORD || "",
  DB: process.env.MYSQL_DATABASE || "groupomania",
  dialect: "mysql",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
};