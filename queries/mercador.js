const Pool = require('pg').Pool
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'postgres',
    password: '123456',
    port: 5432,
})

const getMercadores = (request, response) => {
    pool.query('SELECT * FROM mercador', (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}

const getMercadorByTemporadaId = (request, response) => {
    const id = parseInt(request.params.id)

    pool.query('SELECT * FROM mercador WHERE temporada_id = $1', [id], (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}

const createMercador = (request, response) => {
    const { item_id, temporada_id } = request.body

    pool.query('INSERT INTO mercador (item_id, temporada_id) VALUES ($1, $2)', [item_id, temporada_id], (error, results) => {
        if (error) {
            throw error
        }
        response.status(201).send(`Mercador criado com o ID: ${result.insertId}`)
    })
}

module.exports = {
    getMercadores,
    getMercadorByTemporadaId,
    createMercador
}