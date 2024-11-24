import { useState } from 'react';
import Plus from '../../resources/svg/Plus';
import './uppendItem.scss'
import { useContext } from "react";
import { DataContext } from '../../hooks/DataContext';


const UppendItem = () => {
    const { data, updateData } = useContext(DataContext);
    
    const [active, setActive] = useState(false)
    const [title, setTitle] = useState('')
    const [text, setText] = useState('')
    const [type, setType] = useState('')
    let types = ['React', 'ReactNative', 'JS','TS', 'SoftSkils', 'CSS', 'HTML', 'Другое']
    const addUser = () => {
        if (text && title && type) {
            console.log(type)
            setActive(false);
            const newData = [...data, { id: Date.now(), text: title, content: text, type: type }];
            updateData(newData);
        } else {
            return null;
        }
    };
    const selectType = (item) => {
        setType(item)
    }

    return (
        <div className='uppend'>
            <div className='uppend__block' onClick={() => {setActive(true)}}>
                <Plus/>
            </div>
            {active ? (<div className="modal">
                <div className="modal__block">
                    <div className="modal__type">
                    {types.map((item) => {
                        return (
                            <div className={`modal__typeBlock ${type === item ? 'selected' : ''}`} onClick={() => selectType(item)} key={item}>
                                <p>{item}</p>
                            </div>
                        );
                    })}

                        
                    </div>
                    <div className="modal__title">
                        <input className='modal__titleText' onChange={(e) => setTitle(e.target.value)} placeholder='Загаловок'/>
                    </div> 
                    <div className="modal__info">
                        <input className='modal__infoText' onChange={(e) => setText(e.target.value)}  placeholder='Текст' />
                    </div>

                    <div className='modal__btns'>
                        <button className='modal__btnsBtn modal__add'onClick={() => addUser()}>Добавить</button>
                        <button className='modal__btnsBtn modal__close'onClick={() => setActive(false)}>Закрыть</button>
                    </div>
                   
                </div>
            </div>) : null}
            

        </div>
    )
}

export default UppendItem;