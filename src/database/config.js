require("dotenv").config({ path: __dirname + "/.env" })
const { Sequelize } = require("sequelize")
const sequelize = new Sequelize({
    database: process.env.DATABASE,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    dialect:"postgres"
})

module.exports = sequelize