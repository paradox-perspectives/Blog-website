import React from 'react';
import { Card, Typography } from 'antd';
import { CopyOutlined, FacebookOutlined, WhatsAppOutlined, PushpinOutlined} from '@ant-design/icons';
import {useNavigate} from "react-router-dom";
const { Meta } = Card;
const { Paragraph } = Typography;


function ArticleCard2({ article, edit = false, viewAll = false }) {

    const navigate = useNavigate();

    let navLink = "";
    if (!edit && !viewAll) {
        navLink += "articles/"
    }
    navLink += `${article.urlId}`;

    const jumpLink = window.location.href + navLink

    const copyLink = (event) => {
        event.stopPropagation();
        navigator.clipboard.writeText(jumpLink);
        alert('Link copied to clipboard!');
    };

    const navigateToArticle = () => {
        navigate(navLink);
    };

    const handleShareClick = (event, platform) => {
        event.stopPropagation();
        switch (platform) {
            case 'messenger':
                window.open(`https://www.facebook.com/dialog/send?link=${encodeURIComponent(jumpLink)}&app_id=YOUR_APP_ID&redirect_uri=${encodeURIComponent('REDIRECT_URI')}`, '_blank');
                break;
            case 'whatsapp':
                window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(jumpLink)}`, '_blank');
                break;
            default:
                break;
        }
    }

    return (
        <Card
            onClick={navigateToArticle}
            cover={
                <img
                    alt="example"
                    src={article.coverPhoto}
                />
            }
            bordered={true}
            hoverable={true}
            actions={[
                <CopyOutlined key="copy link" onClick={copyLink}/>,
                //<FacebookOutlined key="share messenger" onClick={ (event)  => handleShareClick(event,"messenger") }/>,
                <WhatsAppOutlined key="share whatsapp" onClick={ (event) => handleShareClick(event,'whatsapp') } />

            ]}
        >
            <Meta
                title={
                    <>
                        {article.title} &#32; {article.themes.includes('Pinned') && <PushpinOutlined />}
                    </>
                }
                description={
                    <Paragraph>
                        {article.teaser + ' '} <a onClick={navigateToArticle} style={{ color: 'blue' }}>...Read more</a>
                    </Paragraph>
                }
            />
        </Card>
    )
}

export default ArticleCard2;

/*
                <span key="like">
                        <LikeOutlined/> {`: ${article.likes}`}
                    </span>,
                <span key="dislike">
                        <DislikeOutlined/> {`: ${article.dislikes}`}
                    </span>,
                    */