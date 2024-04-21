import React, {useEffect, useState} from 'react';
import axios from 'axios';

function FileUploader({ type, onDelete, allowedFormats, onFileUploaded, title, fileUrlEdit = null }) {
    const [fileUrl, setFileUrl] = useState('');
    const [error, setError] = useState('');
    let endpoint = process.env.REACT_APP_BACKEND_URL + '/upload'


    useEffect(() => {
        if (fileUrlEdit != null)
            setFileUrl(fileUrlEdit)
    }, [fileUrlEdit]);

    const handleFileChange = async (event) => {
        const file = event.target.files[0];
        if (file) {
            const formData = new FormData();
            formData.append(type.toLowerCase(), file);

            try {
                endpoint += type === 'Image' ? '/image' : '/video';
                const response = await axios.post(endpoint, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });

                setFileUrl(response.data.url);
                onFileUploaded(response.data.url);
                setError('');
            } catch (error) {
                setError('An error occurred while uploading the file.');
            }
        }
    };

    return (
        <div className="p-4 border rounded-md mb-4">
            <h3 className="font-bold text-lg mb-2">{title || type}</h3>
            {error && <p className="text-red-500 mb-2">{error}</p>}
            {!fileUrl && (
                <input
                    type="file"
                    accept={allowedFormats}
                    onChange={handleFileChange}
                />
            )}
            {fileUrl && (
                <>
                    {type === 'Image' &&
                        <img
                            src={fileUrl}
                            alt="Uploaded content"
                            className="mb-2"
                            style={{ height: '100%', maxHeight: '400px', width: 'auto' }}
                        />
                    }
                    {type === 'Video' &&
                        <video
                            src={fileUrl}
                            controls
                            className="mb-2"
                            style={{ height: '100%', maxHeight: '400px', width: 'auto' }}
                        />
                    }
                </>
            )}
            {onDelete && (<button onClick={onDelete} className="text-red-500">Remove</button>)}
        </div>
    );
}

export default FileUploader;
