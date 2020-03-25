const Ongs = require('../models/Ongs')

module.exports = {
    async store(request, response) {
        const { id } = request.body

        let ong = await Ongs.findOne({ where: { id } })

        if (!ong) {
            return response.status(404).json({ error: 'Not found.'})
        }

        return response.json(ong)
    },
}