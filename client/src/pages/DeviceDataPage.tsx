import { FC } from "react";

interface DeviceProps {
    data: any;
}

const DeviceDataPage: FC<DeviceProps> = ({data}) => {
    return (
        <div>
            device data {data}
        </div>
    );
};

export default DeviceDataPage;