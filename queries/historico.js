const Pool = require('pg').Pool
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'postgres',
    password: '123456',
    port: 5432,
})


const getHistorico = (request, response) => {
    pool.query('SELECT * FROM historico ORDER BY conta_id', (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}

const getHistoricoByIdConta = (request, response) => {
    const id = parseInt(request.params.id)
  
    pool.query('SELECT * FROM historico WHERE conta_id = $1', [id], (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
  }
  
  const createHistorico = (request, response) => {
    const { saldo, trava, time_id } = request.body
  
    pool.query('INSERT INTO conta (data, tipo, valor, usuario_id, conta_id) VALUES ($1, $2, $3, $4, $5)', [saldo, trava, time_id], (error, results) => {
      if (error) {
        throw error
      }
      response.status(201).send(`Conta criada com o ID: ${result.insertId}`)
    })
  }
  
  module.exports = {
    getHistorico,
    getHistoricoByIdConta,
    createHistorico
  }