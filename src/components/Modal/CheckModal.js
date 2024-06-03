import React, { useState } from 'react';
import { Modal, message } from 'antd';

const CheckModal = (props) => {
  const { isOpen, setModalOpened, onDeleteConfirmed, onCancel } = props;

  const [confirmLoading, setConfirmLoading] = useState(false);
  const [modalText, setModalText] = useState(props.modalText);

  const handleOk = () => {
    setModalText('게시글을 삭제중입니다');
    setConfirmLoading(true);
    setTimeout(() => {
      setConfirmLoading(false);
      onDeleteConfirmed(); // onDeleteConfirmed 함수 호출
      message.success('게시글이 삭제되었습니다.');
      setModalOpened(false); // 모달을 닫습니다.
    }, 2000);
  };

  const handleCancel = () => {
    console.log('Clicked cancel button');
    onCancel();
    setModalOpened(false); // 모달을 닫습니다.
  };

  return (
    <>
      <Modal
        title="게시글 삭제"
        visible={isOpen}
        onOk={handleOk}
        okText="삭제" // 확인 버튼 텍스트 변경
        cancelText="취소"
        okButtonProps={{ loading: confirmLoading }} // 확인 버튼 로딩 상태 설정
        onCancel={handleCancel} // 취소 버튼 클릭 시 호출되는 함수
      >
        <p style={{marginTop: '25px'}}>{modalText}</p>
      </Modal>
    </>
  );
};

export default CheckModal;
