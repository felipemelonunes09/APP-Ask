// Arquivos de model geralmente são maisculos
const sequelize = require('sequelize')
const connection = require('./database')

// Função para definir o model  
// Primeiro paramentro é o nome
// Segundo parametro é o json para definir o model
const Pergunta = connection.define('pergunta', {
	titulo: {
		type: sequelize.STRING,
		allowNull: false
	},
	descricao: {
		type: sequelize.TEXT,
		allowNull: false
	}
});

// Para de fato criar e sincronicar no banco de dados
Pergunta.sync({force: false}).then(() => {
	console.log('[SERVER] - model.Pergunta: true')
}).catch((erro) => {
	console.log('[SERVER] - model.Pergunta: false -> ' + erro)
})

module.exports = Pergunta;

// Só isso sera necessário para criar a tabele e sincronizar com o banco de dados em mysql