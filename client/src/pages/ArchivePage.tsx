import { List } from 'antd';
import { FC, useEffect, useState } from 'react';
import { ArchiveData } from '../style/styles';
import { fetchData } from '../API/api';

const ArchivePage: FC<any> = () => {
    const [archiveMessage, setArchiveMessage] = useState<ArchiveData[]>([]);

    useEffect(() => {
        const getData = async() => {
            const data = await fetchData();
            setArchiveMessage(data);
        };
        getData();
    }, []);

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

