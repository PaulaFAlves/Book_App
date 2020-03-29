const connection = require('../database/connection');
const crypto = require('crypto');

module.exports = {
    async index(request, response) {
        const users = await connection('users').select('*');
        return response.json(users);
    },

    async create(request, response) {
        const { name, email, whatsapp } = request.body;

        const id = crypto.randomBytes(2).toString('hex');

        await connection('users').insert({
            id, 
            name,
            email,
            whatsapp,
        })

        return response.json({ id });
        }
    };
