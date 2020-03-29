const express = require('express');

const UserController = require('./controllers/UserController');
const BookController = require('./controllers/BookController');
const ProfileController = require('./controllers/ProfileController');
const SessionController = require('./controllers/SessionController');

const routes = express.Router();

routes.post('/sessions', SessionController.create);

routes.get('/users', UserController.index);
routes.post('/users', UserController.create);

routes.get('/profile', ProfileController.index);

routes.get('/books', BookController.index);
routes.post('/books', BookController.create);
routes.delete('/books/:id', BookController.delete);

module.exports = routes;