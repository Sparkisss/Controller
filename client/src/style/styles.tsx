export interface DeviceProps {
    data: string;
}

export type CoreCommand = {
    stand: string | number
    value: string | number
}
  
export interface SendParams {
    mode?: string;
    pump1?: string;
    pump2?: string;
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

export interface ArchiveData {
  number: number;
  status: string;
  date: string;
}

export interface Message {
  message: string;
  date: string;
}

export interface ArchiveWindowProps {
  num: number;
  messages: Message[];
}

export type ImageSliderProps = {
  imagesUrls: string[];
}
