const Pool = require('pg').Pool
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'postgres',
  password: '123456',
  port: 5432,
})

const getItens = (request, response) => {
  pool.query('SELECT * FROM item', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const getItemById = (request, response) => {
  const id = parseInt(request.params.id)

  pool.query('SELECT * FROM item WHERE id_item = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const createItem = (request, response) => {
  const { nome, descricao, preco } = request.body

  pool.query('INSERT INTO item (nome, descricao, preco) VALUES ($1, $2, $3)', [nome, descricao, preco], (error, results) => {
    if (error) {
      throw error
    }
    response.status(201).send(`Item criado com o ID: ${result.insertId}`)
  })
}

const deleteItem = (request, response) => {
  const id = parseInt(request.params.id)

  pool.query('DELETE FROM item WHERE id_item = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).send(`Item com o ID: ${id} deletada com sucesso`)
  })
}

module.exports = {
  getItens,
  getItemById,
  createItem,
  deleteItem
}