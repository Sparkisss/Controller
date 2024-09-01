import { FC, useState} from 'react';
import { LockOutlined, MailOutlined } from '@ant-design/icons';
import { Button, Form, Input} from 'antd';
import { FormData } from '../../style/styles';

const MyForm: FC<FormData> = ({title, handleClick}) => {
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');

    const onFinish = () => {
        handleClick(email, pass);
    };

  return (
    <Form
        name="login"
        initialValues={{ remember: false }}
        onFinish={onFinish}
    >
        <Form.Item
            name="email"
            rules={[{ required: true, message: 'Please input your Username!' }]}
        >
            <Input 
                prefix={<MailOutlined />} 
                placeholder="Email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}/>
        </Form.Item>

        <Form.Item
            name="password"
            rules={[{ required: true, message: 'Please input your Password!' }]}
        >
            <Input 
                prefix={<LockOutlined />} 
                type="password" 
                placeholder="Password"
                value={pass} 
                onChange={(e) => setPass(e.target.value)}/>
        </Form.Item>

        <Form.Item>
            <Button block type="primary" htmlType="submit">
                {title}
            </Button>
        </Form.Item>
    </Form>
  );
};


export default MyForm;