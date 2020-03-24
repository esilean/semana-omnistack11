const Incidents = require('../models/Incidents')

module.exports = {
    async index(request, response) {
        let { page = 1 } = request.query
        if (page <= 0) page = 1

        const noIncidents = await Incidents.count()
        const incidents = await Incidents.findAll({ offset: ((page - 1) * 5), limit: 5, include: 'ong' })

        response.header('X-Total-Count', noIncidents)

        return response.json(incidents)
    },

    async store(request, response) {
        const { ongId } = request.params;
        const { title, description, value } = request.body

        incident = await Incidents.create({ title, description, value, ongId })

        return response.json(incident)
    },

    async update(request, response) {
        const { ongId, id } = request.params;
        const { title, description, value } = request.body

        await Incidents.update({
            title,
            description,
            value,
        }, {
            where: {
                id,
                ongId
            }
        });

        let incident = await Incidents.findOne({ id, ongId });

        return response.json(incident);

    },
    async destroy(request, response) {
        const { ongId, id } = request.params
        //console.log(id);

        const rows = await Incidents.destroy({ where: { id, ongId } })

        if (rows <= 0)
            return response.status(401).json({ error: 'Operation not found/not permitted.' })

        return response.json()
    },
}