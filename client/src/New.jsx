import { useState } from "react";
import { Link } from "react-router-dom";
import './New.css'; // Importar el CSS

const New = () => {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [author, setAuthor] = useState("");

    const saveArticle = async () => {
        try {
            const response = await fetch("http://localhost:3006/articles/save", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    title: title,
                    content: content,
                    author: author
                })
            });
            
            if (response.ok) {
                console.log("Artículo guardado exitosamente");
                // Puedes limpiar los campos o redirigir al usuario aquí
                setTitle("");
                setContent("");
                setAuthor("");
            } else {
                console.error("Error al guardar el artículo");
            }
        } catch (error) {
            console.error("Error de conexión:", error);
        }
    };

    return (
        <div className="new-container">
            <div className="new-form">
                <h2 className="new-title">Crear Nuevo Artículo</h2>
                <input
                    type="text"
                    placeholder="Título"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="form-input"
                />
                <textarea
                    placeholder="Contenido"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    className="form-textarea"
                />
                <input
                    type="text"
                    placeholder="Autor"
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                    className="form-input"
                />
                <button onClick={saveArticle} className="btn-save">
                    Guardar Artículo
                </button>
                <Link to="/myprofile" className="link">
                    Mis artículos
                </Link>
            </div>
        </div>
    );
};

export default New;
