const Pool = require('pg').Pool
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'postgres',
    password: '123456',
    port: 5432,
})

const getAvaliadores = (request, response) => {
    pool.query('SELECT * FROM avaliador', (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}

const getAvaliadorById = (request, response) => {
    const id = parseInt(request.params.id)
  
    pool.query('SELECT * FROM avaliador WHERE id_avaliador = $1', [id], (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
  }
  
  const createAvaliador = (request, response) => {
    const { jogador, avaliado } = request.body
  
    pool.query('INSERT INTO avaliador (jogador, avaliado) VALUES ($1, $2)', [jogador, avaliado], (error, results) => {
      if (error) {
        throw error
      }
      response.status(201).send(`Avaliador criado com o ID: ${result.insertId}`)
    })
  }
  
  const deleteAvaliador = (request, response) => {
    const id = parseInt(request.params.id)
  
    pool.query('DELETE FROM avaliador WHERE id_avaliador = $1', [id], (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).send(`Avaliador com o ID: ${id} deletado com sucesso`)
    })
  }
  
  module.exports = {
    getAvaliadores,
    getAvaliadorById,
    createAvaliador,
    deleteAvaliador
  }