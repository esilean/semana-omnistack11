const Sequelize = require('sequelize')
const dbConfig = require('../config/database')

const Ongs = require('../models/Ongs')
const Incidents = require('../models/Incidents')

const connection = new Sequelize(dbConfig)

Ongs.init(connection)
Incidents.init(connection)

Ongs.associate(connection.models)
Incidents.associate(connection.models)

module.exports = connection
