const { Sequelize } = require("sequelize");
const sequelize = new Sequelize("cadastro", "root", "151822", {
    dialect: "mysql",
    host: "localhost"
})
module.exports = sequelize