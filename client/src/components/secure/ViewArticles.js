import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ArticleCard2 from "../article/view/ArticleCard2";


function ViewArticles() {
    const [articles, setArticles] = useState([]);

    const apiUrl = process.env.REACT_APP_BACKEND_URL;

    useEffect(() => {
        fetchArticles();
    }, []);

    const fetchArticles = (themes = [], searchTerm = '') => {
        const url = `${apiUrl}/articles`;

        axios.get(url)
            .then(response => {
                setArticles(response.data);
                console.log("articles",  articles)
            })
            .catch(error => {
                setArticles([]);
            });
    };


    return (
        <div className="flex justify-center items-start py-6 px-4 gap-8">
            <div className="flex flex-col w-full max-w-2xl">
                {/* Make the title sticky */}
                {articles.map((article, index) => (
                    <div className="mb-6" key={index}>
                        <ArticleCard2 article={article} viewAll={true}/>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ViewArticles;
