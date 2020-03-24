const Incidents = require('../models/Incidents')

module.exports = {
    async index(request, response) {

        const { ongId } = request.params;
        let { page = 1 } = request.query
        if (page <= 0)
            page = 1

        const noIncidents = await Incidents.count({ where: { ongId } })

        const incidents = await Incidents.findAll({ where: { ongId }, offset: ((page - 1) * 5), limit: 5, include: 'ong' })

        response.header('X-Total-Count', noIncidents)

        return response.json(incidents)
    },
}