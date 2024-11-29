import { useContext, useEffect, useState } from 'react';
import Arrow from '../../resources/svg/Arrow';
import './blockInfoList.scss';
import { DataContext } from '../../hooks/DataContext';
import RoundSelect from '../roundSelect/RoundSelect';

import CodeInput from '../codeInput/CodeInput';

const BlockInfoList = ({ data, handleClick, activeDelete, activeEdit }) => {
    const [openIndexes, setOpenIndexes] = useState({}); // объект для хранения состояния каждого блока
    const [openContent, setOpenContent] = useState(false); // объект для хранения состояния каждого блока
    const [selectedBlockId, setSelectedBlockId] = useState(null); // состояние для хранения выбранного блока
    const [selectedBlocks, setSelectedBlocks] = useState([]); // Массив для хранения выбранных блоков при activeDelete

    const toggleBlock = (index) => {
        setOpenIndexes(prevState => ({
            ...prevState,
            [index]: !prevState[index] // инвертируем состояние блока по индексу
        }));
        setOpenContent((prev) => !prev);
    };

    // Функция для обработки текста
    const processText = (text) => {
        const regex = /<code>(.*?)<\/code>/g;
        const parts = [];
        let lastIndex = 0;

        let match;
        while ((match = regex.exec(text)) !== null) {
            const [fullMatch, codeContent] = match;

            // Добавляем текст до найденного тега
            if (match.index > lastIndex) {
                parts.push(text.slice(lastIndex, match.index));
            }

            // Добавляем компонент для содержимого <code>
            parts.push(<CodeInput key={parts.length} code={codeContent} />);

            lastIndex = regex.lastIndex;
        }

        // Добавляем оставшийся текст после последнего совпадения
        if (lastIndex < text.length) {
            parts.push(text.slice(lastIndex));
        }

        return parts;
    };
    const handleSelectClick = (block, isSelected) => {
        
        if (activeEdit) {
            // Если activeEdit, то разрешаем выбрать только один блок
            if (isSelected) {
                setSelectedBlockId(null); // Если выбрали уже выбранный элемент, снимаем выбор
            } else {
                setSelectedBlockId(block.id); // Устанавливаем выбранный элемент
            }
        } else if (activeDelete) {
            // Если activeDelete, то разрешаем выбирать несколько блоков
            if (isSelected) {
                setSelectedBlocks(prevState => prevState.filter(id => id !== block.id)); // Убираем блок из массива выбранных
            } else {
                setSelectedBlocks(prevState => [...prevState, block.id]); // Добавляем блок в массив выбранных
            }
        }
    
        handleClick(block, isSelected); // вызываем handleClick, если нужно
    };
    useEffect(() => {
        if (!activeDelete || !activeEdit) {
            setSelectedBlocks([]); 
            setSelectedBlockId(null);
        }
    }, [activeDelete, activeEdit]); // Зависимости: activeDelete и activeEdit

    return (
        <div className="info">
            {data.map((block, index) => (
                <div
                    key={`block-wrapper-${block.id}`}
                    style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}
                >
                    {activeDelete || activeEdit ? (
                    <RoundSelect
                        block={block}
                        key={`round-select-${block.id}`}
                        isSelected={activeEdit ? selectedBlockId === block.id : selectedBlocks.includes(block.id)} // Для activeEdit проверяем один блок, для activeDelete проверяем массив
                        handleClick={handleSelectClick} // Передаем правильную функцию
                    />
                ) : null}
                    <div
                        className={`${activeDelete ? 'activeBlock' : ''} ${openIndexes[index] ? 'activeContent' : ''} info__block`}
                        key={`info-block-${block.id}`}
                        onClick={() => toggleBlock(index)}
                    >
                        <div className="info__content">
                            <p className="info__text">{processText(block.title)}</p>
                            <Arrow className={openIndexes[index] ? 'open' : 'closed'} />
                        </div>
                        {openIndexes[index] && (
                            <div className="info__details">
                                <hr style={{ marginBottom: 10, marginTop: 10 }} />
                                <p>{processText(block.text)}</p>
                            </div>
                        )}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default BlockInfoList;
