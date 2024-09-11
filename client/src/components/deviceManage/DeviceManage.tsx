import { Layout } from "antd";
import { Space, Table, Tag, Button, Flex, Popover } from 'antd';
import type { TableProps } from 'antd';
import { MailOutlined } from '@ant-design/icons';
import { FC, useEffect, useState } from "react";
import InfoModal from "../modal/InfoModal";
import classes from './DeviceManage.module.scss'
import { DeviceProps, DataType } from "../../style/styles";
const { Content } = Layout;

const DeviceManage:FC<DeviceProps> = ({send, data}) => {
    const columns: TableProps<DataType>['columns'] = [
        {
          title: 'Equipment name',
          dataIndex: 'name',
          key: 'name',
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
          render: (_, record) => {
            if (record.type === 'main pump') {
              return (
                <Space size="middle">
                  <Button disabled={mode} onClick={() => handleClickPump(record.key)}>
                    {pumps.pump1 ? 'on' : 'off'}
                  </Button>
                </Space>
              );
            } else if (record.type === 'backup pump') {
              return (
                <Space size="middle">
                  <Button disabled={mode} onClick={() => handleClickPump(record.key)}>
                    {pumps.pump2 ? 'on' : 'off'}
                  </Button>
                </Space>
              );
            } else {
              return null;
            }
          },
        }        
      ];
      
    const TableData: DataType[] = [
      {
        key: '1',
        name: 'Wilo-33/12',
        type: 'main pump',
        tags: ['ok'],
      },
      {
        key: '2',
        name: 'Wilo-33/12',
        type: 'backup pump',
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

    const stateInfo = (
      <div>
        <p>Green - OK</p>
        <p>Yellow - Attention</p>
        <p>Red -Error</p>
      </div>      
    )

    const [isPrimary, setIsPrimary] = useState<boolean[]>([true, false]);  
    const [mode, setMode] = useState<boolean>(true);
    const [pumps, setPumps] = useState({ pump1: false, pump2: false });
    const [color, setColor] = useState('green');

    const handleClickMode = (mode: boolean) => {
        if (mode) {
            send?.({mode: '1'});
            setMode(false)
            setIsPrimary([false, true]);
        } else {
            send?.({mode: '0'});
            setMode(true)            
            setIsPrimary([true, false]);  
        }
    }
  
    const handleClickPump = (pump: string) => {
        if (pump === '1') {
            const newState = !pumps.pump1; // Переключаем состояние насоса 1
            setPumps((prev) => ({ ...prev, pump1: newState }));
            send?.({ pump1: newState ? '1' : '0' }); // Отправляем состояние                
        } else if (pump === '2') {
            const newState = !pumps.pump2; // Переключаем состояние насоса 2
            setPumps((prev) => ({ ...prev, pump2: newState }));
            send?.({ pump2: newState ? '2' : '0' }); // Отправляем состояние
        } 
    };

    useEffect(() => {
      const newData = data?.split(" ");
      if (newData) {
          setColor(newData[7] === '1' ? 'green' : newData[8] === '1' ? 'yellow' : newData[9] === '1' ? 'red' : color);
      }
  }, [data]);

    return (
      <>      
        <Content>
          <h2 style={{textAlign: 'center'}}>Brest, Kirova, 122
            <Popover content={stateInfo} title='State info:'>
              <MailOutlined style={{color: color, marginLeft:'1em', cursor: 'pointer'}}/>
            </Popover>
          </h2>
           <Table columns={columns} dataSource={TableData} pagination={{ pageSize: 4 }}/>
           <Flex wrap gap="small" className={classes.antFlex} style={{height: '5em'}}>
                <Button type={isPrimary[0] ? 'primary' : 'default'} shape="circle" onClick={() => handleClickMode(false)}>
                    A
                </Button>
                <Button type={isPrimary[1] ? 'primary' : 'default'} shape="circle" onClick={() => handleClickMode(true)}>
                    M
                </Button>
                <InfoModal/>
            </Flex>
        </Content>
      </>
    );
};

export default DeviceManage;