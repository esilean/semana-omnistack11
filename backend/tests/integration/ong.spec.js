const request = require('supertest')
const app = require('../../src/app')

describe('ONG', () => {

    beforeAll(function () {
    })

    afterAll(function () {
    })

    it('should be able to create a new ONG', async () => {
        const response = await request(app).post('/ongs').send({
            name: "APAD2",
            email: "le.bevilaqua@gmail.com",
            whatsapp: "11989462727",
            city: "Guarulhos1",
            uf: "SP"
        })

        expect(response.body).toHaveProperty('id')
        expect(response.body.id).toHaveLength(8)

    })
})