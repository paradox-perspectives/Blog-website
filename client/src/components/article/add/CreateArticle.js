import React, {useEffect, useState} from 'react';
import TextField from './components/TextField';
import TextArea from './components/TextArea';
import Alinea from "./components/Alinea";
import axios from 'axios';
import FileUploader from "./components/FileUploader";
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';


function CreateArticle({edit = false}) {
    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("");
    const [teaser, setTeaser] = useState("");
    const [pretext, setPretext] = useState("");
    const [alineas, setAlineas] = useState([]);
    const [themes, setThemes] = useState([]);
    const [availableThemes, setAvailableThemes] = useState([]);
    const [newThemeEn, setNewThemeEn] = useState('');
    const [newThemeNl, setNewThemeNl] = useState('');
    const [coverPhoto, setCoverPhoto ] = useState('')
    const [id, setId] = useState('')
    const apiUrl = process.env.REACT_APP_BACKEND_URL;
    const { urlId } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        if (edit && urlId) {
            // Fetch the article data and populate the form
            axios.get(`${apiUrl}/articles/${urlId}`)
                .then(response => {
                    const data = response.data;
                    setTitle(data.title);
                    setAuthor(data.author);
                    setTeaser(data.teaser);
                    setPretext(data.pretext);
                    setThemes(data.themes);
                    setAlineas(data.alineas);
                    setCoverPhoto(data.coverPhoto);
                    setId(data._id);
                })
                .catch(error => {
                    console.error('Error fetching article:', error);
                });
        }

        // Fetch themes
        axios.get(`${apiUrl}/themes/en`)
            .then(response => {
                setAvailableThemes(response.data);
            })
            .catch(error => {
                console.error('Error fetching themes:', error);
            });
    }, [edit, urlId]);

    const addAlinea = () => {
        setAlineas(prevAlineas => [...prevAlineas, { content: [] }]);
    };

    const deleteAlinea = (indexToDelete) => {
        setAlineas(prevAlineas => prevAlineas.filter((_, index) => index !== indexToDelete));
    };

    const submitArticle = () => {
        const articleData = {
            urlId: title.trim().toLowerCase().replace(/\s+/g, '-'),
            title,
            author,
            teaser,
            pretext,
            themes,
            coverPhoto,
            alineas
        };

        console.log(articleData, "json");
    };

    const handleDB = () => {
        const articleData = {
            urlId: title.trim().toLowerCase().replace(/\s+/g, '-'),
            title,
            author,
            teaser,
            pretext,
            themes,
            coverPhoto,
            alineas
        };

        console.log(id, "print id in handleDB")

        const request = edit
            ? axios.put(`${apiUrl}/articles/${id}`, articleData)
            : axios.post(`${apiUrl}/articles`, articleData);

        request
            .then(response => {
                console.log('Article saved:', response.data);
                navigate('/#added');
            })
            .catch(error => {
                console.error('Error saving article:', error);
                // Handle error
            });
    }

    const handleThemeSelection = (selectedTheme) => {
        if (selectedTheme && !themes.includes(selectedTheme)) {
            setThemes([...themes, selectedTheme]);
        }
    };

    const deleteTheme = (indexToDelete) => {
        setThemes(themes.filter((_, index) => index !== indexToDelete));
    };


    const addNewTheme = () => {
        const newTheme = { en: newThemeEn, nl: newThemeNl };
        axios.post(`${apiUrl}/themes`, newTheme)
            .then(response => {
                setAvailableThemes([...availableThemes, newThemeEn]); // Add to available themes
                setNewThemeEn('');
                setNewThemeNl('');
            })
            .catch(error => {
                console.error('Error adding new theme:', error);
            });
    };


    return (
        <div className="container mx-auto p-10">
            <h1 className="text-4xl font-bold mb-8">Create a New Article</h1>
            <TextField title="Title" value={title} onUpdateValue={(newValue) => setTitle(newValue)} />
            <TextField title="Author" value={author} onUpdateValue={(newValue) => setAuthor(newValue)} />
            <TextArea title="Teaser" value={teaser} onUpdateValue={(newValue) => setTeaser(newValue)} />
            <TextArea title="Pretext" value={pretext} onUpdateValue={(newValue) => setPretext(newValue)} />

            <div className="p-4 border rounded-md mb-4">
                <h3 className="text-xl font-bold mb-4">Themes</h3>

                <div className="mb-6">
                    <select className="w-1/2 p-2 border border-gray-300 rounded-md" onChange={(e) => handleThemeSelection(e.target.value)}>
                        <option value="">Select a theme</option>
                        {availableThemes.map(theme => (
                            !themes.includes(theme) && <option key={theme} value={theme}>{theme}</option>
                        ))}
                    </select>
                </div>

                <ul className="mb-6">
                    {themes.map((theme, index) => (
                        <li key={index} className="mb-2">
                            <button className="text-red-700 mr-2" onClick={() => deleteTheme(index)}>x</button>
                            {theme}
                        </li>
                    ))}
                </ul>

                <div className="mb-6">
                    <h3 className="text-xl font-bold mb-4">Add New Theme:</h3>
                    <div className="flex gap-4 mb-4">
                        <input type="text" placeholder="English" className="flex-1 p-2 border border-gray-300 rounded-md" value={newThemeEn} onChange={(e) => setNewThemeEn(e.target.value)} />
                        <input type="text" placeholder="Nederlands" className="flex-1 p-2 border border-gray-300 rounded-md" value={newThemeNl} onChange={(e) => setNewThemeNl(e.target.value)} />
                    </div>
                    <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600" onClick={addNewTheme}>Add Theme</button>
                </div>
            </div>

            <FileUploader type="Image" allowedFormats="image/*" onFileUploaded={(url) => setCoverPhoto(url)} title="Cover Photo" fileUrlEdit={coverPhoto}/>

            <h2 className="py-2 text-4xl font-bold mb-8">Alineas</h2>
            <button onClick={addAlinea} className="px-4 py-2 mb-4 bg-green-500 text-white rounded">Add an Alinea</button>
            {alineas.map((alinea, index) => (
                <Alinea
                    index={index }
                    key={index}
                    onDelete={() => deleteAlinea(index)}
                    alineas = {alineas}
                    updateAlinea={(alineaIndex, newContents) => {
                        setAlineas(prevAlineas =>
                            prevAlineas.map((alinea, idx) =>
                                idx === alineaIndex ? { ...alinea, content: newContents } : alinea
                            )
                        );
                    }}
                />
            ))}
            <button onClick={submitArticle} className="px-4 py-2 mb-4 bg-green-500 text-white rounded">Print</button>
            <button onClick={handleDB} className="px-4 py-2 mb-4 bg-green-500 text-white rounded">{ edit ? "Complete changes" :  "Add to db" }</button>
        </div>
    );
}

export default CreateArticle;