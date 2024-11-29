import { createContext, useState, useEffect, useContext } from "react";
import { db, collection, addDoc, getDocs , doc, setDoc, onSnapshot } from '../firebase';

export const DataContext = createContext();

export const DataProvider = ({ children }) => {
    const [data, setData] = useState([]);

    // Получение данных из Firestore при монтировании компонента
  
    useEffect(() => {
        // Создаем слушатель для изменений в коллекции "block"
        const unsubscribe = onSnapshot(collection(db, "block"), (querySnapshot) => {
            // Получаем все документы в коллекции
            const dataFromFirestore = querySnapshot.docs.map(doc => doc.data());
            setData(dataFromFirestore); // Обновляем состояние с полученными данными
        }, (error) => {
            console.error("Ошибка получения данных: ", error);
        });

        // Возвращаем функцию для отписки от слушателя при размонтировании компонента
        return () => unsubscribe();
    }, []); // Пустой массив зависимостей — это значит, что запрос будет выполнен только один раз, при монтировании компонента


    
    async function updateData(newData) {
        try {
            // Преобразуем newData.id в строку, если это необходимо
    
            // Создаем ссылку на документ с этим ID
            const docRef = doc(db, "block", newData.id);
    
            // Добавляем или обновляем документ в Firestore
            await setDoc(docRef, newData);
    
    
            // Получаем все документы из коллекции и обновляем состояние
            const querySnapshot = await getDocs(collection(db, "block"));
            const newDataFromFirestore = querySnapshot.docs.map(doc => doc.data());
            setData(newDataFromFirestore); // Обновляем состояние с новыми данными
        } catch (e) {
            console.error("Ошибка добавления документа: ", e);
        }
    }
    

    return (
        <DataContext.Provider value={{ data, updateData }}>
            {children}
        </DataContext.Provider>
    );
};
