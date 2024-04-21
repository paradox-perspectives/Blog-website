import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Checkbox } from 'antd';

const apiUrl = process.env.REACT_APP_BACKEND_URL;

const ArticlesTable = () => {
    const [articles, setArticles] = useState([]);

    useEffect(() => {
        // Fetch articles from your API
        fetchArticles();
    }, []);

    const fetchArticles = async () => {
        try {
            const response = await axios.get(`${apiUrl}/articles`);
            setArticles(response.data.map(article => ({
                ...article,
                key: article._id, // Assuming each article has a unique _id
            })));
        } catch (error) {
            console.error('Error fetching articles:', error);
        }
    };

    const handlePublishChange = async (checked, articleId) => {
        try {
            await axios.put(`${apiUrl}/articles/${articleId}`, {
                canPublish: checked,
            });
            // Update the local state to reflect the change
            const updatedArticles = articles.map(article => {
                if (article._id === articleId) {
                    return { ...article, canPublish: checked };
                }
                return article;
            });
            setArticles(updatedArticles);
        } catch (error) {
            console.error('Error updating article publish status:', error);
        }
    };

    const columns = [
        {
            title: 'Publish',
            dataIndex: 'canPublish',
            key: 'canPublish',
            render: (text, record) => (
                <Checkbox
                    checked={record.canPublish}
                    onChange={e => handlePublishChange(e.target.checked, record._id)}
                />
            ),
        },
        {
            title: 'Article',
            dataIndex: 'title',
            key: 'title',
        },
    ];

    return <Table columns={columns} dataSource={articles} />;
};

export default ArticlesTable;
