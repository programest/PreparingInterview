import { useContext, useEffect, useState } from "react";
import AppFilter from "../appFilter/AppFilter";
import AppSearch from "../appSearch/AppSearch";
import BlockInfoList from "../blockInfoList/BlockInfoList";
import UppendItem from "../uppendItem/UppendItem";
import {DataContext, DataProvider} from "../../hooks/DataContext";

import './app.scss'
import DeleteItem from "../deleteItem/DeleteItem";
import EditItem from "../editItem/editItem";
function App() {
  
  const { data } = useContext(DataContext);
  const [textSearch, setTextSearch]= useState('')
  const [type, setType]= useState('')
  const [arraySelected, setArraySelected] = useState([]);
  const [activeDelete, setActiveDelete] = useState(false)
  const [activeEdit, setActiveEdit] = useState(false)

  const handleClick = (block, isSelected) => {
        if (activeEdit) {
          if (!isSelected) {
            setArraySelected(block)
          } else {
            setArraySelected([])
          }
      } else if (activeDelete) {
        if (!isSelected) {
          setArraySelected((prevArray) => [...prevArray, block]); // Создаем новый массив, добавляя элемент
        } else {
          setArraySelected((prevArray) => prevArray.filter(item => item !== block)); // Создаем новый массив, фильтруя элементы
        }
      }else{
        setArraySelected([]); 
      }
     };

  useEffect(() => {
      if (!activeDelete || !activeEdit) {
        setArraySelected([]); 
      }
  }, [activeDelete, activeEdit]); 

  const ToggleActiveDelete = () => {
    setActiveDelete((prev) => !prev)
  }
  const ToggleActiveEdit = () => {
    setActiveEdit((prev) => !prev)
  }
  const SearchText = (newItem) => {
    setTextSearch(newItem); 
  }
  const Type = (newItem) => {
    setType(newItem); 
  }
  const visibleUsers = Array.isArray(data) ? data.filter((item) => {
    const searchText = textSearch?.toLowerCase() || ''; // Убедимся, что textSearch — строка
    const typeBlock = type?.toLowerCase() || '';       // Убедимся, что type — строка

    // Проверяем поле type
    if (typeBlock && item.type?.toLowerCase() !== typeBlock) {
        return false;
    }

    // Проверяем поля text и content
    const itemText = item.text?.toLowerCase() || '';
    const itemContent = item.content?.toLowerCase() || '';
    if (searchText && !itemText.includes(searchText) && !itemContent.includes(searchText)) {
        return false;
    }

    return true;
}) : [];



  return (

        <div className="app">
        <AppFilter data={visibleUsers} Type={Type}/>
        <main className="block">
            <AppSearch SearchText={SearchText}/>
            <div className="content">
                <BlockInfoList data={visibleUsers} handleClick={handleClick} activeDelete={activeDelete} activeEdit={activeEdit}/>
            </div>
            <div className="blockButton">
            {activeDelete ? null : <EditItem  arraySelected={arraySelected} ToggleActiveEdit={ToggleActiveEdit} activeEdit={activeEdit}/>}

              { activeEdit ? null : <DeleteItem arraySelected={arraySelected} ToggleActiveDelete={ToggleActiveDelete} activeDelete={activeDelete} />}
              {activeDelete || activeEdit ? null : <UppendItem/>}

            </div>
        </main>
    </div>

  );
}

export default App;
