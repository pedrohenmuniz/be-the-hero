const request = require('supertest');
const app = require('../../src/app.js');
const  connection = require('../../src/database/connection.js');

describe('ONG', () => {
    beforeEach(async () => {
        await connection.migrate.rollback();
        await connection.migrate.latest();
    });

    afterAll(async () => {
        await connection.destroy();
    });

    it('should be able to create a new ONG', async () => {
        const response = await request(app).post('/ongs').send({
            name: "ABPA",
            email: "contato@abpa.com.br",
            whatsapp: "553233334444",
            city: "Barbacena",
            uf: "MG"
        });

        expect(response.body).toHaveProperty('id');
        expect(response.body.id).toHaveLength(8);

    });
});