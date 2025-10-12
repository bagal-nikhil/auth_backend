const express = require('express')
const app = express()
const login = require("./routes/login/handler")

app.use(express.json());

app.use("/login", login)

app.get('/', (req, res) => {
    res.send("working the applicatio eninfnn")
})
const PORT = 3000;

app.listen(PORT, () => {
    console.log(`listening on ${PORT}`)
})