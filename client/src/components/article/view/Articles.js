import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ArticleCard from "./ArticleCard";
import ArticleCard2 from "./ArticleCard2";
import bmc from "../../../bmc-button.png";
import { Select, Space } from 'antd';
import Search from "antd/es/input/Search";


function Articles() {
    const [articles, setArticles] = useState([]);
    const [themes, setThemes] = useState([]);
    const [selectedThemes, setSelectedThemes] = useState([]);
    const [searchKey, setSearchKey] = useState(0);


    const apiUrl = process.env.REACT_APP_BACKEND_URL;

    useEffect(() => {
        fetchArticles();

        axios.get(`${apiUrl}/themes/en`)
            .then(response => {
                setThemes(response.data.map(theme => ({ value: theme, label: theme }))); // Assuming each theme has an id and name
            })
            .catch(error => {
                console.error('Error fetching the themes', error);
            });

    }, []);

    const fetchArticles = (themes = [], searchTerm = '') => {
        let url = `${apiUrl}/articles`;
        console.log("fetch new articles")

        if (searchTerm) {
            url += `/searchTerm/${searchTerm}`; // Endpoint for searching by term
            console.log("searched term")
        } else if (themes.length > 0) {
            url += `/themes/${themes.join(',')}`; // Join themes for the URL
            console.log(
                "themes"
            )
        } else {
            url += "/published"
        }

        axios.get(url)
            .then(response => {
                const sortedArticles = response.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
                setArticles(sortedArticles);
            })
            .catch(error => {
                setArticles([]);
            });
    };


    const handleChange = (selectedThemes) => {
        setSelectedThemes(selectedThemes);
        setSearchKey(prevKey => prevKey + 1);
        fetchArticles(selectedThemes);
    };

    const onSearch = (searchTerm) => {
        setSelectedThemes([]); // Deselect any selected themes
        fetchArticles([], searchTerm); // Fetch articles based on the search term
    };


    return (
        <div className="flex flex-col justify-center md:flex-row items-start py-6 px-4 gap-8">
            <div className="flex flex-col w-full md:w-3/5 lg:w-3/5 max-w-2xl">

                {articles.map((article, index) => (
                    <div className="mb-6" key={index}>
                        <ArticleCard2 article={article} />
                    </div>
                ))}
            </div>
            <div className="w-full md:w-72 md:border-l-2 border-gray-300 pl-4 md:sticky top-0 md:text-right order-first md:order-last mb-6 md:mb-0">
                <Space direction={"vertical"} size={"middle"}>
                    <Search key={searchKey} placeholder="Search" onSearch={onSearch} style={{ width: 200 }} />
                    <Select
                        mode="multiple"
                        style={{ width: 200, textAlign: "left"}}
                        placeholder="Select topics"
                        onChange={handleChange}
                        options={themes}
                    />
                    <a href="https://buymeacoffee.com/romeovhl">
                        <img alt="buy me a coffee" className="block w-2/3 ml-auto mr-auto mt-10  md:ml-0 md:mr-0 md:w-auto md:mt-0" src={bmc}/>
                    </a>
                </Space>
            </div>
        </div>
    );

}

export default Articles;
