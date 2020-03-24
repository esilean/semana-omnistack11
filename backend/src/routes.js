const { Router } = require('express')

const OngController = require('./controllers/OngController')
const IncidentController = require('./controllers/IncidentController')
const ProfileController = require('./controllers/ProfileController')
const SessionController = require('./controllers/SessionController')


const routes = Router()

routes.get('/', (request, response) => {
    return response.json({ message: 'GET: Hello from Arandelle' })
})

routes.post('/sessions/:id', SessionController.store)

routes.get('/ongs', OngController.index)
routes.post('/ongs', OngController.store)
routes.delete('/ongs/:id', OngController.destroy)
routes.put('/ongs/:id', OngController.update)

routes.get('/incidents', IncidentController.index)
routes.post('/incidents/:ongId', IncidentController.store)
routes.delete('/incidents/:ongId/:id', IncidentController.destroy)
routes.put('/incidents/:ongId/:id', IncidentController.update)

routes.get('/incidents/:ongId', ProfileController.index)

module.exports = routes