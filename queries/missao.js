const Pool = require('pg').Pool
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'postgres',
    password: '123456',
    port: 5432,
})

const getMissoes = (request, response) => {
    pool.query('SELECT * FROM missao', (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}

const getMissaoById = (request, response) => {
    const id = parseInt(request.params.id)

    pool.query('SELECT * FROM missao WHERE id_missao = $1', [id], (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}

const createMissao = (request, response) => {
    const { nome, descricao, temp_id } = request.body

    pool.query('INSERT INTO missao (nome, descricao, temp_id) VALUES ($1, $2, $3)', [nome, descricao, temp_id], (error, results) => {
        if (error) {
            throw error
        }
        response.status(201).send(`Mercador criado com o ID: ${result.insertId}`)
    })
}

const deleteMissao = (request, response) => {
    const id = parseInt(request.params.id)

    pool.query('DELETE FROM missao WHERE id_missao = $1', [id], (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).send(`Inventário com o ID: ${id} deletada com sucesso`)
    })
}

module.exports = {
    getMissoes,
    getMissaoById,
    createMissao,
    deleteMissao
}