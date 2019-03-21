const Pool = require('pg').Pool
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'postgres',
    password: '123456',
    port: 5432,
})

const getAvaliados = (request, response) => {
    pool.query('SELECT * FROM avaliado', (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}

const getAvaliadoById = (request, response) => {
    const id = parseInt(request.params.id)
  
    pool.query('SELECT * FROM avaliado WHERE id_avaliado = $1', [id], (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
  }
  
  const createAvaliado = (request, response) => {
    const { jogador, avaliado } = request.body
  
    pool.query('INSERT INTO avaliado (jogador, avaliado) VALUES ($1, $2)', [jogador, avaliado], (error, results) => {
      if (error) {
        throw error
      }
      response.status(201).send(`Avaliado criado com o ID: ${result.insertId}`)
    })
  }
  
  const deleteAvaliado = (request, response) => {
    const id = parseInt(request.params.id)
  
    pool.query('DELETE FROM avaliado WHERE id_avaliado = $1', [id], (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).send(`Avaliado com o ID: ${id} deletado com sucesso`)
    })
  }
  
  module.exports = {
    getAvaliados,
    getAvaliadoById,
    createAvaliado,
    deleteAvaliado
  }