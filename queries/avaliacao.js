const Pool = require('pg').Pool
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'postgres',
  password: '123456',
  port: 5432,
})

const getAvaliacoes = (request, response) => {
  pool.query('SELECT * FROM avaliacao', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const getAvaliacaoById = (request, response) => {
  const id = parseInt(request.params.id)

  pool.query('SELECT * FROM atividade WHERE id_avaliacao = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const createAvaliacao = (request, response) => {
  const { atividade_id, feedback, pontuacao, data, avaliado_id, avaliador_id } = request.body

  pool.query('INSERT INTO avaliacao (atividade_id, feedback, pontuacao, data, avaliado_id, avaliador_id) VALUES ($1, $2, $3, $4, $5, $6)', 
        [atividade_id, feedback, pontuacao, data, avaliado_id, avaliador_id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(201).send(`Avaliacao criada com o ID: ${result.insertId}`)
  })
}

const deleteAvaliacao = (request, response) => {
  const id = parseInt(request.params.id)

  pool.query('DELETE FROM avaliacao WHERE id_avaliacao = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).send(`Avaliação com o ID: ${id} deletada com sucesso`)
  })
}

module.exports = {
  getAvaliacoes,
  getAvaliacaoById,
  createAvaliacao,
  deleteAvaliacao
}