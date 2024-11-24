import { useState } from 'react';
import Search from '../../resources/svg/Search';
import './appSearch.scss'

const AppSearch = ({SearchText}) => {
    return (
        <div className='search'>
            <div className='search__block'>
                <input className='search__input'  placeholder='Поиск...' onChange={(e) => SearchText(e.target.value) }/>
            </div>
        </div>
    )
}

export default AppSearch;