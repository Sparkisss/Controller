import { FC} from "react";
import { Flex, Layout} from 'antd';
import ArchiveWindow from "../components/archiveWindow/ArchiveWindow";
import DeviceManage from "../components/deviceManage/DeviceManage";

const DeviceDataPage: FC<any> = ({num, messages, data, send}) => {
    return (
        <>
            <Flex>                          
                <Layout>
                    <ArchiveWindow num={num} messages={messages}/>
                    <DeviceManage send={send} data={data}/>
                </Layout>               
            </Flex>
        </>
    );
};

export default DeviceDataPage;