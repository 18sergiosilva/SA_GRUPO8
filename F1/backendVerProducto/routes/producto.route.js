const productoController = require('../controllers/producto.controller');

module.exports = (app) => {
    app.get('/producto', productoController.getAll);
    app.get('/producto/:id', productoController.getOne);
    app.get('/producto/editorial/:editorial',productoController.getbyEditorial);
    app.get('/producto/genero/:genero',productoController.getbyGenero);
}