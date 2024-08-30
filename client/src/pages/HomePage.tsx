import { Navigate, Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { removeUser } from '../store/slices/userSlice';
import { useAppDispatch } from '../hooks/reduxHooks';
import { Button, Avatar, List } from 'antd';
import {LogoutOutlined, ControlOutlined, BookOutlined, CameraOutlined, SolutionOutlined } from '@ant-design/icons';

const HomePage = () => {
    const dispatch = useAppDispatch();
    const {isAuth, email} = useAuth();

    const data = [
        {
          title: 'Device data page',
          description: 'You can get all information about the object and manage it.',
          link: '/device',
          icon: <ControlOutlined />,
        },
        {
          title: 'Archive page',
          description: 'You can see all the important events that have happened throughout time.',
          link: '/archive',
          icon: <BookOutlined />,
        },
        {
          title: 'Slider page',
          description: 'You can see photos of the devices that are on object',
          link: '/slider',
          icon: <CameraOutlined />,
        },
        {
          title: 'Task page',
          description: "You can see the tasks that we have to do on the object.",
          link: '/tasks',
          icon: <SolutionOutlined />,
        },
      ];
   
   
    return isAuth ? (
        <main>
            <h1>Welcome {email}</h1>

            <List
                itemLayout="horizontal"
                dataSource={data}
                renderItem={(item) => (
                <List.Item>
                    <List.Item.Meta                                    
                    avatar={<Avatar icon={item.icon} />}
                    title={<Link to={item.link}>{item.title}</Link>}
                    description={item.description}
                    />
                </List.Item>
                )}
            />
            <Button
                style={{width: '100%'}} 
                type='primary' 
                shape='round' 
                size='large'
                disabled={!isAuth}
                onClick={() => dispatch(removeUser())}
                icon={<LogoutOutlined />}>
                LogOut
            </Button>
        </main>
    ) : (        
        <Navigate to="/login" replace={true}/>        
    );
};

export default HomePage;