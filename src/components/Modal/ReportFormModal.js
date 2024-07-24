import React, { useState } from 'react';
import { Modal, Select, Input, Button } from 'antd';
import { colors } from '../../assets/colors'; // 색상 경로 맞게 설정

const { TextArea } = Input;

const ReportModal = ({
  isModalOpen,
  handleCancel,
  onSubmit, // onSubmit 함수를 props로 받아옴
}) => {
  const [category, setCategory] = useState(null);
  const [contents, setContents] = useState('');

  const onCategoryChange = (value) => {
    setCategory(value);
    if (value !== 0) {
      const options = {
        1: '욕설/인신공격',
        2: '같은 내용 도배',
        3: '불법 정보',
        4: '개인 정보 노출',
        5: '부적절한 거래',
        6: '음란성/선정성',
        7: '업데이트',
      };
      setContents(options[value]);
    } else {
      setContents('');
    }
  };

  const onContentsChange = (e) => {
    setContents(e.target.value);
  };

  const handleOk = () => {
    onSubmit({ category, contents });
  };

  return (
    <Modal
      title={
        <div style={{ marginLeft: '30px', paddingTop: 20 }}>
          <p style={{ fontSize: 20, color: colors.text_black_color, fontWeight: 'bold' }}>
            신고하기
          </p>
        </div>
      }
      open={isModalOpen}
      okText="신고"
      onOk={handleOk} // handleOk 함수 호출
      cancelText="취소"
      onCancel={handleCancel}
      footer={
        <div>
          <Button key="cancel" onClick={handleCancel} style={{ marginRight: '10px' }}>
            취소
          </Button>
          <Button
            key="hide"
            type="primary"
            onClick={handleOk} // handleOk 함수 호출
            style={{
              backgroundColor: '#68568E',
              borderColor: '#68568E',
              color: '#FFFFFF',
            }}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = '#A499BB';
              e.target.style.borderColor = '#A499BB';
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = '#68568E';
              e.target.style.borderColor = '#68568E';
            }}
          >
            신고
          </Button>
        </div>
      }
    >
      <div style={{ padding: 30, textAlign: 'center' }}>
        <Select
          id="category"
          value={category}
          onChange={onCategoryChange}
          placeholder="신고 사유를 선택해주세요"
          size="large"
          style={{ width: '100%' }}
        >
          <Select.Option value={1}>욕설/인신공격</Select.Option>
          <Select.Option value={2}>같은 내용 도배</Select.Option>
          <Select.Option value={3}>불법 정보</Select.Option>
          <Select.Option value={4}>개인 정보 노출</Select.Option>
          <Select.Option value={5}>부적절한 거래</Select.Option>
          <Select.Option value={6}>음란성/선정성</Select.Option>
          <Select.Option value={7}>업데이트</Select.Option>
          <Select.Option value={0}>기타</Select.Option>
        </Select>
        {category === 0 && (
          <TextArea
            id="contents"
            value={contents}
            onChange={onContentsChange}
            placeholder="신고 사유에 해당되지 않지만 이용 규칙에 맞지 않는다고 판단되신다면 해당 내용을 상세하게 작성해주세요."
            autoSize={{ minRows: 5 }}
            style={{ marginTop: 20 }}
          />
        )}
      </div>
    </Modal>
  );
};

export default ReportModal;
