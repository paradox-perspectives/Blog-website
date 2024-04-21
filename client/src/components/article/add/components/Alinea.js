import React, { useState} from 'react';
import TextField from './TextField';
import TextArea from "./TextArea";
import Quote from "./Qoute";
import FileUploader from "./FileUploader";
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

function Alinea({ index, onDelete, alineas, updateAlinea }) {
    const [isCollapsed, setIsCollapsed] = useState(false);


    const addComponent = (type) => {
        const newContent = { type, id: alineas[index].content.length };
        updateAlinea(index, [...alineas[index].content, newContent]);
    };

    const deleteContent = (id) => {
        const updatedContents = alineas[index].content.filter(content => content.id !== id);
        updateAlinea(index, updatedContents);
    };

    const updateContentValue = (id, newValue) => {
        const updatedContents = alineas[index].content.map(content =>
            content.id === id ? { ...content, value: newValue } : content
        );
        updateAlinea(index, updatedContents);
    };

    const onDragEnd = (result) => {
        if (!result.destination) return;

        const reorderedContents = Array.from(alineas[index].content);
        const [removed] = reorderedContents.splice(result.source.index, 1);
        reorderedContents.splice(result.destination.index, 0, removed);

        updateAlinea(index, reorderedContents);
    };

    const renderContent = (content) => {
        switch (content.type) {
            case 'subtitle':
                return <TextField title="Subtitle" onDelete={() => deleteContent(content.id)} onUpdateValue={(newValue) => updateContentValue(content.id, newValue)} value={content.value || ''}  key={content.id} />;
            case 'text':
                return <TextArea title="Text" onDelete={() => deleteContent(content.id)} onUpdateValue={(newValue) => updateContentValue(content.id, newValue)} value={content.value || ''}  key={content.id} />;
            case 'image':
                return <FileUploader type="Image" onDelete={() => deleteContent(content.id)} allowedFormats="image/*" onFileUploaded={(url) => updateContentValue(content.id, url)} key={content.id} />;
            case 'video':
                return <FileUploader type="Video" onDelete={() => deleteContent(content.id)} allowedFormats="video/*" onFileUploaded={(url) => updateContentValue(content.id, url)} key={content.id} />;
            case 'quote':
                return <Quote onDelete={() => deleteContent(content.id)} onUpdateValue={(newValue) => updateContentValue(content.id, newValue)} value={content.value || ''}  key={content.id} />;
            default:
                return null;
        }
    };

    return (
        <div className="p-4 border rounded-md mb-4">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold mb-2">Alinea {index + 1}</h2>
                <button onClick={() => setIsCollapsed(!isCollapsed)} className="text-blue-500">
                    {isCollapsed ? 'Expand' : 'Collapse'}
                </button>
            </div>
            {!isCollapsed && (
                <div>
                    <button onClick={() => addComponent('subtitle')} className="px-4 py-2 mb-4 bg-blue-500 text-white rounded">Add Subtitle</button>
                    <button onClick={() => addComponent('text')} className="px-4 py-2 mb-4 bg-blue-500 text-white rounded">Add Text</button>
                    <button onClick={() => addComponent('image')} className="px-4 py-2 mb-4 bg-blue-500 text-white rounded">Add Image</button>
                    <button onClick={() => addComponent('video')} className="px-4 py-2 mb-4 bg-blue-500 text-white rounded">Add Video</button>
                    <button onClick={() => addComponent('quote')} className="px-4 py-2 mb-4 bg-blue-500 text-white rounded">Add Quote</button>
                    <DragDropContext onDragEnd={onDragEnd}>
                        <Droppable droppableId="droppable-contents">
                            {(provided) => (
                                <ul {...provided.droppableProps} ref={provided.innerRef}>
                                    {alineas[index]?.content?.map((content, i) => (
                                        <Draggable key={`key-${content.id}`} draggableId={`draggable-${content.id}`} index={i}>
                                            {(provided) => (
                                                <li
                                                    ref={provided.innerRef}
                                                    {...provided.draggableProps}
                                                    {...provided.dragHandleProps}
                                                    className="mb-2"
                                                >
                                                    {!isCollapsed && renderContent(content)}
                                                </li>
                                            )}
                                        </Draggable>
                                    ))}
                                    {provided.placeholder}
                                </ul>
                            )}
                        </Droppable>
                    </DragDropContext>
                    <button onClick={() => onDelete()} className="text-red-500 mt-4">Delete</button>
                </div>
            )}
        </div>
    );
}

export default Alinea;
