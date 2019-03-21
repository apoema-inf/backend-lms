const Pool = require('pg').Pool
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'postgres',
    password: '123456',
    port: 5432,
})

const getInventario = (request, response) => {
    pool.query('SELECT * FROM inventario', (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}


const getInventarioById = (request, response) => {
    const id = parseInt(request.params.id)

    pool.query('SELECT * FROM inventario WHERE id_inventario = $1', [id], (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}

const createInventario = (request, response) => {
    const { quantidade, item_id, time_id } = request.body

    pool.query('INSERT INTO inventario (quantidade, item_id, time_id) VALUES ($1, $2, $3)', [quantidade, item_id, time_id], (error, results) => {
        if (error) {
            throw error
        }
        response.status(201).send(`Inventário criado com o ID: ${result.insertId}`)
    })
}

const deleteInventario = (request, response) => {
    const id = parseInt(request.params.id)

    pool.query('DELETE FROM inventario WHERE id_inventario = $1', [id], (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).send(`Inventário com o ID: ${id} deletada com sucesso`)
    })
}

module.exports = {
    getInventario,
    getInventarioById,
    createInventario,
    deleteInventario
}