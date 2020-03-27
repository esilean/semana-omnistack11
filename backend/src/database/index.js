const Sequelize = require('sequelize')
const dbConfigProd = require('../config/database_prod')
const dbConfigTest = require('../config/database_test')

const dbConfig = process.env.NODE_ENV === 'test' ? dbConfigTest : dbConfigProd

const Ongs = require('../models/Ongs')
const Incidents = require('../models/Incidents')

const connection = new Sequelize(dbConfig)

Ongs.init(connection)
Incidents.init(connection)

Ongs.associate(connection.models)
Incidents.associate(connection.models)

module.exports = connection
