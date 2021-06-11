const sequelize = require('sequelize')
const connection = require('./database')

const Resposta = connection.define('resposta', {
	idPergunta: {
		type: sequelize.INTEGER,
		allowNull: false
	},
	corpo:{
		type: sequelize.TEXT,
		allowNull: false
	}
})

// Faz a criação da tabela no banco de dados, e não força a criação
Resposta.sync({force: false}).then(() => {
	console.log('[SERVER] - model.Resposta: true')
}).catch((erro) => {
	console.log('[SERVER - model.Resposta: false] -> ' + erro)
})

module.exports = Resposta;


// Projeto Python

// 1 Passo separar a base (TOP 5000)
// 2 Fazer conexão com o banco de dados
// 3 Importar a base de dados 

// Boleto vigentee 

// Boleto
// Origem_Boleto = "OPERAÇÃO"

// Base =====================
//	Sorocaba
//