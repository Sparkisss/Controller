import { ArchiveData } from "../style/styles";
//получение данных
export const fetchData = async (): Promise<ArchiveData[]> => {
    try {
        const response = await fetch(import.meta.env.VITE_SERVER_PORT_ARCHIVE);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data: ArchiveData[] = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching tasks:', error);
        throw new Error(`Error fetching archive data: ${error}`);
    }
};
//создание данных// метод для записи данных в базу данных
export const createData = async ({number, status, date}: ArchiveData) => {
    try {
        const response = await fetch(import.meta.env.VITE_SERVER_PORT_ARCHIVE, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({number, status, date})                
        });
        if (!response.ok) {
            throw new Error(`Ошибка: ${response.statusText}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.log("Error with create data", error);
        throw new Error(`Error fetching archive data: ${error}`);
    }
  }