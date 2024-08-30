import React, {useEffect, useState} from 'react';
import { useParams } from 'react-router-dom';
import axios from "axios";
import { Divider, Space, Typography } from 'antd';
import { Navigate, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';


const { Title, Paragraph, Text } = Typography;



function Article({ hide = true, id = null }) {
    const [article, setArticle] = useState({})
    const [articleFound, setArticleFound] = useState(null);
    const { temp } = useParams();

    let urlId = ""
    if (id != null) {
        urlId = id
    } else {
        urlId = temp
    }
    const apiUrl = process.env.REACT_APP_BACKEND_URL;
    console.log("urlid", urlId)

    useEffect(() => {
        if (urlId) {
            // Fetch the article data and populate the form
            axios.get(`${apiUrl}/articles/${urlId}`)
                .then(response => {
                    setArticle(response.data);
                    setArticleFound(true);
                })
                .catch(error => {
                    console.error('Error fetching article:', error);
                    setArticleFound(false);
                });
        }
    }, [urlId]);
    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    if (articleFound === false ) {
        return <Navigate to="/not-found" replace />;
    }

    if (hide && article.canPublish === false ){
        return <Navigate to="/not-found" replace />;
    }

    const getImageClassName = (src) => {
        const img = new Image();
        img.src = src;

        img.onload = () => {
            const aspectRatio = img.width / img.height;
            if (aspectRatio > 1.5) { // Wide image
                return 'w-full md:w-4/5 lg:w-3/4';
            } else { // Tall image or normal image
                return  'w-full md:w-3/5 lg:w-1/2';
            }
        };

        return "";
    };

    return (
        <div className="container mx-auto p-10">
            <Helmet>
                <title>{`Oxy-vitale - ${article.title}`}</title>
            </Helmet>
            <div className="p-4 w-full md:w-2/3  content-center text-left">
                <h1 className="text-4xl font-bold mb-4">{article.title}</h1>
                <p className="text-gray-500 text-sm ">
                    {formatDate(article.createdAt)}
                </p>
                <br/>
                <Space direction={"vertical"} size={"large"}>
                    <img src={article.coverPhoto} alt="Cover Picture" className={getImageClassName(article.coverPhoto)} />

                    {article?.pretext?.split('\n').map((alinea, index) => (
                        <div>
                            <Paragraph
                                key={index}
                                className="
                                mt-2
                                mx-0
                                sm:mx-0
                                md:mx-4
                                text-gray-900
                                text-lg
                                md:text-xl
                                lg:text-2xl
                                font-cambria
                              "
                            >
                                {alinea}
                            </Paragraph>

                            <br/>
                        </div>
                    ))}

                </Space>
            </div>

            <br/>

            {article?.alineas?.map((alinea, index) => (
                <div key={index} className="mb-6">
                    {alinea.content.map((content, idx) => {
                        switch (content.type) {
                            case 'subtitle':

                                return <div>
                                    <Title level={2} className="text-2xl font-bold text-left">{content.value}</Title>
                                    <Divider/>
                                    <br/>
                                </div>

                            case 'text':
                                return (content?.value?.split('\n').map((alinea, index) => (
                                    <div>
                                        <Paragraph key={index}
                                                   className="mt-2 w-full md:w-2/3 text-gray-900 text-lg md:text-xl lg:text-2xl text-left font-cambria">
                                            {alinea}
                                        </Paragraph>
                                        <br/>
                                    </div>
                                )));

                            case 'quote':
                                return <div>
                                    <blockquote key={idx}
                                                className="italic bg-gray-100 border-l-4 border-gray-500 pl-4 py-2 my-4 w-full md:w-3/5 font-arial text-lg md:text-xl">
                                        {content.value.split("--")[0]}
                                        <br/> {/* Break line for visual separation */}
                                        <span className="block text-right">- {content.value.split("--")[1]}</span>
                                    </blockquote>
                                </div>

                            case 'image':
                                return <img src={article.value} alt="Cover Picture"
                                            className={getImageClassName(article.value)}/>
                            case 'video':
                                return <video controls alt="" className="w-2/5 sm:w-4/5 md:w-3/5 h-auto mx-auto"
                                              src={content.value}/>
                            default:
                                return null;
                        }
                    })}
                </div>
            ))}
        </div>
    );
}

export default Article;
