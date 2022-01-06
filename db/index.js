const { Sequelize } = require('sequelize')

module.exports = new Sequelize(process.env.NODE_ENV === 'production' ? process.env.JAWSDB_URL : 'mysql://root:ElsaRoseyButterScotch@localhost:3306/chatwallet_db')
