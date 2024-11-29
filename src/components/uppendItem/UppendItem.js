import { useState } from 'react';
import Plus from '../../resources/svg/Plus';
import './uppendItem.scss';
import { useContext } from "react";
import { DataContext } from '../../hooks/DataContext';
import Modal from '../modal/Modal';

const UppendItem = () => {
    const { data, updateData } = useContext(DataContext);
    
    const [active, setActive] = useState(false);
    const [title, setTitle] = useState('');
    const [text, setText] = useState('');
    const [type, setType] = useState('');
   
  

    const addUser = () => {
        if (text && title && type) {
            setActive(false);
            const newData = { id: String(Date.now()), title: title, text: text, type: type };
            updateData(newData);
            setType('') 
            setText('') 
            setTitle('') 
        } else {
            return null;
        }
    };

    
   
 
    return (
        <div className='uppend'>
            <div className='uppend__block' onClick={() => { setActive(true); }}>
                <Plus />
            </div>
            {active ? (
                <Modal props={{ type, setType,setText , setTitle, title, text, addUser, setActive}} />
            ) : null}
        </div>
    );
};

export default UppendItem;
