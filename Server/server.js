require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
const {SERVER_PORT} = process.env
const {seed, getDoorForm, createDoorForm, deleteForm} = require('./controller.js')
const path = require('path')

app.use(express.json())
app.use(cors())

app.use(express.static(path.join(__dirname, "./Client")));
app.use('/styles', express.static(path.join(__dirname, "./Client/index.css")));
app.use('/js', express.static(path.join(__dirname, "./Client/index.js")));


app.post('/seed', seed)


app.post('/door_form', createDoorForm)
app.get('/door_form', getDoorForm)
app.delete('/door_form/:id', deleteForm)
// app.put(`/api/door_form/:id`, updateForm)


app.listen(SERVER_PORT, () => console.log(`up on ${SERVER_PORT}`))