import { FC} from "react";
import { Flex, Layout} from 'antd';
import ArchiveWindow from "../components/archiveWindow/ArchiveWindow";
import { DeviceProps } from "../style/styles";
import DeviceManage from "../components/deviceManage/DeviceManage";

const DeviceDataPage: FC<DeviceProps> = ({data, send}) => {
    return (
        <>
            <Flex>                          
                <Layout>
                    <ArchiveWindow data={data}/>
                    <DeviceManage send={send} data={data}/>
                </Layout>               
            </Flex>
        </>
    );
};

export default DeviceDataPage;