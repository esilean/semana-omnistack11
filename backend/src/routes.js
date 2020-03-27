const { Router } = require('express')
const { celebrate, Segments, Joi } = require('celebrate')

const OngController = require('./controllers/OngController')
const IncidentController = require('./controllers/IncidentController')
const ProfileController = require('./controllers/ProfileController')
const SessionController = require('./controllers/SessionController')


const routes = Router()

routes.get('/', (request, response) => {
    return response.json({ message: 'GET: Hello from Arandelle' })
})

routes.post('/sessions', SessionController.store)

routes.get('/ongs', OngController.index)

routes.post('/ongs',
    celebrate({
        [Segments.BODY]: Joi.object().keys({
            name: Joi.string().required().max(7),
            email: Joi.string().required().email(),
            whatsapp: Joi.string().required().min(10).max(11),
            city: Joi.string().required(),
            uf: Joi.string().required().length(2)
        })
    }),
    OngController.store)



routes.delete('/ongs/:id', OngController.destroy)
routes.put('/ongs/:id', OngController.update)

routes.get('/incidents', IncidentController.index)
routes.post('/incidents/:ongId', IncidentController.store)
routes.delete('/incidents/:ongId/:id', IncidentController.destroy)
routes.put('/incidents/:ongId/:id', IncidentController.update)

routes.get('/incidents/:ongId',
    celebrate({
        [Segments.PARAMS]: Joi.object().keys({
            ongId: Joi.string().required(),
        }),
        [Segments.QUERY]: Joi.object().keys({
            page: Joi.number().required().min(1)
        })
    }),
    ProfileController.index)

module.exports = routes