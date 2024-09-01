export interface DeviceProps {
    data?: string;
    send?: any;
}

export type CoreCommand = {
    stand: string | number
    value: string | number
  }
  
export interface SendParams {
    mode?: any;
    pump1?: any;
    pump2?: any;
  }

export interface FormData {
    title: string;
    handleClick: (email:string, pass: string) => void;
}

export interface DataType {
    key: string;
    name: string;
    type: string;
    tags: string[];
}