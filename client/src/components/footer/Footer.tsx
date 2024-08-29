import { FC } from 'react';
import { Typography, Flex } from 'antd';
import {PieChartOutlined, SkypeOutlined, LinkedinOutlined, 
        InstagramOutlined, GithubOutlined, FacebookOutlined} from '@ant-design/icons';

const Footer: FC = () => {
    return (
        <footer style={{paddingBottom: '1em'}}>
            <Flex vertical justify="center" align="center" gap='middle'>
                <div>
                    <PieChartOutlined style={{ fontSize: '1em', color: 'red', paddingRight: '0.5em' }}/>
                    <Typography.Text strong >Controller by Igor Siamykin</Typography.Text>
                </div>  
                <Flex gap='middle'>
                    <SkypeOutlined />
                    <LinkedinOutlined />
                    <InstagramOutlined />
                    <GithubOutlined />
                    <FacebookOutlined />
                </Flex>
            </Flex>
        </footer>
    );
};

export default Footer;