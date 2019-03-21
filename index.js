const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = 3000
const cors = require('cors');
const db = require('./queries/queries')

//Colocar novas queries abaixo
const conta = require("./queries/conta")
const atividade = require("./queries/conta")
const avaliacao = require("./queries/avaliacao")
const avaliado = require("./queries/avaliado")
const avaliador = require("./queries/avaliador")
const historico = require("./queries/historico")
const inventario = require("./queries/inventario")
const item = require("./queries/item")
const jogador = require("./queries/jogador")
const mercador = require("./queries/mercador")
const missao = require("./queries/missao")
const time = require("./queries/time")
const usuario = require("./queries/usuario")

//Middleware for CORS
app.use(cors());

app.use(bodyParser.json())
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
)

app.get('/', (request, response) => {
    response.json({ info: 'Node.js, Express, and Postgres API' })
})

app.get('/conta', db.getContas)
app.get('/mercador', db.getItens)
app.get('/conta/:time', db.getContaByTime)
app.post('/conta', db.createConta)
app.post('/inventario', db.setInventario)
app.post('/extrato', db.setExtrato)
app.post('/time', db.createTime)
app.get('/time/:id', db.getTimeByNome)
app.put('/conta/:id', db.updateConta)
app.delete('/conta/:id', db.deleteConta)

//Tabela conta
app.get('/conta', conta.getContas)
app.get('/conta/:id', conta.getContaById)
app.post('/conta', conta.createConta)
app.delete('/conta/:id', conta.deleteConta)

//Tabela atividade
app.get('/atividade', atividade.getAtividades)
app.get('/atividade/:id', atividade.getContaById)
app.post('/atividade', atividade.createAtividade)
app.delete('/atividade/:id', atividade.deleteConta)

//Tabela Avaliação
app.get('/avaliacao', avaliacao.getAvaliacoes)
app.get('/avaliacao/:id', avaliacao.getAvaliacaoById)
app.post('/avaliacao', avaliacao.createAvaliacao)
app.delete('/avaliacao/:id', avaliacao.deleteAvaliacao)

//Tabela Avaliado
app.get('/avaliado', avaliado.getAvaliados)
app.get('/avaliado/:id', avaliado.getAvaliadoById)
app.post('/avaliado', avaliado.createAvaliado)
app.delete('/avaliado/:id', avaliado.deleteAvaliado)

//Tabela Avaliador
app.get('/avaliador', avaliador.getAvaliadores)
app.get('/avaliador/:id', avaliador.getAvaliadorById)
app.post('/avaliador', avaliador.createAvaliador)
app.delete('/avaliador/:id', avaliador.deleteAvaliador)

//Tabela Histórico
app.get('/historico', historico.getHistorico)
app.get('/historico/:id', historico.getHistoricoByIdConta)
app.post('/historico', historico.createHistorico)

//Tabela Inventário
app.get('/inventario', inventario.getInventario)
app.get('/inventario/:id', inventario.getInventarioById)
app.post('/inventario', inventario.createInventario)
app.delete('/inventario/:id', inventario.deleteInventario)

//Tabela Item
app.get('/item', item.getItens)
app.get('/item/:id', item.getItemById)
app.post('/item', item.createItem)
app.delete('/item/:id', item.deleteItem)

//Tabela Jogador
app.get('/jogador', jogador.getJogadores)
app.get('/jogador/:id', jogador.getJogadorById)
app.post('/jogador', jogador.createJogador)
app.delete('/jogador/:id', jogador.deleteJogador)

//Tabela Mercador
app.get('/mercador', mercador.getMercadores)
app.get('/mercador/:id', mercador.getMercadorByTemporadaId)
app.post('/mercador', mercador.createMercador)

//Tabela Missão
app.get('/missao', missao.getMissoes)
app.get('/missao/:id', missao.getMissaoById)
app.post('/missao', missao.createMissao)
app.delete('/missao/:id', missao.deleteMissao)

//Tabela Time
app.get('/time', time.getTimes)
app.get('/time/:id', time.getTimeById)
app.post('/time', time.createTime)
app.delete('/time/:id', time.deleteTime)

//Tabela Usuário
app.get('/usuario', usuario.getUsuarios)
app.get('/usuario/:id', usuario.getUsuarioById)
app.post('/usuario', usuario.createUsuario)
app.delete('/usuario/:id', usuario.deleteUsuario)

app.listen(port, () => {
    console.log(`App running on port ${port}.`)
})