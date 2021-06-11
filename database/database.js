// Requerindo  o modulo do sequeliza
const sequelize = require('sequelize')

// Constante de conexão
const connection = new sequelize('askapp', 'root', 'root', {
	host: 'localhost',
	dialect: 'mysql'
})

// Exportando a conexão para utilizar em outros arquivos
module.exports = connection;