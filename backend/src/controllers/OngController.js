const Ongs = require('../models/Ongs')

module.exports = {
    async index(request, response) {
        const ongs = await Ongs.findAll({ include: 'incidents'})
        return response.json(ongs)
    },

    async store(request, response) {
        const { name, email, whatsapp, city, uf } = request.body
        
        let ong = await Ongs.findOne({ where: { name } })

        if (!ong) {

            let id = name + "123"

            ong = await Ongs.create({ id, name, email, whatsapp, city, uf })
        }

        return response.json(ong)
    },

    async update(request, response) {
        const { id } = request.params;
        const { name, email, whatsapp, city, uf } = request.body

        await Ongs.update({
            name,
            email,
            whatsapp,
            city,
            uf,
        }, {
            where: {
                id
            }
        })

        let ong = await Ongs.findOne({ id })

        return response.json(ong)

    },
    async destroy(request, response) {
        const { id } = request.params
        //console.log(id);

        await Ongs.destroy({ where: { id } })

        return response.json()
    },
}