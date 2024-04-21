import React from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';


function ArticleCard({ article }) {

    const jumpLink = `${window.location.origin}/articles/${article.urlId}`;
    const copyLink = () => {
        navigator.clipboard.writeText(jumpLink);
        alert('Link copied to clipboard!');
    };

    return (
        <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl mb-8">
            <div className="md:flex">
                <div className="md:flex-shrink-0">
                    <img className="h-48 w-full object-cover md:h-full md:w-48" src={article.coverPhoto} alt={article.title} />
                </div>
                <div className="p-8">
                    <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">{article.date} by {article.author}</div>
                    <a href="#" className="block mt-1 text-lg leading-tight font-medium text-black hover:underline">{article.title}</a>
                    <div className="mt-2 text-gray-500">
                        {article.teaser.split('\n').map((line, index) => (
                            <p key={index}>{line}</p>
                        ))}
                    </div>
                    <a href={jumpLink}>
                        <button className="mt-3 px-4 py-2 font-bold text-white bg-indigo-500 rounded-full hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-opacity-75">
                            Read More
                        </button>
                    </a>
                    <CopyToClipboard
                        text={`${window.location.origin}/article/${article.urlId}`}
                        onCopy={() => {
                            alert('Link copied to clipboard!');
                        }}
                    >
                        <button>Copy Link</button>
                    </CopyToClipboard>
                    <div className="mt-4">
                        <span className="text-gray-700 mr-4">Likes: {article.likes}</span>
                        <span className="text-gray-700">Dislikes: {article.dislikes}</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ArticleCard;
