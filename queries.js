const Pool = require('pg').Pool
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'postgres',
    password: '123456',
    port: 5432,
})

const getContas = (request, response) => {
    pool.query('SELECT * FROM conta ORDER BY id_conta ASC', (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}

const getItens = (request, response) => {
    pool.query('SELECT * FROM item INNER JOIN mercador ON item.id_item = mercador.item_id WHERE temporada_id = 1;', (error, results) => {
        if (error) {
            throw error
        }
        pool.query('INSERT INTO Inventario (id_item, id_time, quantidade) VALUES (1, 1, 2);', (error, results) => {
            if (error) {
                throw error
            }
            response.status(200).json(results.rows)
        })
    })
}

const getTimeByNome = (request, response) => {
    const id = request.params.id

    pool.query('SELECT nome FROM time WHERE nome = $1', [id], (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}

const getContaByTime = (request, response) => {
    const time = request.params.time

    pool.query('SELECT * FROM conta WHERE conta.time_id = (SELECT id_time FROM time WHERE nome = $1)', [time], (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}

const createConta = (request, response) => {
    const { time } = request.body

    pool.query('INSERT INTO conta (time_id, trava, saldo) VALUES ($1, $2, $3)', [time, 0, 0], (error, results) => {
        if (error) {
            throw error
        }
        response.status(201).send(`Conta added with ID: ${results}`)
    })
}

const createTime = (request, response) => {
    const { nome } = request.body

    pool.query('INSERT INTO time (nome) VALUES ($1)', [nome], (error, results) => {
        if (error) {
            throw error
        }
        response.status(201).send(`Time added with ID: ${results}`)
    })
}

const updateConta = (request, response) => {
    const id_conta = parseInt(request.params.id)

    const { saldo, trava } = request.body

    if (trava) {
        throw "Conta travada"
    } else {
        pool.query(
            'UPDATE conta SET trava = $1 WHERE id_conta = $2',
            [true, id_conta],
            (error, results) => {
                if (error) {
                    throw error
                }
                pool.query(
                    'UPDATE conta SET saldo = $1 WHERE id_conta = $2',
                    [saldo, id_conta],
                    (error, results) => {
                        if (error) {
                            throw error
                        }
                        pool.query(
                            'UPDATE conta SET trava = $1 WHERE id_conta = $2',
                            [false, id_conta],
                            (error, results) => {
                                if (error) {
                                    throw error
                                }
                                response.status(200).send(`Conta destravada with ID: ${id_conta}`)
                            }
                        )
                    }
                )
            }
        )
    }

}

const deleteConta = (request, response) => {
    const id = parseInt(request.params.id)

    pool.query('DELETE FROM conta WHERE id = $1', [id], (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).send(`Conta deleted with ID: ${id}`)
    })
}

module.exports = {
    getContas,
    createConta,
    updateConta,
    deleteConta,
    createTime,
    getContaByTime,
    getTimeByNome,
    getItens
}