const PORTA = 8081
const express = require('express')

const bodyParser = require('body-parser')




// pegando a conexão do arquivo
const connection =  require('./database/database')
const pergunta = require('./database/Pergunta')
const resposta = require('./database/Resposta')

const app = express()

// Config

	// Body parser
	app.use(bodyParser.urlencoded({extended: true}))
	app.use(bodyParser.json())

	// EJS
	app.set('view engine', 'ejs')

	// Arquivo estáticos 
	app.use(express.static('public'))

	// Bando de dados para mysql 5.7
	connection.authenticate().then(() => {
		console.log('[SERVER]  Conexão com o Database estabelecida')
	}).catch((erro) => {
		console.log('[SERVER] - Erro de conexão com o Database' + erro)
	})

//Rotas
	//Rota principal
	app.get('/', (req, res) => {
		console.log('[SERVER] - Rota principal')

		console.log('[SERVER] - process: index - status: init')
		pergunta.findAll({raw: true}).then((perguntas) => {

			console.log(perguntas)
			console.log('[SERVER] - process: index - status: done')
			console.log('[SERVER] - view: index')
			res.render('index', {perguntas: perguntas})

		}).catch((erro) => {

		})
	})

	// Rota para fazer uma pergunta
	app.get('/ask', (req, res) => {
		console.log('[SERVER] - view: Ask ')
		res.render('ask')
	})

	// Rota para processamento do formulario ask
	app.post('/ask', (req, res) => {
		console.log('[SERVER] - process: Ask - status: init ')
		// metodo com o codigo sql para criar o dado na tabela
		pergunta.create({
			titulo: req.body.formTitulo,
			descricao: req.body.formDescricao
		}).then(() => {
			console.log('[SERVER] - process: Ask - status: done')
			res.redirect('/')
		}).catch((erro) => {
			console.log('[SERVER] - process: Ask - status: erro ')
			console.log(erro)

			alert('Um erro aconteceu! tente novamente  mais tarde')
			res.redirect('/Ask')
		})
	})

	app.get('/ask/:id', (req, res) => {
		console.log('[SERVER] - process: AskId - status: init')
		pergunta.findOne({where: {id: req.params.id}}).then((pergunt) => {

		console.log('[SERVER] - process: AskId - status: done')
		if (pergunta != undefined){
			
			console.log('[SERVER] - process: AskId.Resposta - status: init')
			resposta.findAll({where: {idPergunta: pergunt.id}}).then((respostas) => {
				console.log('[SERVER] - process: AskId.Resposta - status: done')
				console.log('[SERVER] - view: AskId')
				res.render('askVis', {pergunta: pergunt, respostas: respostas})
			}).catch((erro) => {
				console.log('[SERVER] - process: AskId.Resposta - status: erro')
				console.log(erro)
			})
		}
		else{
			console.log('[SERVER] - view: AskId - Not Found')
			res.redirect('/')
		}
		}).catch((erro) => 
		{
			console.log('[SERVER] - process: AskId - status: erro')
			console.log(erro)
		})
	})

	app.post('/ask/resposta/:id', (req, res) => {
		console.log('[SERVER] - process: Ask.resposta - status init')
		resposta.create({
			idPergunta: req.params.id,
			corpo: req.body.formResposta
		}).then(() => {

			console.log('[SERVER] - process: Ask.resposta - status done')
			var redirect = '/ask/' + req.params.id
			res.redirect(redirect)

		}).catch((erro) => {
			console.log('[SERVER] - process: Ask.resposta - status erro')
			console.log(erro)
		})
	})



app.listen(PORTA, () => {
	console.log('[SERVER] - Servidor on-line')
	console.log('[SERVER] - Porta: ' + PORTA)
})

// Model é o que representa a tabela do banco de dados
// Podemos criar a tabela do banco de dados através do model 


// Model.Pergunta
// Title
// Description

// Deploy = Digital Ocean
