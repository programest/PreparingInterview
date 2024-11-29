import { useEffect, useState } from 'react';
import './editItem.scss';
import { useContext } from "react";
import { DataContext } from '../../hooks/DataContext';
import { db, doc, updateDoc } from '../../firebase';
import Edit from '../../resources/svg/Edit';
import Modal from '../modal/Modal';

const EditItem = ({ ToggleActiveEdit, activeEdit, arraySelected }) => {
    const { data, updateData } = useContext(DataContext);
    const [active, setActive] = useState(false);
    const [editableItem, setEditableItem] = useState(arraySelected);
 
    
    const docRef = editableItem.id ? doc(db, 'block', editableItem.id) : null;
   
    const editUser = () => {
        updateDoc(docRef, {
            ...editableItem  // Раскладываем свойства editableItem в объект
        })
        .then(() => {
            console.log("Документ обновлен!");
        })
        .catch((error) => {
            console.error("Ошибка обновления документа: ", error);
        });
        ToggleActiveEdit(false); // Закрываем редактирование

    }
    useEffect(() => {
        setEditableItem(arraySelected);
    }, [arraySelected]);


    const handleTitleChange = (e) => {
        const newTitle = e;
        setEditableItem((prev) => ({ ...prev, title: newTitle }));
    };

    const handleTextChange = (e) => {
        const newText = e;
        setEditableItem((prev) => ({ ...prev, text: newText }));
    };
    const handleTypeChange = (e) => {
        const newType = e;
        setEditableItem((prev) => ({ ...prev, type: newType }));
    };
    return (
<div className={`${activeEdit && arraySelected.length !== 0 ? 'activeEdit' : ''} edit`}>
{activeEdit &&  arraySelected.length != 0?  
                <div className="edit__textBlock" onClick={() => { setActive(true); }}>
                    <p className='edit__text'>Редактировать</p>
                </div>
            : null}
            
            <div className={`${activeEdit ? 'active' : ''} edit__block`} onClick={ToggleActiveEdit}>
                <Edit />
            </div>

            {active && activeEdit ? (
                <Modal 
                    props={{
                        type: editableItem.type, 
                        setType: handleTypeChange, 
                        setText: handleTextChange, 
                        setTitle: handleTitleChange, 
                        title: editableItem.title, 
                        text: editableItem.text, 
                        addUser: editUser, 
                        setActive: setActive
                    }} 
                />
            ) : null}
        </div>
    );
}

export default EditItem;
