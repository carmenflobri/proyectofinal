// Myprofile.jsx
import { useState, useEffect } from "react";
import './Myprofile.css'
import { Link } from "react-router-dom";


const Myprofile = () => {
    const [articles, setArticles] = useState([]);
    const [selectedArticle, setSelectedArticle] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [author, setAuthor] = useState("");

    // Fetch all articles on component load
    const fetchArticles = async () => {
        try {
            const response = await fetch("http://localhost:3006/articles");
            if (response.ok) {
                const data = await response.json();
                setArticles(data.articles);
            } else {
                console.error("Error al obtener los artículos");
            }
        } catch (error) {
            console.error("Error de conexión:", error);
        }
    };

    useEffect(() => {
        fetchArticles();
    }, []);

    // Select an article to view details
    const viewArticle = (article) => {
        setSelectedArticle(article);
    };

    // Open edit form for selected article
    const editArticle = (article) => {
        setIsEditing(true);
        setSelectedArticle(article);
        setTitle(article.title);
        setContent(article.content);
        setAuthor(article.author);
    };

    // Handle update article
    const updateArticle = async () => {
        try {
            const response = await fetch(`http://localhost:3006/articles/update/${selectedArticle._id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ title, content, author })
            });
            
            if (response.ok) {
                const data = await response.json();
                console.log("Artículo actualizado exitosamente");
    
                // Actualizar el artículo en la lista de artículos sin hacer otra petición GET
                setArticles((prevArticles) => 
                    prevArticles.map((article) => 
                        article._id === data.article._id ? data.article : article
                    )
                );
    
                // Cerrar el formulario de edición
                setIsEditing(false);
                setSelectedArticle(null);
            } else {
                console.error("Error al actualizar el artículo");
            }
        } catch (error) {
            console.error("Error de conexión:", error);
        }
    };
    

    // Delete an article
    const deleteArticle = async (id) => {
        try {
            const response = await fetch(`http://localhost:3006/articles/delete/${id}`, {
                method: "DELETE",
            });
            if (response.ok) {
                console.log("Artículo eliminado exitosamente");
                fetchArticles(); // Refresh articles list
            } else {
                console.error("Error al eliminar el artículo");
            }
        } catch (error) {
            console.error("Error de conexión:", error);
        }
    };

    return (
            <div className="profile-container">
                <h2>Mis Artículos</h2>
                <div className="articles-list">
                    {articles.length ? (
                        articles.map((article) => (
                            <div className="article-card" key={article._id}>
                                <h3 className="article-title">{article.title}</h3>
                                <p className="article-author">Autor: {article.author}</p>
                                <p className="article-content">{article.content.substring(0, 150)}...</p>
                                <div className="card-actions">
                                    <button onClick={() => viewArticle(article)}>Ver</button>
                                    <button onClick={() => editArticle(article)}>Editar</button>
                                    <button onClick={() => deleteArticle(article._id)}>Eliminar</button>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p>No hay artículos disponibles</p>
                    )}
                </div>
        
                {/* Modal para ver detalles del artículo */}
                {selectedArticle && !isEditing && (
                    <div className="modal">
                        <h3>{selectedArticle.title}</h3>
                        <p>{selectedArticle.content}</p>
                        <p><small>Autor: {selectedArticle.author}</small></p>
                        <button onClick={() => setSelectedArticle(null)}>Cerrar</button>
                    </div>
                )}
        
                {/* Modal para editar un artículo */}
                {isEditing && (
                    <div className="modal">
                        <h3>Editar Artículo</h3>
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="Título"
                        />
                        <textarea
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            placeholder="Contenido"
                        />
                        <input
                            type="text"
                            value={author}
                            onChange={(e) => setAuthor(e.target.value)}
                            placeholder="Autor"
                        />
                        <button onClick={updateArticle}>Guardar Cambios</button>
                        <button onClick={() => setIsEditing(false)}>Cancelar</button>
                    </div>
                )}
                <Link to="/new" className="create">
                Crear artículo
                </Link>
                <Link to="/login" className="logout-button">
            Salir
        </Link>
            </div>
        );
        
};

export default Myprofile;
