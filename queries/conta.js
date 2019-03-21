const Pool = require('pg').Pool
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'postgres',
    password: '123456',
    port: 5432,
})


const getContas = (request, response) => {
    pool.query('SELECT * FROM conta', (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}

const getContaById = (request, response) => {
    const id = parseInt(request.params.id)
  
    pool.query('SELECT * FROM conta WHERE id_conta = $1', [id], (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
  }
  
  const createConta = (request, response) => {
    const { saldo, trava, time_id } = request.body
  
    pool.query('INSERT INTO conta (saldo, trava, time_id) VALUES ($1, $2, $3)', [saldo, trava, time_id], (error, results) => {
      if (error) {
        throw error
      }
      response.status(201).send(`Conta criada com o ID: ${result.insertId}`)
    })
  }
  
  const deleteConta = (request, response) => {
    const id = parseInt(request.params.id)
  
    pool.query('DELETE FROM conta WHERE id_conta = $1', [id], (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).send(`Conta com o ID: ${id} deletado com sucesso`)
    })
  }
  
  module.exports = {
    getContas,
    getContaById,
    createConta,
    deleteConta
  }