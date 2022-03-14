const { Pool } = require('pg')
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    password: 'esadiz87',
    database: 'cursos',
    port: 5432,
})

const nuevoCurso = async(nombre, nivelTecnico, fechaInicio, duracion) => {
    const course = await pool.connect()
    fechaInicio.dateformat('dd-mm-yyyy')
    const query = {
        text: `INSERT INTO cursos (nombre, nivel, fecha, duracion) values ($1, $2, $3, $4) RETURNING *`,
        values: [nombre, nivelTecnico, fechaInicio, duracion],
    }
    try{
        const result = await course.query(query)
        return result.rows
    } catch(e) {
        return e
    }
}

const getCursos = async() => {
    const course = await pool.connect()
    try{
        const result = await course.query(`SELECT * FROM cursos`)
        return result.rows
    } catch(e) {
        return e
    }
}

const editCurso = async(id, nombre, nivelTecnico, fechaInicio, duracion) => {
    const course = await pool.connect()
    const query = {
        text: `UPDATE cursos SET nombre = $2, nivel = $3, fecha = $4, duracion = $5 WHERE id = $1 RETURNING *`,
        values: [id, nombre, nivelTecnico, fechaInicio, duracion],
    }
    try{
        const result = await course.query(query)
        return result.rows
    } catch(e) {
        return e
    }
}

const deleteCurso = async(id) => {
    const course = await pool.connect()
    const query = {
        text: `DELETE FROM cursos WHERE id = $1 RETURNING *`,
        values: [id],
    }
    try{
        const result = await course.query(query)
        return result.rows
    } catch(e) {
        return e
    }
}

module.exports = {
    nuevoCurso,
    getCursos,
    editCurso,
    deleteCurso,
}