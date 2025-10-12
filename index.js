const express = require('express')
const app = express()
const login = require("./routes/login/handler.js")
const signup = require("./routes/signup/handler.js")
const db = require("./database/index.js")
const PORT = 3000;

app.use(express.json());

app.use("/auth/signup", signup);
app.use("/auth/login", login);

app.get('/', (req, res) => {
    res.send("working the applicatio eninfnn")
})

app.listen(PORT, () => {
    console.log(`listening on ${PORT}`)
})