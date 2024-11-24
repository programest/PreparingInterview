import { useState, useEffect } from "react";

const TabInPC = (filterRef) => {
  const [isDragging, setInDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const handleMouseDown = (e) => {
    setInDragging(true);
    setStartX(e.pageX - filterRef.current.offsetLeft);
    setScrollLeft(filterRef.current.scrollLeft);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - filterRef.current.offsetLeft;
    const walk = (x - startX) * 2; // Увеличиваем чувствительность
    filterRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleMouseUp = () => {
    setInDragging(false);
  };

  const handleMouseLeave = () => {
    setInDragging(false);
  };

  // Возвращаем обработчики событий
  return { handleMouseDown, handleMouseMove, handleMouseUp, handleMouseLeave };
};

export default TabInPC;
