import React, { useEffect, useState } from "react";
import style from "./MatchingDetail.module.css";
import { useMediaQuery } from "react-responsive";
import { Tabs, Modal, Input, Form, Button, Select, message, Dropdown, Menu } from 'antd';
import { FaRegBookmark, FaBookmark } from "react-icons/fa";
import { TfiWrite } from "react-icons/tfi";
import { FaRegPaperPlane } from "react-icons/fa";
import Studyintro from "./studyintro";
import Reviewintro from "./reviewintro";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { MessageReceiverAtom, MessageReceiveridAtom, MessageViewStatusAtom } from "../../recoil/atoms/message";
import { IoMdMore } from "react-icons/io";
import ReportModal from "../../components/Modal/ReportFormModal"; // 경로 맞게 설정

const { TextArea } = Input;

const ApplyModal = ({ visible, onCancel, onApply, profile }) => {
  const [form] = Form.useForm();

  const handleApply = () => {
    form.validateFields().then(values => {
      const subjects = values.subject || [];
      const locations = values.location || [];
      const formattedValues = {
        ...values,
        tutoringFee: values.tutoringFee.replace(/,/g, ''),
        subject1: subjects[0] || '',
        subject2: subjects[1] || '',
        subject3: subjects[2] || '',
        subject4: subjects[3] || '',
        subject5: subjects[4] || '',
        location1: locations[0] || '',
        location2: locations[1] || '',
        location3: locations[2] || ''
      };

      delete formattedValues.subject;
      delete formattedValues.location;

      onApply(formattedValues);
      form.resetFields();
    });
  };

  const handleFeeChange = (e) => {
    const value = e.target.value;
    const formattedValue = value.replace(/\D/g, '').replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    form.setFieldsValue({ tutoringFee: formattedValue });
  };

  const methodOptions = ["대면", "비대면", "블렌딩"].filter(option => profile.method.includes(option));

  return (
    <Modal
      visible={visible}
      title="과외 신청하기"
      onCancel={onCancel}
      footer={[
        <Button key="cancel" onClick={onCancel}>취소</Button>,
        <Button key="apply" type="primary" onClick={handleApply}>신청</Button>
      ]}
    >
      <Form form={form} layout="vertical" style={{ marginTop: '20px' }}>
        <Form.Item
          name="subject"
          label="과목"
          rules={[{ required: true, message: '원하는 과목을 선택해주세요.' }]}
        >
          <Select placeholder="과목을 선택하세요" mode="multiple">
            {[profile.subject1, profile.subject2, profile.subject3, profile.subject4, profile.subject5].filter(Boolean).map(sub => (
              <Select.Option key={sub} value={sub}>{sub}</Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          name="location"
          label="지역"
          rules={[{ required: true, message: '원하는 지역을 선택해주세요.' }]}
        >
          <Select placeholder="지역을 선택하세요" mode="multiple">
            {[profile.location1, profile.location2, profile.location3].filter(Boolean).map(loc => (
              <Select.Option key={loc} value={loc}>{loc}</Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          name="method"
          label="과외 방식"
          rules={[{ required: true, message: '원하는 과외 방식을 선택해주세요.' }]}
        >
          <Select placeholder="과외 방식을 선택하세요">
            {methodOptions.map(method => (
              <Select.Option key={method} value={method}>{method}</Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item name="schedule" label="과외일정">
          <TextArea 
            placeholder={`원하는 과외 일정을 입력해주세요\n\n예1 ) 1주일에 2번 2시간씩\n예2 )월요일, 수요일, 금요일 18:00~21:00\n`} 
            rows={4} showCount maxLength={100} style={{ height: 100, resize: 'none' }} 
          />
        </Form.Item>
        <Form.Item
          name="tutoringFee"
          label="과외비"
          rules={[{ required: true, message: '과외비를 입력해주세요.' }]}
        >
          <Input placeholder="과외비를 입력하세요" onChange={handleFeeChange} suffix="원"/>
        </Form.Item>
        <Form.Item name="contents" label="추가 요구 사항">
          <TextArea 
            placeholder={`추가 요구 사항을 입력해주세요\n\n예) 과외 방식 및 위치, 과외비 등 과외와 관련된 자세한 내용을 입력해주세요`}  
            rows={4} showCount maxLength={100} style={{ height: 100, resize: 'none', marginBottom: '20px' }} 
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};

const Intro = () => {
  const isDesktopOrLaptop = useMediaQuery({ minWidth: 992 });
  const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 991 });
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const isNotMobile = useMediaQuery({ minWidth: 768 });

  const navigate = useNavigate();
  const setMessageReceiver = useSetRecoilState(MessageReceiverAtom);
  const setMessageReceiverid = useSetRecoilState(MessageReceiveridAtom);
  const setMessageViewStatus = useSetRecoilState(MessageViewStatusAtom);

  const [tab, setTab] = useState('1');
  const [isScrapped, setIsScrapped] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isReportModalVisible, setIsReportModalVisible] = useState(false);
  const [form, setForm] = useState({ category: { value: null }, contents: { value: '' } });

  const [profile, setProfile] = useState(() => {
    const storedProfile = sessionStorage.getItem('selectedProfile');
    return storedProfile ? JSON.parse(storedProfile) : {};
  });

  const currentUserId = sessionStorage.getItem('user_profile_id');
  const currentUserRole = sessionStorage.getItem('role');
  const accessToken = sessionStorage.getItem('accessToken');

  useEffect(() => {
    setIsScrapped(profile.scrap === 1);
  }, [profile]);

  const handleTab = (value) => setTab(value);

  const handleScrapClick = () => {
    const scrapId = profile.id;
    const apiEndpoint = currentUserRole === '2' ? '/scrap/mentor' : '/scrap/mentee';
    const data = new URLSearchParams({
      scrapId,
      requesterId: currentUserId,
    });

    axios.post(apiEndpoint, data, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Bearer ${accessToken}`
      }
    })
    .then(() => {
      setIsScrapped(!isScrapped);
      message.success('스크랩이 성공적으로 처리되었습니다.');
    })
    .catch(error => {
      console.error('스크랩 실패:', error);
      message.error('스크랩 중 오류가 발생했습니다.');
    });
  };

  const handleApplyClick = () => setIsModalVisible(true);
  const handleModalCancel = () => setIsModalVisible(false);

  const handleModalApply = (values) => {
    const requestData = {
      ...values,
      mentor: currentUserRole === '2' ? profile.id : null,
      mentee: currentUserRole === '1' ? profile.id : null,
      profileId: profile.id,
      requesterId: currentUserId,
      user_profile_id: profile.id
    };

    const params = new URLSearchParams();
    for (const key in requestData) {
      if (requestData[key] !== null && requestData[key] !== undefined) {
        params.append(key, requestData[key]);
      }
    }

    const apiEndpoint = currentUserRole === '2' 
      ? '/matching/application/mentor'
      : '/matching/application/mentee';

    axios.post(apiEndpoint, params, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Bearer ${accessToken}`
      }
    })
    .then(response => {
      message.success('과외 신청이 성공적으로 전송되었습니다.');
    })
    .catch(error => {
      console.error('과외 신청 실패:', error);
      message.error('과외 신청 중 오류가 발생했습니다.');
    });

    setIsModalVisible(false);
  };

  const handleSendMessageClick = () => {
    setMessageViewStatus(false);
    setMessageReceiver(profile);
    setMessageReceiverid(profile.id);
    navigate('/message');
  };

  const handleReportClick = () => setIsReportModalVisible(true);
  const handleReportCancel = () => setIsReportModalVisible(false);

  const handleReportSubmit = async ({ category, contents }) => {
    if (category == null || (category === 0 && contents.trim() === '')) {
      message.error('신고 사유를 선택하거나 입력해주세요');
      return;
    }

    const options = {
      1: '욕설/인신공격',
      2: '같은 내용 도배',
      3: '불법 정보',
      4: '개인 정보 노출',
      5: '부적절한 거래',
      6: '음란성/선정성',
      7: '업데이트',
      0: contents
    };

    const data = new URLSearchParams({
      toUserId: profile.id,
      type: 1,
      typeId: profile.id,
      category,
      contents: options[category]
    });

    try {
      await axios.post('http://localhost:8080/report', data, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      });
      message.success('신고가 성공적으로 접수되었습니다.');
      setIsReportModalVisible(false);
    } catch (error) {
      message.error('신고 중 오류가 발생했습니다.');
      console.error('신고 오류:', error);
    }
  };

  const menu = (
    <Menu>
      <Menu.Item key="1" style={{ borderBottom: "none" }} onClick={handleReportClick}>신고</Menu.Item>
    </Menu>
  );

  return (
    <div style={{ marginTop: '20px', marginBottom: '20px' }}>
      <div className={style.head}>
        <div style={{ fontSize: '25px', fontWeight: '600' }}>프로필 상세보기</div>
        <div style={{ display: 'flex' }}>
          <div style={{ marginRight: '10px' }}>
            <div className={style.bookmark}>
              {isScrapped && <FaBookmark style={{ color: '68568E' }} />}
            </div>
          </div>
          <div style={{ display: 'flex', justifyContent: 'flex-end', fontSize: '30px', marginRight: '10px' }}>
            <Dropdown overlay={menu} trigger={['click']} placement="bottomRight" arrow>
              <IoMdMore style={{ cursor: 'pointer' }} />
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
        <div className={style.like} onClick={handleScrapClick}>
          {isScrapped ? <FaBookmark style={{ color: '68568E' }} /> : <FaRegBookmark />} 
          <span style={{ marginLeft: "10px", marginRight: "10px", color: isScrapped ? '#68568E' : 'gray' }}>스크랩</span>
        </div>
        {profile.role !== currentUserRole && (
          <>
            <span style={{ opacity: '0.3' }}> | </span>
            <div className={style.like} onClick={handleApplyClick}>
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
          { label: '소개', key: '1' },
          { label: '리뷰', key: '2' },
        ]}
        style={{ flex: 1, marginTop: '25px' }}
      />

      {tab === '1' && <Studyintro />}
      {tab === '2' && <Reviewintro profile={profile} reviews={profile.reviews} />}

      <ApplyModal
        visible={isModalVisible}
        onCancel={handleModalCancel}
        onApply={handleModalApply}
        profile={profile}
      />

      <ReportModal
        isModalOpen={isReportModalVisible}
        onSubmit={handleReportSubmit}
        handleCancel={handleReportCancel}
      />
    </div>
  );
};

export default Intro;
