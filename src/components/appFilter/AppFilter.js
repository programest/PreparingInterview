import React, { useContext, useEffect, useRef, useState } from 'react';
import './appFilter.scss';
import TabInPC from '../../hooks/TabInPC';
import { DataContext } from '../../hooks/DataContext';

const AppFilter = ({data, Type}) => {
    const filterRef = useRef(null);
    const [selectedType, setSelectedType] = useState(null);  // Состояние для выбранного типа
    const [types, setTypes] = useState([]);  // Состояние для фильтрованных типов

    const { handleMouseDown, handleMouseMove, handleMouseUp, handleMouseLeave } = TabInPC(filterRef);

    const handleClick = (type) => {
        if (selectedType === type) {
            setSelectedType(null);  // Сбросить выбранный тип, если он уже выбран
            Type(null);  // Убираем фильтр по типу
        } else {
            setSelectedType(type);  // Устанавливаем новый тип
            Type(type);  // Передаем новый тип в родительский компонент
        }
    };
    
    useEffect(() => {
        const uniqueTypes = [];  // Массив для хранения уникальных типов
        data.forEach((item) => {
            if (item.type && !uniqueTypes.includes(item.type)) {  // Проверка на уникальность
                uniqueTypes.push(item.type);
            }
        });
        setTypes(uniqueTypes);  // Обновляем состояние с уникальными типами
    }, [data]);  // Эффект сработает при изменении data

    return (
        <div
            className="filter"
            ref={filterRef}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseLeave}
        >
            {types.map((item, index) => {
                // Проверка на то, что item не пустое, не undefined и не null
                if (item !== '' && item !== undefined && item !== null) {
                    // Добавляем класс 'selected', если это тот же тип, который выбран
                    const isSelected = item === selectedType;
                    return (
                        <div 
                            className={`filter__block ${isSelected ? 'selected' : ''}`} 
                            key={index}  // Используем index как ключ
                            onClick={() => handleClick(item)}
                        >
                            <p className='filter__item'>{item}</p>
                        </div>
                    );
                }
                return null; // В случае, если условие не выполняется
            })}
        </div>
    );
};

export default AppFilter;
