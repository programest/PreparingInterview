import { useContext, useEffect, useState } from "react";
import AppFilter from "../appFilter/AppFilter";
import AppSearch from "../appSearch/AppSearch";
import BlockInfoList from "../blockInfoList/BlockInfoList";
import UppendItem from "../uppendItem/UppendItem";
import {DataContext, DataProvider} from "../../hooks/DataContext";

import './app.scss'
import DeleteItem from "../deleteItem/DeleteItem";
function App() {
  
  const { data } = useContext(DataContext);
  const [textSearch, setTextSearch]= useState('')
  const [type, setType]= useState('')
  const [arraySelected, setArraySelected] = useState([]);
  const [activeDelete, setActiveDelete] = useState(false)
  const handleClick = (block, isSelected) => {
      if (!isSelected) {
       setArraySelected((prevArray) => [...prevArray, block]); // Создаем новый массив, добавляя элемент
     } else {
       setArraySelected((prevArray) => prevArray.filter(item => item !== block)); // Создаем новый массив, фильтруя элементы
     }
      
     };
  const ToggleActiveDelete = () => {
    setActiveDelete((prev) => !prev)
  }
  const SearchText = (newItem) => {
    setTextSearch(newItem); 
  }
  const Type = (newItem) => {
    setType(newItem); 
  }
  const visibleUsers = data.filter((item) => {
    const searchText = textSearch.toLowerCase();
    const typeBlock = type?.toLowerCase();

    if (type && item.type  && item.type.toLowerCase() !== typeBlock) {
        return false;
    }
    if (searchText &&
        !item.text.toLowerCase().includes(searchText) &&
        !item.content.toLowerCase().includes(searchText)) {
        return false;
    }
    return true;
});


  return (

        <div className="app">
        <AppFilter data={visibleUsers} Type={Type}/>
        <main>
            <AppSearch SearchText={SearchText}/>
            <div className="content">
                <BlockInfoList data={visibleUsers} handleClick={handleClick} activeDelete={activeDelete}/>
            </div>
            <DeleteItem arraySelected={arraySelected} ToggleActiveDelete={ToggleActiveDelete} activeDelete={activeDelete} />
            {activeDelete ? null : <UppendItem/>}
           
        </main>
    </div>

  );
}

export default App;
