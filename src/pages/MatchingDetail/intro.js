import React, { useState } from "react";
import style from "./MatchingDetail.module.css";
import { useMediaQuery } from "react-responsive";
import { Tabs, Modal, Input, Form, Button, Select, message, Dropdown, Menu} from 'antd';
import { FaRegBookmark, FaBookmark } from "react-icons/fa";
import { TfiWrite } from "react-icons/tfi";
import { FaRegPaperPlane } from "react-icons/fa";
import Studyintro from "./studyintro";
import Selfintro from "./selfintro";
import Reviewintro from "./reviewintro";
import axios from 'axios'; // axios를 이용해 서버와 통신
import { useNavigate } from "react-router-dom"; // 페이지 이동
import { useSetRecoilState } from "recoil";
import { MessageReceiverAtom } from "../../recoil/atoms/message"; // Recoil 상태 관리
import { IoMdMore } from "react-icons/io";

const { TextArea } = Input;

const ApplyModal = ({ visible, onCancel, onApply, profile }) => {
  const [form] = Form.useForm();

  const handleApply = () => {
    form.validateFields().then(values => {
      onApply({
        ...values,
        fee: values.fee.replace(/,/g, ''), // 쉼표 제거 후 숫자로 변환하여 저장
      });
      form.resetFields();
    });
  };

  const handleFeeChange = (e) => {
    const value = e.target.value;
    const formattedValue = value.replace(/\D/g, '').replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    form.setFieldsValue({ fee: formattedValue });
  };

  const methodOptions = [];
  if (profile.method === 0) methodOptions.push("대면");
  if (profile.method === 1) methodOptions.push("비대면");
  if (profile.method === 2) methodOptions.push("블렌딩");

  return (
    <Modal
      visible={visible}
      title="과외 신청하기"
      onCancel={onCancel}
      footer={[
        <Button key="cancel" onClick={onCancel}>
          취소
        </Button>,
        <Button key="apply" type="primary" onClick={handleApply}>
          신청
        </Button>
      ]}
    >
      <Form form={form} layout="vertical" style={{ marginTop: '20px' }}>
        <Form.Item
          name="subject"
          label="과목"
          rules={[{ required: true, message: '원하는 과목을 선택해주세요.' }]}
        >
          <Select
            placeholder="과목을 선택하세요"
            mode="multiple"
          >
            {profile.subject.map(sub => (
              <Select.Option key={sub} value={sub}>
                {sub}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          name="location"
          label="지역"
          rules={[{ required: true, message: '원하는 지역을 선택해주세요.' }]}
        >
          <Select
            placeholder="지역을 선택하세요"
            mode="multiple"
          >
            <Select.Option value={profile.location1}>
              {profile.location1}
            </Select.Option>
          </Select>
        </Form.Item>
        <Form.Item
          name="method"
          label="과외 방식"
          rules={[{ required: true, message: '원하는 과외 방식을 선택해주세요.' }]}
        >
          <Select
            placeholder="과외 방식을 선택하세요"
            mode="multiple"
          >
            {methodOptions.map(method => (
              <Select.Option key={method} value={method}>
                {method}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          name="requirements"
          label="과외일정"
        >
          <TextArea 
              placeholder="원하는 과외 일정을 입력해주세요" 
              rows={4}
              showCount
              maxLength={100}
              style={{
                height: 100,
                resize: 'none',
              }} />
        </Form.Item>
        <Form.Item
          name="fee"
          label="과외비"
          rules={[{ required: true, message: '과외비를 입력해주세요.' }]}
        >
          <Input placeholder="과외비를 입력하세요" onChange={handleFeeChange} suffix="원"/>
        </Form.Item>
        <Form.Item
          name="additionalRequirements"
          label="추가 요구 사항"
        >
          <TextArea 
              placeholder="추가 요구 사항을 입력해주세요" 
              rows={4}
              showCount
              maxLength={100}
              style={{
                height: 100,
                resize: 'none',
                marginBottom: '20px'
              }} />
        </Form.Item>
      </Form>
    </Modal>
  );
};

const Intro = ({ profile }) => {
  const isDesktopOrLaptop = useMediaQuery({ minWidth: 992 });
  const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 991 });
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const isNotMobile = useMediaQuery({ minWidth: 768 });

  const navigate = useNavigate();
  const setMessageReceiver = useSetRecoilState(MessageReceiverAtom);

  const [tab, setTab] = useState('1');
  const [isScrapped, setIsScrapped] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleTab = (value) => {
    setTab(value);
  };

  const handleScrapClick = () => {
    setIsScrapped(!isScrapped);
  };

  const handleApplyClick = () => {
    setIsModalVisible(true);
  };

  const handleModalCancel = () => {
    setIsModalVisible(false);
  };

  const handleModalApply = (values) => {
    console.log('과외 신청 데이터:', values);
    
    // 서버에 데이터 전송
    axios.post('/api/tutoring-requests', {
      ...values,
      profileId: profile.id, // 신청 대상 프로필의 ID
      requesterId: currentUserId // 신청자의 ID
    })
    .then(response => {
      console.log('과외 신청 성공:', response.data);
      message.success('과외 신청이 성공적으로 전송되었습니다.');
    })
    .catch(error => {
      console.error('과외 신청 실패:', error);
      message.error('과외 신청 중 오류가 발생했습니다.');
    });

    setIsModalVisible(false);
  };

  const handleSendMessageClick = () => {
    setMessageReceiver(profile.nickname);
    navigate('/message');
  };

  const currentUserRole = 2; // 예시로 현재 사용자가 멘티일 경우 1로 설정합니다.
  const currentUserId = 123; // 예시로 현재 사용자의 ID를 설정합니다.

  const menu = (
    <Menu>
      <Menu.Item key="1" style={{ borderBottom: "none" }}>
          신고
      </Menu.Item>
    </Menu>
  );

  return (
    <div style={{ marginLeft: !isMobile ? '30px' : '', marginTop: '20px' }}>
      <div className={style.head}>

        <div style={{ fontSize: '25px', fontWeight: '600' }}>프로필 상세보기</div>
        <div style={{ display: 'flex' }}>
          <div style={{ marginRight: '10px' }}>
            <div className={style.bookmark}>
              {isScrapped && <FaBookmark style={{ color: '68568E' }} />}
            </div>
          </div>
          <div style={{display:'flex', justifyContent:'flex-end', fontSize:'30px', marginRight:'10px'}}>
            <Dropdown overlay={menu} trigger={['click']} placement="bottomRight" arrow>
                    <IoMdMore style={{ cursor: 'pointer'}} />
            </Dropdown>
          </div>  
        </div>
      </div>
      <div className={style.horizon}>
        <div className={`${style.mincircle} ${style.mincircleImage}`}>
          <img src={profile.img} alt="유저이미지" />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <div className={style.writer}>{profile.nickname}</div>
          <div className={style.introduction}>{profile.introduction}</div>
        </div>
      </div>

      <div className={style.reaction}>
        <div className={style.like} onClick={handleScrapClick} >
          {isScrapped ? <FaBookmark style={{ color: '68568E' }} /> : <FaRegBookmark />} <span style={{ marginLeft: "10px", marginRight: "10px", color: isScrapped ? '#68568E' : 'gray' }}>스크랩</span>
        </div>
        {profile.role !== currentUserRole && (
          <>
            <span style={{ opacity: '0.3' }}> | </span>
            <div className={style.like} onClick={handleApplyClick} >
              <TfiWrite /><span style={{ marginLeft: "10px", marginRight: "10px" }}>과외 신청</span>
            </div>
          </>
        )}
        <span style={{ opacity: '0.3' }}> | </span>
        <div className={style.like} onClick={handleSendMessageClick}>
          <FaRegPaperPlane /><span style={{ marginLeft: "10px", marginRight: "10px" }}>쪽지 보내기</span>
        </div>
      </div>

      <Tabs
        defaultActiveKey="1"
        type="card"
        size={"large"}
        onChange={handleTab}
        items={[
          { label: '과외 소개', key: '1' },
          { label: '본인 소개', key: '2' },
          { label: '리뷰', key: '3' },
        ]}
        style={{ flex: 1, marginTop: '25px' }}
      />

      {tab === '1' && <Studyintro profile={profile} />}
      {tab === '2' && <Selfintro profile={profile} />}
      {tab === '3' && <Reviewintro profile={profile} />}

      <ApplyModal
        visible={isModalVisible}
        onCancel={handleModalCancel}
        onApply={handleModalApply}
        profile={profile}
      />
    </div>
  );
};

export default Intro;
