const express = require('express')
const app = express()
const bodyParser = require('body-parser')

app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.listen(3000, () => {
    console.log('Server ON')
})

const { nuevoCurso, getCursos, editCurso, deleteCurso } = require('./consultas')

app.post('/curso', async(req, res) => {
    const { nombre, nivelTecnico, fechaInicio, duracion } = req.body
    const respuesta = await nuevoCurso(nombre, nivelTecnico, fechaInicio, duracion)
    res.send(respuesta)
})

app.get('/cursos', async(req, res) => {
    const respuesta = await getCursos()
    res.send(respuesta)
})

app.put('/curso', async(req, res) => {
    const { id, nombre, nivelTecnico, fechaInicio, duracion } = req.body
    const respuesta = await editCurso(id, nombre, nivelTecnico, fechaInicio, duracion)
    res.send(respuesta)
})

app.delete('/curso/:id', async(req, res) => {
    const { id } = req.params
    const respuesta = await deleteCurso(id)
    res.send(respuesta)
})