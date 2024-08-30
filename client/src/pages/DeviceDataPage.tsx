import { FC } from "react";
import { Flex, Layout, Avatar, List } from 'antd';
const { Sider, Content } = Layout;

interface DeviceProps {
    data: any;
}

const DB = [
    {
      title: 'Ant Design Title 1',
    },
    {
      title: 'Ant Design Title 2',
    },
    {
      title: 'Ant Design Title 3',
    },
    {
      title: 'Ant Design Title 4',
    },
  ];

const DeviceDataPage: FC<DeviceProps> = ({data}) => {
    const info = data.split(" ");
    return (
        <>
            <Flex>                          
                <Layout>
                    <Sider>
                        <h3>Event archive:</h3>
                        {info.map((item: any, i: any) => (
                            <div key={i}>{item}</div>
                        ))}
                        
                    </Sider>
                    <Content >Content</Content>
                </Layout>               
            </Flex>
        </>
    );
};

export default DeviceDataPage;