import { FC } from 'react';
import { Empty } from 'antd';

const NotFound: FC = () => {
    return (        
        <Empty description='Page not found!' image={Empty.PRESENTED_IMAGE_SIMPLE}/>        
    );
};

export default NotFound;