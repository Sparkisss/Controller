import { Layout } from "antd";
import { FC } from "react";
import { useGetMessage } from "../../hooks/useGetMessage";
import { DeviceProps} from "../../style/styles";
const { Sider } = Layout;

const ArchiveWindow: FC<DeviceProps> = ({data}) => {
    const {messages, num} = useGetMessage(data);
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
