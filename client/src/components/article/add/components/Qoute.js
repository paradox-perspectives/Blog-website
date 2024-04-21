import React, { useState, useEffect } from 'react';

function Quote({ onDelete, onUpdateValue, value }) {
    const [isExpanded, setIsExpanded] = useState(true);
    const [quote, setQuote] = useState('');
    const [author, setAuthor] = useState('');

    useEffect(() => {
        if (value) {
            const [quoteValue, authorValue] = value.split('--');
            setQuote(quoteValue || '');
            setAuthor(authorValue || '');
        }
    }, [value]);

    const handleQuoteChange = (e) => {
        setQuote(e.target.value);
        onUpdateValue(e.target.value + '--' + author);
    };

    const handleAuthorChange = (e) => {
        setAuthor(e.target.value);
        onUpdateValue(quote + '--' + e.target.value);
    };

    return (
        <div className="p-4 border rounded-md mb-4">
            <div className="flex justify-between items-center">
                <h3 className="font-bold text-lg">Quote</h3>
                <button onClick={() => setIsExpanded(!isExpanded)}>
                    {isExpanded ? 'Collapse' : 'Expand'}
                </button>
            </div>
            {isExpanded &&
                <div>
                    <textarea
                        value={quote}
                        className="w-full border rounded-md p-2 mt-2"
                        rows="3"
                        placeholder='Enter the quote'
                        onChange={handleQuoteChange}
                    ></textarea>
                    <input
                        value={author}
                        className="w-full border rounded-md p-2 mt-2"
                        placeholder='Enter the author'
                        onChange={handleAuthorChange}
                    ></input>
                </div>
            }
            {onDelete && <button onClick={onDelete} className="text-red-500">Delete</button>}
        </div>
    );
}

export default Quote;
