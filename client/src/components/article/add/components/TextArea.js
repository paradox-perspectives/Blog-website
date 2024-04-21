import React, { useState } from 'react';

function TextArea({ title, onDelete, onUpdateValue, value }) {
    const [isExpanded, setIsExpanded] = useState(true);

    return (
        <div className="p-4 border rounded-md mb-4">
            <div className="flex justify-between items-center">
                <h3 className="font-bold text-lg">{title}</h3>
                <button onClick={() => setIsExpanded(!isExpanded)}>
                    {isExpanded ? 'Collapse' : 'Expand'}
                </button>
            </div>
            {isExpanded &&
                <textarea
                    className="w-full border rounded-md p-2 mt-2"
                    rows={title === 'Text' ? 10 : 6}
                    placeholder={`Enter the ${title.toLowerCase()}`}
                    value={value} onChange={(e) => onUpdateValue(e.target.value)}
                ></textarea>
            }
            {onDelete && <button onClick={onDelete} className="text-red-500">Delete</button>}
        </div>
    );
}

export default TextArea;
