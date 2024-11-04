const express = require('express');
const ArticleController = require('../controllers/article'); // Cambia a la ruta correcta de tu controlador

// Llamamos al objeto router de express
const router = express.Router();

// Rutas para los artículos
router.post('/save', ArticleController.save); // Ruta para guardar un artículo
router.get('/', ArticleController.getArticles); // Ruta para obtener artículos
router.delete('/delete/:id', ArticleController.delete); // Ruta para eliminar un artículo

module.exports = router;
