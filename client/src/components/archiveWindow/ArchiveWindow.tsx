import { Layout } from "antd";
import { FC } from "react";
const { Sider } = Layout;

interface Message {
    message: string;
    date: string;
}

interface ArchiveWindowProps {
    num: number;
    messages: Message[];
}

const ArchiveWindow: FC<ArchiveWindowProps> = ({ num, messages }) => {
    return (
        <Sider>
            <h3>Event archive:</h3>
            {messages.map((msg, index) => (
                <div key={index}>
                    {msg.message ? `${index + num}: ${msg.message}-${msg.date}` : null}
                </div>
            ))}
        </Sider>
    );
};

export default ArchiveWindow;
