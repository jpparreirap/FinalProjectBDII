const express = require('express');
const routes = express.Router();

const UserController = require('./controllers/UserController');
routes.get('/user', UserController.index);
routes.get('/user/:id', UserController.show);
routes.post('/user', UserController.store);
routes.put('/user/:id', UserController.update);
routes.delete('/user/:id', UserController.destroy);

routes.post('/user_cart/:id/add_cart/:product', UserController.addCart);
routes.post('/user_cart/:id/rem_cart/:product', UserController.remCart);
routes.post('/user_cart/:id/rem_cart_all/:product', UserController.remCartAll);
routes.post('/finalizar_compra/:id', UserController.finalizarCompra);

const ProductController = require('./controllers/ProductController');
routes.get('/product', ProductController.index);
routes.get('/product/:id', ProductController.show);
routes.post('/product', ProductController.store);
routes.put('/product/:id', ProductController.update);
routes.delete('/product/:id', ProductController.destroy);

module.exports = routes;