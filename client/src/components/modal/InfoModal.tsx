import { FC, useState} from 'react';
import { Modal, Button} from 'antd';


const InfoModal:FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

    return (
      <>
      <Button type="primary" onClick={showModal}>
        Description
      </Button>
      <Modal title="Abbilites description" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <p>You can see a status message on right part of your screen. There are 4 possible states: 1.OK; 2.Attention; 3.Error; 4.In progress</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Modal>
    </>
    )
};

export default InfoModal;