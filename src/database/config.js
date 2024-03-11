const { Sequelize } = require("sequelize");
const sequelize = new Sequelize("cadastro", "ncxxvppq", "aUTbpSPkeE3izNG33hjrm8E8mw4aaiyh", {
    dialect: "mysql",
    host: "postgres://ncxxvppq:aUTbpSPkeE3izNG33hjrm8E8mw4aaiyh@kesavan.db.elephantsql.com/ncxxvppq",
})
module.exports = sequelize