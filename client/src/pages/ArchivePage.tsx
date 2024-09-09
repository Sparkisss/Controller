import { List } from 'antd';
import { FC, useEffect, useState } from 'react';
import { ArchiveData } from '../style/styles';

const ArchivePage: FC<any> = () => {
    const [archiveMessage, setArchiveMessage] = useState<ArchiveData[]>([]);

    const fetchData = async () => {
        try {
            const response = await fetch('http://localhost:8000/archive');
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setArchiveMessage(data);
        } catch (error) {
            console.error('Error fetching tasks:', error);
        }
    };

    useEffect(() => {
        fetchData();
    }, [archiveMessage]);

    return (
        <List
            pagination={{ align: 'end' }}
            itemLayout="horizontal"
            dataSource={archiveMessage}
            renderItem={(item: ArchiveData) => (
                <List.Item>
                    <List.Item.Meta
                        title={`${item.number}. ${item.status} ${item.date}`}
                    />
                </List.Item>
            )}
        />
    );
};

export default ArchivePage;

