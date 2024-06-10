import React, { useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { Image, Upload, Button, Form, Input, Modal, Card, message } from 'antd';
import { useMediaQuery } from "react-responsive";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from 'recoil';
import pageState from "../../recoil/atoms/login";
import style from "./SignUp.module.css";
import LogoTitle_Login from '../../components/Group/LOGO/LogoTitle_Login';
import FilterButton from '../../components/Button/FilterButton';
import { data_subject } from '../../assets/data/subject';
import { data_location } from '../../assets/data/location';
import RegisterSelect from '../../components/Select/RegisterSelect';

const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

const CompletePage = () => {
  // 반응형 화면
  const isDesktopOrLaptop = useMediaQuery({ minWidth: 992 });
  const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 991 });
  const isMobile = useMediaQuery({ maxWidth: 767 });

  // 페이지 이동
  const navigate = useNavigate();

  // 모달 상태
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [page, setPage] = useRecoilState(pageState); // Recoil로 페이지 상태 사용
  const [selectedSubject, setSelectedSubject] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState([]);
  const [selectedMethod, setSelectedMethod] = useState([]);
  const [fee, setFee] = useState("");
  const [oneLineIntro, setOneLineIntro] = useState("");
  const [portfolio, setPortfolio] = useState("");
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [fileList, setFileList] = useState([]);

  const [modalPage, setModalPage] = useState(1);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const nextModalPage = () => {
    setModalPage(modalPage + 1);
  };

  const prevModalPage = () => {
    setModalPage(modalPage - 1);
  };

  const goToLoginPage = () => {
    navigate('/signin'); // '/signin' 경로로 이동
  };

  const handleSubjectChange = (value) => {
    setSelectedSubject(value);
  };

  const handleLocationChange = (newValue) => {
    setSelectedLocation(newValue);
  }

  const handleMethodChange = (newValue) => {
    setSelectedMethod(newValue);
  }

  const handleFeeChange = (e) => {
    const value = e.target.value;
    const formattedValue = value.replace(/[^0-9]/g, '').replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    setFee(formattedValue);
  }

  const handleOneLineIntroChange = (e) => {
    const value = e.target.value;
    const filteredValue = value.replace(/[^ㄱ-ㅎㅏ-ㅣ가-힣a-zA-Z0-9]/g, '');
    if (filteredValue.length <= 12) {
      setOneLineIntro(filteredValue);
    }
  }

  const handlePortfolioChange = (e) => {
    const value = e.target.value;
    setPortfolio(value);
  }

  const handleChange = ({ fileList: newFileList }) => setFileList(newFileList);

  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
  };

  const uploadButton = (
    <div>
      {loading ? <PlusOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  const handleFinishFailed = (errorInfo) => {
    message.error('모든 필수 항목을 입력해 주세요.');
  };

  const handleFinish = (values) => {
    if (!selectedSubject.length || !selectedLocation.length || !selectedMethod.length || !fee ) {
      message.error('모든 필수 항목을 입력해 주세요.');
      return;
    }
    console.log('Success:', values);
    // 성공적으로 제출된 경우 처리 로직
    message.success('제출이 완료되었습니다.');
    setIsModalVisible(false);
    goToLoginPage();
  };

  const placeholdercontents = "구인공고에 들어갈 내용 \n \n예) 파이썬을 배우고 있는 대학생입니다, 파이썬을 처음부터 친절하게 가르쳐주실 과외선생님 구합니다!  \n\n예) 웹페이지 제작 프론트엔드 전공자입니다. 웹페이지 제작에 쓸만한 기술이나 언어에 관심있는 과외 학생 구합니다";
  const placeholderschedule = "과외가 가능한 일정 \n \n예) 주중 및 주말 협의\n\n예) 월요일 15:00~18:00, 문의시 조율하여 결정";

  return (
    <div style={{
      marginTop: isMobile ? 50 : 100,
      marginLeft: isMobile ? '5%' : isTablet ? 30 : '15%',
      marginRight: isMobile ? '5%' : isTablet ? 30 : '15%',
      display: isMobile ? null : "flex",
      justifyContent: "center",
    }}>
      {!isMobile && (
        <div className={style.background}>
          <div className={style.logo}><LogoTitle_Login /></div>
          <div className={style.body}> 
            <div style={{marginTop:'15px', marginBottom:'15px'}}></div>
          </div>
        </div>
      )}
      <div className={style.register} style={{ marginLeft: isMobile ? 0 : isTablet ? 50 : 50 }}>
        <div style={{ maxWidth: '800px' }}>
          <div className={style.content} style={{ marginLeft: '20px' }}>
            <Card style={{ backgroundColor: '#f0f0f0', padding: '10px', borderRadius: '15px' }}>
                <div style={{ fontSize: '30px', fontWeight: 'bold', marginBottom: '100px' }}>DevTogether의 회원이 되신걸 축하합니다!</div>
                <div style={{marginBottom:"80px"}}> DevTogether에서 회원님의 좋은 학생/선생님의 매칭을 기원합니다!</div>
                <div style={{marginBottom:"20px"}}> 매칭 공고를 올리기 위해서는 추가 정보 입력이 필요합니다.</div>
                <div style={{marginBottom:"80px"}}> 정보가 입력되지 않은 회원은 매칭 공고가 등록되지 않습니다.</div>
                <div><span style={{ color: 'red'}}>*</span> 추후에는 마이페이지에서 정보 입력 </div>
            </Card>
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '50px' }}>
              <FilterButton name={'정보 추가'} onClick={showModal} style={{ margin: '10px' }} />
              <FilterButton name={'다음에'} onClick={goToLoginPage} style={{ margin: '10px' }} />
            </div>
          </div>

          <Modal title="추가 정보 입력" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel} footer={null}>
            <Form
              name="additional_info"
              layout="vertical"
              onFinish={handleFinish}
              onFinishFailed={handleFinishFailed}
            >
              {modalPage === 1 && (
                <div style={{marginTop:'30px'}}>
                  <Form.Item
                    label="과목"
                    name="subject"
                    rules={[{ required: true, message: '과목을 선택하세요!' }]}
                  >
                    <RegisterSelect
                      mode="multiple"
                      placeholder="과목 (최대 5개)"
                      filterOption={(input, option) =>
                        (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                      }
                      filterSort={(optionA, optionB) =>
                        (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                      }
                      options={data_subject.map((subject) => ({
                        value: subject, 
                        label: subject,
                      }))}
                      onChange={handleSubjectChange}
                      maxTags={5}
                    />
                  </Form.Item>
                  <Form.Item
                    label="지역"
                    name="region"
                    rules={[{ required: true, message: '지역을 입력하세요!' }]}
                  >
                   <RegisterSelect
                    placeholder="지역 (최대 3개)"
                    filterOption={(input, option) =>
                        (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                    }
                    filterSort={(optionA, optionB) =>
                        (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                    }
                    options={data_location.map((location) => ({
                        value: location, 
                        label: location,
                    }))}
                    onChange={(newValue) => handleLocationChange(newValue)}
                    maxTags={3}
                    />
                  </Form.Item>
                  <Form.Item
                    label="과외 방식"
                    name="method"
                    rules={[{ required: true, message: '과외 방식을 선택하세요!' }]}
                  >
                    <RegisterSelect
                    placeholder="과외 방식"
                    options={[
                        { value: '0', label: '대면' },
                        { value: '1', label: '비대면' },
                        { value: '2', label: '블렌딩' }
                    ]}
                    onChange={(newValue) => handleMethodChange(newValue)}
                />
                  </Form.Item>
                  <Form.Item
                    label="최소 과외비"
                    name="fee"
                    rules={[{ required: true, message: '과외비를 입력하세요!' }]}
                  >
                    <Input
                      type="text"
                      placeholder="과외 금액"
                      suffix="원"
                      value={fee}
                      onChange={handleFeeChange}
                    />
                  </Form.Item>
                  <Form.Item
                    label="프로필 이미지"
                    name="profileImage"
                  >
                    <Upload
                      action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
                      listType="picture-circle"
                      fileList={fileList}
                      onPreview={handlePreview}
                      onChange={handleChange}
                    >
                      {fileList.length >= 1 ? null : uploadButton}
                    </Upload>
                    {previewImage && (
                      <Image
                        wrapperStyle={{ display: 'none' }}
                        preview={{
                          visible: previewOpen,
                          onVisibleChange: (visible) => setPreviewOpen(visible),
                          afterOpenChange: (visible) => !visible && setPreviewImage(''),
                        }}
                        src={previewImage}
                      />
                    )}
                  </Form.Item>
                  <Form.Item
                    label="한줄 소개"
                    name="oneLineIntro"
                  >
                    <Input
                      maxLength={12}
                      showCount
                      placeholder="한 줄 소개"
                      value={oneLineIntro}
                      onChange={handleOneLineIntroChange}
                    />
                  </Form.Item>
                  <div style={{display:'flex', justifyContent:'flex-end'}}>
                    <Button onClick={nextModalPage}>다음</Button>
                  </div>
                </div>
              )}
              {modalPage === 2 && (
                <div style={{marginTop:'30px'}}>
                  <Form.Item
                    label="포트폴리오"
                    name="portfolio"
                  >
                    <Input
                      value={portfolio}
                      placeholder="포트폴리오 링크"
                      onChange={handlePortfolioChange}
                    />
                  </Form.Item>
                  <Form.Item
                    label="과외 소개"
                    name="intro"
                  >
                    <Input.TextArea 
                    rows={4} 
                    placeholder={placeholdercontents}
                    showCount
                    maxLength={100}
                    style={{
                        height: 120,
                        resize: 'none',
                    }}/>
                  </Form.Item>
                  <Form.Item
                    label="과외 일정"
                    name="schedule"
                  >
                    <Input.TextArea 
                    rows={4} 
                    placeholder={placeholderschedule}
                    showCount
                    maxLength={100}
                    style={{
                        height: 120,
                        resize: 'none',
                    }}/>
                  </Form.Item>
                  <Form.Item
                    label="어필"
                    name="appeal"
                  >
                    <Input.TextArea 
                    rows={4} 
                    placeholder='본인이 어필할 내용'
                    showCount
                    maxLength={100}
                    style={{
                        height: 120,
                        resize: 'none',
                    }}/>
                  </Form.Item>
                  <div style={{ display: 'flex', justifyContent: 'space-between'}}>
                    <Button onClick={prevModalPage}>이전</Button>
                    <Button type="primary" htmlType="submit">제출</Button>
                  </div>
                </div>
              )}
            </Form>
          </Modal>
        </div>
      </div>
    </div>
  );
};

export default CompletePage;
