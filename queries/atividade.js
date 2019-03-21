const Pool = require('pg').Pool
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'postgres',
  password: '123456',
  port: 5432,
})

const getAtividades = (request, response) => {
  pool.query('SELECT * FROM atividade', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const getAtividadeById = (request, response) => {
  const id = parseInt(request.params.id)

  pool.query('SELECT * FROM atividade WHERE id_atividade = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const createAtividade = (request, response) => {
  const { nome, tipo, missao_id } = request.body

  pool.query('INSERT INTO atividade (nome, tipo, missao_id) VALUES ($1, $2, $3)', [nome, tipo, missao_id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(201).send(`Atividade criada com o ID: ${result.insertId}`)
  })
}

const deleteAtividade = (request, response) => {
  const id = parseInt(request.params.id)

  pool.query('DELETE FROM atividade WHERE id_atividade = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).send(`Atividade com o ID: ${id} deletada com sucesso`)
  })
}

module.exports = {
  getAtividades,
  getAtividadeById,
  createAtividade,
  deleteAtividade
}