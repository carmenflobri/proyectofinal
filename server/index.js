require('dotenv').config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const EmployeeModel = require("./models/Employee");
const ArticleModel = require("./models/Article");

const app = express();
app.use(express.json());
app.use(cors());

// Middleware para configurar la Content Security Policy
app.use((req, res, next) => {
    res.setHeader("Content-Security-Policy", "default-src 'self'; script-src 'self' https://vercel.live; style-src 'self' 'unsafe-inline';");
    next();
});

// Conectar a MongoDB solo una vez para ambas colecciones
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('Conectado a MongoDB Atlas'))
.catch((error) => console.error('Error conectando a MongoDB Atlas:', error));

// Rutas para empleados
app.post("/login", (req, res) => {
    const { email, password } = req.body;
    EmployeeModel.findOne({ email: email })
        .then(user => {
            if (user) {
                if (user.password === password) {
                    res.json("success");
                } else {
                    res.json("Lo siento, la contraseña es incorrecta");
                }
            } else {
                res.json("No existe el registro");
            }
        })
        .catch(err => res.status(500).json({ error: err.message }));
});

app.post('/register', (req, res) => {
    EmployeeModel.create(req.body)
        .then(employee => res.json(employee))
        .catch(err => res.status(500).json({ error: err.message }));
});

// Rutas para artículos
app.post('/articles/save', async (req, res) => {
    try {
        const newArticle = new ArticleModel(req.body);
        const savedArticle = await newArticle.save();
        res.status(201).json(savedArticle);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.get('/articles', async (req, res) => {
    try {
        const articles = await ArticleModel.find({}).sort('-date').exec();
        if (!articles.length) {
            return res.status(404).send({
                status: 'error',
                message: 'No hay artículos para mostrar.'
            });
        }
        return res.status(200).send({
            status: 'success',
            articles
        });
    } catch (error) {
        return res.status(500).send({
            status: 'error',
            message: 'Error al recuperar los datos.'
        });
    }
});

app.put('/articles/update/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { title, content, author } = req.body;

        const updatedArticle = await ArticleModel.findByIdAndUpdate(
            id,
            { title, content, author },
            { new: true }
        );
        
        if (updatedArticle) {
            res.json({ message: "Artículo actualizado exitosamente", article: updatedArticle });
        } else {
            res.status(404).json({ message: "Artículo no encontrado" });
        }
    } catch (error) {
        res.status(500).json({ message: "Error al actualizar el artículo", error });
    }
});

app.delete('/articles/delete/:id', async (req, res) => {
    try {
        const articleId = req.params.id;
        const articleRemoved = await ArticleModel.findOneAndDelete({ _id: articleId });
        if (!articleRemoved) {
            return res.status(404).send({
                status: 'error',
                message: 'No se encontró el artículo a eliminar.'
            });
        }
        return res.status(200).send({
            status: 'success',
            article: articleRemoved
        });
    } catch (error) {
        return res.status(500).send({
            status: 'error',
            message: 'Error al eliminar el artículo.'
        });
    }
});

const PORT = process.env.PORT || 3006;

app.listen(PORT, () => {
  console.log(`El servidor está corriendo en el puerto ${PORT}`);
});
