require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
const {seed, getDoorForm, createDoorForm, deleteForm} = require('./controller.js')
const path = require('path')
const PORT = process.env.port || 5000

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


app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
  })