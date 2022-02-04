const Sequelize = require("sequelize");
require("dotenv").config();

let host = process.env.MYSQL_HOST || "localhost";
let database = process.env.MYSQL_DATABASE || "groupomania";
let username = process.env.MYSQL_USERNAME || "root";
let password = process.env.MYSQL_PASSWORD;
let port = process.env.MYSQL_PORT || 3306;

const sequelize = new Sequelize(database, username, password, {
    host: host,
    port: port,
  dialect: "mysql",
});

try {
    (async() => {
        await sequelize.authenticate();
    })().catch(err => {
       console.log(err)
    })
    console.log('connection has established')
} catch (error) {
        console.log('Unable to connect', error)
}