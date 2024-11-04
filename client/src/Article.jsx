import React from 'react';

const Article = ({ id, articleData, delArticle }) => {
    const { title, date, content, author } = articleData;

    // Formatea la fecha de manera legible
    const formatDate = (date) => {
        return `${date.substring(8, 10)}-${date.substring(5, 7)}-${date.substring(0, 4)}`; // Cambié el formato para ser más legible
    };

    // Maneja la eliminación del artículo
    const del = () => {
        delArticle(id);
    };

    return (
        <div className="col">
            <div className="card mx-auto mb-3">
                <div className="card-header">
                    <h3 className="card-title">{title}</h3>
                </div>
                <div className="card-body">
                    <p className="card-text text-start">{content}</p>
                </div>
                <ul className="list-group list-group-flush">
                    <li className="list-pub list-group-item" style={{ fontSize: 12 }}>
                        Publicado el: {formatDate(date)}
                    </li>
                    <li className="list-pub list-group-item" style={{ fontSize: 12 }}>
                        Autor: {author}
                    </li>
                </ul>
                <div className="card-footer">
                    <button type="button" className="btn btn-danger btn-sm" onClick={del}>
                        Eliminar
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Article;
