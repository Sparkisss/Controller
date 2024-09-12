import { FC} from "react";
import { Flex, Layout} from 'antd';
import ArchiveWindow from "../components/archiveWindow/ArchiveWindow";
import DeviceManage from "../components/deviceManage/DeviceManage";
import { DeviceProps } from "../style/styles";

const DeviceDataPage: FC<DeviceProps> = ({ data }) => {
    return (
        <>
            <Flex>                          
                <Layout>
                    <ArchiveWindow data={data}/>
                    <DeviceManage data={data}/>
                </Layout>               
            </Flex>
        </>
    );
};

export default DeviceDataPage;