const Pool = require('pg').Pool
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'postgres',
    password: '123456',
    port: 5432,
})

const getTimes = (request, response) => {
    pool.query('SELECT * FROM time', (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}

const getTimeById = (request, response) => {
    const id = parseInt(request.params.id)

    pool.query('SELECT * FROM time WHERE id_time = $1', [id], (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}

const createTime = (request, response) => {
    const { nome, descricao } = request.body

    pool.query('INSERT INTO time (nome) VALUES ($1)', [nome], (error, results) => {
        if (error) {
            throw error
        }
        response.status(201).send(`Time criado com o ID: ${result.insertId}`)
    })
}

const deleteTime = (request, response) => {
    const id = parseInt(request.params.id)

    pool.query('DELETE FROM time WHERE id_time = $1', [id], (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).send(`Temporada com o ID: ${id} deletada com sucesso`)
    })
}

module.exports = {
    getTimes,
    getTimeById,
    createTime,
    deleteTime
}