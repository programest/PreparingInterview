import { useState } from 'react';
import './deleteItem.scss'
import { useContext } from "react";
import { DataContext } from '../../hooks/DataContext';
import Delete from '../../resources/svg/Delete';


const DeleteItem = ({arraySelected, ToggleActiveDelete, activeDelete}) => {
    const { data, updateData } = useContext(DataContext);
    const removeLocalStorage = () => {
        const updatedData = data.filter(
            item => !arraySelected.some(selected => selected.id === item.id)
        );
    
        // Обновляем состояние и localStorage через DataContext
        updateData(updatedData);
    };
    
    return (
        <div className='delete'>
            {activeDelete ?  
            <div className="delete__textBlock" onClick={() => removeLocalStorage()}><p className='delete__text'>Удалить</p></div>
            : null}
            <div className={`${activeDelete ? 'active' : ''} delete__block`} onClick={ToggleActiveDelete}>
                <Delete/>
            </div>
            
        </div>
    )
}

export default DeleteItem;