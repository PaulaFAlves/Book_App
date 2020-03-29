const connection = require('../database/connection');

module.exports = {
    async index(request, response) {
        const { page = 1} = request.query;

        const [count] = await connection('books')
            .count();

        const books = await connection('books')
            .join('users', 'user_id', '=', 'books.user_id')
            .limit(5)
            .offset((page - 1) * 5)
            .select([
                'books.*', 
                'users.name', 
                'users.email', 
                'users.whatsapp'
            ]);


            
        response.header('X-Total-Count', count['count(*)'])


        return response.json(books);
    },

    async create(request, response) {
        const { title, summary } = request.body;
        const user_id = request.headers.authorization;

        const [id] = await connection('books').insert({
            title,
            summary,
            user_id,
        });
        return response.json({ id });
    },

    async delete(request, response) {
        const { id } = request.params;
        const user_id = request.headers.authorization;

        const book = await connection('books')
            .where('id', id)
            .select('user_id')
            .first();

            if ( book.user_id !== user_id ) {
                return response.status(401).json({ error: 'Operation not permitted.'})
            }

            await connection('books').where('id', id).delete();

            return response.status(204).send();

        }
}