import { useState } from 'react';
import Plus from '../../resources/svg/Plus';
import './modal.scss';
import CodeInput from '../codeInput/CodeInput';

const Modal = ({ props }) => {
        const { type, setType, setTitle,title ,setText, text, addUser, setActive } = props;
        let types = ['React', 'ReactNative', 'JS', 'TS', 'SoftSkils', 'CSS', 'HTML', 'Другое'];
        console.log(type)

        const handleChange = (e) => {
            setText(e.target.value);
            e.target.style.height = 'auto';  // Сбрасываем высоту перед измерением
            e.target.style.height = `${e.target.scrollHeight}px`;  // Устанавливаем высоту равной высоте контента
        };

        const handleCodeInsert = (text) => {
            // Проверяем, что text является строкой и не пустой
            if (typeof text !== 'string' || text.trim() === '') {
                return null;
            }
        
            const codeRegex = /<code>(.*?)<\/code>/g;  // Регулярное выражение для поиска <code></code>
            const matches = [...text.matchAll(codeRegex)];  // Получаем все совпадения
        
            if (matches.length > 0) {
                return matches[0][1]; // Возвращаем содержимое первого найденного тега <code>
            }
        
            return null; // Если нет кода
        };
        
    
        // Определяем, какой код нужно вставить в CodeInput
        const codeToInsert = handleCodeInsert(text);

    return (
        <div className="modal">
        <div className="modal__block">
            <div className="modal__type">
                {types.map((item) => (
                    <div 
                        className={`modal__typeBlock ${type === item ? 'selected' : ''}`} 
                        onClick={() => setType(item)} 
                        key={item}
                    >
                        <p>{item}</p>
                    </div>
                ))}
            </div>

            <div className="modal__title">
                <input 
                    className='modal__titleText' 
                    onChange={(e) => setTitle(e.target.value)} 
                    placeholder='Заголовок'
                    value={title}
                />
            </div>

            <div className="modal__info">
                <textarea 
                    className='modal__infoText' 
                    onChange={handleChange} 
                    placeholder='Текст' 
                    value={text} 
                />
                
                {/* Показываем CodeInput, если в тексте найден код внутри <code></code> */}
                {codeToInsert && <CodeInput code={codeToInsert} />}
            </div>

            <div className='modal__btns'>
                <button className='modal__btnsBtn modal__close' onClick={() => setActive(false)}>
                    Закрыть
                </button>
                <button className='modal__btnsBtn modal__add' onClick={() => addUser()}>
                    Добавить
                </button>
            </div>
        </div>
    </div>
    );
};

export default Modal;
