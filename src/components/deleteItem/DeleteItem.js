import { useState } from 'react';
import './deleteItem.scss';
import { useContext } from "react";
import { DataContext } from '../../hooks/DataContext';
import Delete from '../../resources/svg/Delete';
import { db, doc, deleteDoc } from '../../firebase'

const DeleteItem = ({ arraySelected, ToggleActiveDelete, activeDelete }) => {
    const { data, updateData } = useContext(DataContext);

    // Функция для удаления из Firestore и локального состояния
    
    const removeFromFirestore = async () => {
        try {
            // Удаляем документы из Firestore
            const deletePromises = arraySelected.map(async (block) => {
                if (!block.id || typeof block.id !== "string") {
                    console.error("Некорректный ID документа: ", block);
                    return; // Пропускаем некорректные данные
                }
    
                const docRef = doc(db, "block", block.id); // Преобразуем ID в строку
                await deleteDoc(docRef); // Удаляем документ по ID
            });
    
            // Ждем выполнения всех операций удаления
            await Promise.all(deletePromises);
    
            console.log("Удаление завершено успешно.");
        } catch (e) {
            console.error("Ошибка удаления данных: ", e);
        }
    };
    
    return (
        <div className={`${activeDelete && arraySelected.length !== 0 ? 'activeRemove' : ''} delete`} >
            {activeDelete && arraySelected.length != 0 ?  
            <div className="delete__textBlock" onClick={() => removeFromFirestore()}>
                <p className='delete__text'>Удалить</p>
            </div>
            : null}
            <div className={`${activeDelete ? 'active' : ''} delete__block`} onClick={ToggleActiveDelete}>
                <Delete/>
            </div>
        </div>
    );
}

export default DeleteItem;
