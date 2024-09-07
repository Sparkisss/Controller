import { Avatar, List } from 'antd';
import { FC } from 'react';

const ArchivePage: FC = () => {
    const data = [
        {
            number: 1,
            status: 'OK',
            date: '07/09/2024',
            time: '19:10',
        },
        {
            number: 2,
            status: 'OK',
            date: '08/09/2024',
            time: '19:55',
        },
        {
            number: 3,
            status: 'Attention',
            date: '09/09/2024',
            time: '11:10',
        },
        {
            number: 4,
            status: 'Error',
            date: '17/09/2024',
            time: '09:10',
        },
    ];

    return (
        <List
            pagination={{align: 'end'}}
            itemLayout="horizontal"
            dataSource={data}
            renderItem={(item) => (
                <List.Item>
                    <List.Item.Meta                       
                        title={item.number + ' ' + item.status + ' ' +  item.date + ' ' + item.time}
                    />
                </List.Item>
            )}
        />
    );
};

export default ArchivePage;
