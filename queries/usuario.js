const Pool = require('pg').Pool
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'postgres',
    password: '123456',
    port: 5432,
})

const getUsuarios = (request, response) => {
    pool.query('SELECT * FROM usuario', (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}

const getUsuarioById = (request, response) => {
    const id = parseInt(request.params.id)

    pool.query('SELECT * FROM usuario WHERE id_usuario = $1', [id], (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}

const createUsuario = (request, response) => {
    const { nome, tipo, email, senha } = request.body

    pool.query('INSERT INTO usuario (nome, tipo, email, senha) VALUES ($1, $2, $3, $4)', [nome, tipo, email, senha], (error, results) => {
        if (error) {
            throw error
        }
        response.status(201).send(`Time criado com o ID: ${result.insertId}`)
    })
}

const deleteUsuario = (request, response) => {
    const id = parseInt(request.params.id)

    pool.query('DELETE FROM usuario WHERE id_usuario = $1', [id], (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).send(`Usuário com o ID: ${id} deletado com sucesso`)
    })
}

module.exports = {
    getUsuarios,
    getUsuarioById,
    createUsuario,
    deleteUsuario
}