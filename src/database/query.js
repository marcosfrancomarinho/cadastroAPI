const { DataTypes, QueryTypes } = require("sequelize")
const sequelize = require("./config")
function createModelTableDB() {
    const users = sequelize.define("usuarios", {
        email: {
            type: DataTypes.STRING
        },
        password: {
            type: DataTypes.STRING
        }
    })
    return users
}
function insertDatasDB() {
    const users = createModelTableDB().create({
        email: this.email,
        password: this.password
    })
    return users
}
async function searchDatasDB(id = null) {
    if (id == null) {
        return await createModelTableDB().findAll({
            attributes: ["email", "password", "id"]
        })
    }
    return await createModelTableDB().findByPk(id, {
        attributes: ["email", "password", "id"]
    })
}
async function deleteDatasDB(ID) {
    await createModelTableDB().destroy({
        where: {
            id: ID
        }
    })
}
async function updateDatasDB() {
    await createModelTableDB().update({
        email: this.email,
        password: this.password
    },
        {
            where: {
                id: this.id
            }
        })
}
async function lastDataDB() {
    const data = await sequelize.query("SELECT email, password, id FROM usuarios ORDER BY id DESC LIMIT 1;", {
        type: QueryTypes.SELECT
    })
    return data
}
function connectDB() {
    sequelize.authenticate()
        .then(() => {
            createModelTableDB().sync()
            console.log("conecatdo ao banco de dados")
        })
        .catch(error => {
            throw error
        })
}

module.exports = { insertDatasDB, deleteDatasDB, updateDatasDB, searchDatasDB, lastDataDB, connectDB }