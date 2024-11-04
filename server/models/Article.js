const mongoose = require('mongoose');

const ArticleSchema = new mongoose.Schema({
    title: { type: String, required: true },
    date: { type: Date, default: Date.now },
    content: { type: String, required: true },
    author: { type: String, required: true }
});

// Cambiado el nombre del modelo a "Article" en lugar de "myprofile"
const ArticleModel = mongoose.model("Article", ArticleSchema);

module.exports = ArticleModel;
