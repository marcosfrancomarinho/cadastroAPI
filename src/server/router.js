const express = require("express")
const {
    insertDatasDB,
    searchDatasDB,
    deleteDatasDB,
    updateDatasDB,
    lastDataDB
} = require("../database/query")
const router = express.Router()

router.get("/", async (req, res) => {
    if (Object.keys(req.body).length === 0) {
        const datas = await searchDatasDB()
        res.status(200).type("json").send(datas)
        return
    }
    const data = await searchDatasDB(req.body.id)
    res.status(200).type("json").send(data)
})
router.post("/", async (req, res) => {
    if (Object.keys(req.body).length === 0) {
        res.status(400).type("json").send({
            error: "A requisição está vazia",
            content: null
        })
        return
    }
    if (req.body.hasOwnProperty("email") && req.body.hasOwnProperty("password")) {
        if (await checkUsers(req.body.email)) {
            res.status(400).type("json").send({
                error: "Usuário já esta cadastrado.",
                userRegister: true
            })
            return
        }
        if (req.body.email.length > 0 && req.body.password.length > 0) {
            await insertDatasDB.bind({
                email: (req.body.email).toString().trim(),
                password: (req.body.password).toString().trim()
            })()
            const lastRegisteredData = await lastDataDB()
            res.status(200).type("json").send(lastRegisteredData)
            return
        }
    }
    res.status(400).type("json").send({
        error: "A requisição incompleta, informe email e password.",
        contentRight: false
    })
    return
})
router.delete("/", async (req, res) => {
    const deletedData = await searchDatasDB(req.body.id)
    if (Object.keys(req.body).length === 0 || !req.body.hasOwnProperty("id")) {
        res.status(400).type("json").send({
            error: "A requisição está vazia, informe o id",
            id: null
        })
        return
    }
    if (deletedData === null) {
        res.status(404).type("json").send({
            error: "Id não encontrado",
            id: null
        })
        return
    }
    await deleteDatasDB(req.body.id)
    res.send(deletedData)
})
router.put("/", async (req, res) => {
    const data = await searchDatasDB(req.body.id)
    if (Object.keys(req.body).length === 0 || !req.body.hasOwnProperty("id")) {
        res.status(400).type("json").send({
            error: "A requisição está vazia, informe o id",
            id: null
        })
        return
    }
    if (data === null) {
        res.status(404).type("json").send({
            error: "Id não encontrado",
            id: null
        })
        return
    }
    const changedData = {
        email: req.body.email === undefined ? data.email : req.body.email.toString().trim(),
        password: req.body.password === undefined ? data.password : req.body.password.toString().trim(),
        id: data.id
    }
    await updateDatasDB.bind({ ...changedData })()
    res.send(changedData)
})
async function checkUsers(email) {
    const data = await searchDatasDB()
    const response = data.filter(user => user.email === email.trim())
    return response.length > 0 ? true : false
} 
module.exports = router 