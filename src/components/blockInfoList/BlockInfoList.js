import { useContext, useState } from 'react';
import Arrow from '../../resources/svg/Arrow';
import './blockInfoList.scss';
import { DataContext } from '../../hooks/DataContext';
import RoundSelect from '../roundSelect/RoundSelect';

const BlockInfoList = ({data, handleClick, activeDelete}) => {
    const [openIndexes, setOpenIndexes] = useState({}); // объект для хранения состояния каждого блока
    const [openContent, setOpenContent] = useState(false); // объект для хранения состояния каждого блока

    const toggleBlock = (index) => {
        setOpenIndexes(prevState => ({
            ...prevState,
            [index]: !prevState[index] // инвертируем состояние блока по индексу
        }));
        setOpenContent((prev) => !prev)
    };
    

    return (
        <div className='info'>
        {data.map((block, index) => (
            <div 
                key={`block-wrapper-${block.id}`} // Уникальный key для каждого обертки
                style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom:20 }}
            >   
            {activeDelete ? (
                <RoundSelect 
                    block={block} 
                    key={`round-select-${block.id}`} // Уникальный key для компонента RoundSelect
                    handleClick={handleClick} 
                />
            ) : null}
                <div 
                    className={`${activeDelete ? 'activeBlock' : ''} ${openContent ? 'activeContent' : ''} info__block`}

                    key={`info-block-${block.id}`} // Уникальный key для блока
                    onClick={() => toggleBlock(index)}
                >
                    <div className='info__content'>
                        <p className='info__text'>{block.text}</p>
                        <Arrow className={openIndexes[index] ? 'open' : 'closed'} />
                    </div>
                    {openIndexes[index] && (
                        <div className='info__details'>
                            <hr style={{marginBottom: 10, marginTop: 10}} />
                            <p>{block.content}</p>
                        </div>
                    )}
                </div>
            </div>
        ))}
    </div>
    
    );
};

export default BlockInfoList;
