import { FC } from 'react';
import { Typography, Button, Flex } from 'antd';
import {PieChartOutlined, LogoutOutlined} from '@ant-design/icons';
import classes from './Header.module.scss';

const Header: FC = () => {
    return (
        <header className={classes.header}>
            <Flex justify="space-between" align="center">            
                <PieChartOutlined style={{ fontSize: '3em', color: 'red' }}/>
                <Typography.Text strong style={{ fontSize: '3em' }}>Controller</Typography.Text>
                <Button type='primary' shape='round' size='large' icon={<LogoutOutlined />}>LogOut</Button>
            </Flex>
        </header>
    );
};

export default Header;