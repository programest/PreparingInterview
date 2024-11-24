
import React, { useState } from 'react';
import './RoundSelect.scss'; // Подключаем стили для компонента

const RoundSelect = ({ block, handleClick }) => {
  const [isSelected, setIsSelected] = useState(false);
  const selectClick = () => {
    handleClick(block, isSelected)
    setIsSelected(!isSelected);  
  };


  return (
    <>
    <div
      className={`selectable-circle ${isSelected ? 'selected' : ''}`}
      onClick={selectClick}
    >
      {isSelected && (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="20 6 9 17 4 12" />
        </svg>
      )}
            

    </div>
    </>
  );
};

export default RoundSelect;
