import { Layout } from "antd";
import { Space, Table, Tag, Button, Flex } from 'antd';
import type { TableProps } from 'antd';
import { FC, useState } from "react";
import classes from './DeviceManage.module.scss'
import { DeviceProps } from "../../style/styles";

const { Content } = Layout;

interface DataType {
    key: string;
    name: string;
    type: string;
    tags: string[];
  }

const DeviceManage:FC<DeviceProps> = ({send}) => {
    const columns: TableProps<DataType>['columns'] = [
        {
          title: 'Equipment name',
          dataIndex: 'name',
          key: 'name',
          render: (text) => <a>{text}</a>,
        },
        {
          title: 'Type',
          dataIndex: 'type',
          key: 'type',
        },
        {
          title: 'State',
          key: 'tags',
          dataIndex: 'tags',
          render: (_, { tags }) => (
            <>
              {tags.map((tag) => {
                let color = tag.length > 5 ? 'geekblue' : 'green';
                if (tag === 'broken') {
                  color = 'volcano';
                }
                if (tag === 'service') {
                    color = 'yellow'
                }
                return (
                  <Tag color={color} key={tag}>
                    {tag.toUpperCase()}
                  </Tag>
                );
              })}
            </>
          ),
        },
        {
          title: 'Action',
          key: 'action',
          render: (_, record) => (
            record.type === 'pump' ? 
                <Space size="middle">          
                    <Button disabled={mode} onClick={() => handleClickPump(record.key)}>{3}</Button>
                </Space>
                :
                null        
          ),
        },
      ];
      
      const data: DataType[] = [
        {
          key: '1',
          name: 'Wilo-33/12',
          type: 'pump',
          tags: ['ok'],
        },
        {
          key: '2',
          name: 'Wilo-33/12',
          type: 'pump',
          tags: ['broken', 'repairs'],
        },
        {
          key: '3',
          name: 'RELETEK RS-LC3',
          type: 'liquid sensor',
          tags: ['service', '10.10.24'],
        },
        {
            key: '4',
            name: 'EKM 100 VM',
            type: 'dry run. sensor',
            tags: ['ok'],
        },
        {
            key: '5',
            name: 'EKM 100 VM',
            type: 'dry run. sensor',
            tags: ['ok'],
        },
        {
            key: '6',
            name: 'EKM 100 VM',
            type: 'dry run. sensor',
            tags: ['ok'],
        },
      ];

    const [mode, setMode] = useState<boolean>(true);
    const handleClickMode = (mode: boolean) => {
        if (mode) {
            send?.({mode: '1'});
            setMode(false)
        } else {
            send?.({mode: '0'});
            setMode(true)
        }
    }
    
    const [pumps, setPumps] = useState({ pump1: false, pump2: false });

    const handleClickPump = (pump: string) => {
        if (pump === '1') {
            const newState = !pumps.pump1; // Переключаем состояние насоса 1
            setPumps((prev) => ({ ...prev, pump1: newState }));
            send?.({ pump1: newState ? '1' : '0' }); // Отправляем состояние
        } else if (pump === '2') {
            const newState = !pumps.pump2; // Переключаем состояние насоса 2
            setPumps((prev) => ({ ...prev, pump2: newState }));
            send?.({ pump2: newState ? '2' : '0' }); // Отправляем состояние
        } else {
            console.log('Error button');
        }
    };

    return (
        <Content>
           <Table columns={columns} dataSource={data} pagination={{ pageSize: 4 }}/>
           <Flex wrap gap="small" className={classes.antFlex} style={{height: '5em'}}>
                <Button type="primary" shape="circle" onClick={() => handleClickMode(false)}>
                    A
                </Button>
                <Button shape="circle" onClick={() => handleClickMode(true)}>
                    M
                </Button>
                <Button type="primary">
                    Description
                </Button>
            </Flex>
        </Content>
    );
};

export default DeviceManage;