import React from 'react';

function TextField({ title, onDelete, onUpdateValue, value  }) {
    return (
        <div className="p-4 border rounded-md mb-4">
            <h3 className="font-bold text-lg mb-2">{title}</h3>
            <input
                type="text"
                value={value}
                onChange={(e) => onUpdateValue(e.target.value)}
                className="w-full p-2 border rounded-md"
                placeholder={`Enter the ${title.toLowerCase()}`}
            />
            {onDelete && <button onClick={onDelete} className="text-red-500">Delete</button>}
        </div>
    );
}

export default TextField;
