const express = require("express")
const { connectDB } = require("../database/query")
const cors = require("cors")
const bodyParser = require("body-parser")
const app = express()
const PORT = process.env.PORT || 8080
const router = require("./router")
app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(router)
connectDB() // para conectar ao banco de dados e criar a tabela.
app.listen(PORT, () => {
    console.log("Server Online")
})
