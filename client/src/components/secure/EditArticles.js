import React, { useEffect, useState } from 'react';
import ArticleCard2 from "../article/view/ArticleCard2";
import axios from "axios";

const apiUrl = process.env.REACT_APP_BACKEND_URL;

function EditArticles() {

    const [articles, setArticles] = useState([]);

    useEffect(() => {
        axios.get(`${apiUrl}/articles`)
            .then(response => {
                setArticles(response.data);
            })
            .catch(error => {
                console.error('Error fetching the themes', error);
            });

    }, []);

    return (
        <div>
            {articles.map((article, index) => (
                <div className="mb-6" key={index}>
                    <ArticleCard2 article={article} edit={true}/>
                </div>
            ))}
        </div>
    )
}

export default EditArticles;

