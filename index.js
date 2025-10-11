const express = require('express')
const app =  express()

app.use(express.json());

app.get('/', (req, res) => {
    res.send("working the applicatio eninfnn")
})
const PORT = 3000;

app.listen(PORT, () => {
    console.log(`listening on ${PORT}`)
})