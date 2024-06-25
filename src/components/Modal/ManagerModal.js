import React, { useState } from 'react';
import { Button, Modal, Input, Rate } from 'antd';

const ManagerModal = ({ modalTitle, modalContent, isModalOpen, handleOk, handleCancel, role, isReviewMode }) => {
  const { TextArea } = Input;
  const [attitudeRating, setAttitudeRating] = useState(0);
  const [focusRating, setFocusRating] = useState(0);
  const [punctualityRating, setPunctualityRating] = useState(0);

  const rateContainerStyle = {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '20px'
  };

  const labelStyle = {
    width: '80px', // 적당한 너비로 조정
    textAlign: 'left',
    marginRight: '10px'
  };

  return (
    <Modal
      title={modalTitle}
      visible={isModalOpen}
      onCancel={handleCancel}
      footer={[
        <Button key="cancel" onClick={handleCancel}>
          취소
        </Button>,
        <Button key="ok" type="primary" onClick={handleOk}>
          확인
        </Button>,
      ]}
    >
      {isReviewMode ? (
        <>
          <TextArea 
            placeholder={role === 1 ? "선생님과의 과외 후기 내용을 적어주세요" : "학생과의 과외 후기 내용을 적어주세요"}
            rows={2}
            showCount
            maxLength={200}
            style={{
              height: 120,
              resize: 'none',
            }}  
          />
          <div style={{ marginTop: 20 }}>
            <div style={rateContainerStyle}>
              <span style={labelStyle}>{role === 1 ? '수업 내용' : '참여 태도'}</span>
              <Rate onChange={setAttitudeRating} value={attitudeRating} />
            </div>
            <div style={rateContainerStyle}>
              <span style={labelStyle}>{role === 1 ? '준비성' : '과제 수행'}</span>
              <Rate onChange={setFocusRating} value={focusRating} />
            </div>
            <div style={rateContainerStyle}>
              <span style={labelStyle}>시간 준수</span>
              <Rate onChange={setPunctualityRating} value={punctualityRating} />
            </div>
          </div>
        </>
      ) : (
        <span>{modalContent}</span>
      )}
    </Modal>
  );
};

export default ManagerModal;
