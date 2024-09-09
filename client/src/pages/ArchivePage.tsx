import { List } from 'antd';
import { FC, useEffect, useState } from 'react';

type ArchiveData = {
    number: number;
    status: string;
    date: string;
    time: string;
}

const ArchivePage: FC = () => {
    const [data, setData] = useState<ArchiveData[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:8000/archive');
                if (!response.ok) {
                    throw new Error ('Network response was not ok');
                }
                const archiveMessage = await response.json();
                setData(archiveMessage);
            } catch (error) {
                console.error('Error fetching tasks:', error);
            }
        };
        fetchData();
    }, []);

    return (
        <List
            pagination={{align: 'end'}}
            itemLayout="horizontal"
            dataSource={data}
            renderItem={(item: ArchiveData) => (
                <List.Item>
                    <List.Item.Meta                       
                        title={item.number + '. ' + item.status + ' ' +  item.date + ' ' + item.time}
                    />
                </List.Item>
            )}
        />
    );
};

export default ArchivePage;
