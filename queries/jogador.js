const Pool = require('pg').Pool
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'postgres',
  password: '123456',
  port: 5432,
})

const getJogadores = (request, response) => {
  pool.query('SELECT * FROM jogador', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const getJogadorById = (request, response) => {
  const id = parseInt(request.params.id)

  pool.query('SELECT * FROM jogador WHERE id_jogador = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const createJogador = (request, response) => {
  const { curso, pontuacao, time_id } = request.body

  pool.query('INSERT INTO jogador (curso, pontuacao, time_id) VALUES ($1, $2, $3)', [curso, pontuacao, time_id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(201).send(`Jogador criado com o ID: ${result.insertId}`)
  })
}

const deleteJogador = (request, response) => {
  const id = parseInt(request.params.id)

  pool.query('DELETE FROM item WHERE id_jogador = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).send(`Jogador com o ID: ${id} deletado com sucesso`)
  })
}

module.exports = {
  getJogadores,
  getJogadorById,
  createJogador,
  deleteJogador
}