import React, { useState, useEffect } from "react";
import { PlusOutlined } from "@ant-design/icons";
import { Image, Upload, Button, Form, Input, Modal, Card, message } from "antd";
import { useMediaQuery } from "react-responsive";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { pageState } from "../../recoil/atoms/login";
import { useQueryClient, useMutation, useQuery } from '@tanstack/react-query';
import { authFileAPI, defaultAPI } from '../../api/index';
import axios from 'axios';
import style from "./SignUp.module.css";
import LogoTitle_Login from "../../components/Group/LOGO/LogoTitle_Login";
import FilterButton from "../../components/Button/FilterButton";
import { data_subject } from "../../assets/data/subject";
import { data_location } from "../../assets/data/location";
import RegisterSelect from "../../components/Select/RegisterSelect";
import defaultuser from "../../assets/images/defaultUser.png"; // default user image import

const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

const convertUrlToFile = async (url) => {
  const response = await fetch(url);
  const data = await response.blob();
  const metadata = { type: 'image/png' };
  const file = new File([data], 'defaultUser.png', metadata);
  return file;
};

const CompletePage = () => {
  const queryClient = useQueryClient();
  const isDesktopOrLaptop = useMediaQuery({ minWidth: 992 });
  const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 991 });
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const navigate = useNavigate();
  const [page, setPage] = useRecoilState(pageState);
  const [studentFormState, setStudentFormState] = useState({
    modalVisible: false,
    modalPage: 1,
    selectedSubject: [],
    selectedLocation: [],
    selectedMethod: [],
    fileList: [],
    previewOpen: false,
    previewImage: "",
    fee: "",
    oneLineIntro: "",
    portfolio: "",
    formSubmitted: false,
    loading: false,
  });
  const [teacherFormState, setTeacherFormState] = useState({
    modalVisible: false,
    modalPage: 1,
    selectedSubject: [],
    selectedLocation: [],
    selectedMethod: [],
    fileList: [],
    previewOpen: false,
    previewImage: "",
    fee: "",
    oneLineIntro: "",
    portfolio: "",
    formSubmitted: false,
    loading: false,
  });
  const [role, setRole] = useState(null);
  const [nickname, setNickname] = useState(null);
  const [accessToken, setAccessToken] = useState(null);
  const [examplerole, setExampleRole] = useState(null); 
  const [studentSubmitted, setStudentSubmitted] = useState(false);
  const [teacherSubmitted, setTeacherSubmitted] = useState(false);

  useEffect(() => {
    const userRole = sessionStorage.getItem('role');
    const token = sessionStorage.getItem('accessToken');
    const userNickname = sessionStorage.getItem('nickname');
    setRole(userRole);
    setAccessToken(token);
    setNickname(userNickname);
  }, []);

  const { data } = useQuery({
    queryKey: ['user'],
    queryFn: async () => {
      const { data } = await defaultAPI.get('/user', {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem('accessToken')}`,
        },
      });
      return data;
    },
    onError: (error) => {
      console.error('사용자 정보를 가져오는 데 실패했습니다:', error);
    },
  });

  useEffect(() => {
    if (data) {
      setExampleRole(data.role);
    }
  }, [data]);

  useEffect(() => {
    if (examplerole === '멘토멘티') {
      if (studentSubmitted && teacherSubmitted) {
        navigate("/main");
      }
    } else if (studentSubmitted || teacherSubmitted) {
      navigate("/main");
    }
  }, [studentSubmitted, teacherSubmitted, examplerole, navigate]);

  const changeToken = useMutation({
    mutationFn: async (newRole) => {
      const params = new URLSearchParams();
      params.append('accessToken', sessionStorage.getItem('accessToken'));
      params.append('refreshToken', sessionStorage.getItem('refreshToken'));
      params.append('role', newRole);
  
      const { data } = await axios.post('/token/change', params, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      });
      return { ...data, newRole };
    },
    onSuccess: (data) => {
      sessionStorage.setItem('accessToken', data.accessToken);
      sessionStorage.setItem('refreshToken', data.refreshToken);
      sessionStorage.setItem('role', data.newRole);
      setAccessToken(data.accessToken);
      setRole(data.newRole);
    },
    onError: (error) => {
      console.error('Failed to change token:', error);
    },
  });

  const handleStudentModalOpen = () => {
    if (role === '1') {
      changeToken.mutate('2');
    }
    setStudentFormState(prev => ({ ...prev, modalVisible: true }));
  };

  const handleTeacherModalOpen = () => {
    if (role === '2') {
      changeToken.mutate('1');
    }
    setTeacherFormState(prev => ({ ...prev, modalVisible: true }));
  };

  const handleStudentModalOk = () => {
    setStudentFormState(prev => ({ ...prev, modalVisible: false }));
  };

  const handleTeacherModalOk = () => {
    setTeacherFormState(prev => ({ ...prev, modalVisible: false }));
  };

  const handleStudentModalCancel = () => {
    setStudentFormState(prev => ({ ...prev, modalVisible: false }));
  };

  const handleTeacherModalCancel = () => {
    setTeacherFormState(prev => ({ ...prev, modalVisible: false }));
  };

  const nextStudentModalPage = () => {
    setStudentFormState(prev => ({ ...prev, modalPage: prev.modalPage + 1 }));
  };

  const prevStudentModalPage = () => {
    setStudentFormState(prev => ({ ...prev, modalPage: prev.modalPage - 1 }));
  };

  const nextTeacherModalPage = () => {
    setTeacherFormState(prev => ({ ...prev, modalPage: prev.modalPage + 1 }));
  };

  const prevTeacherModalPage = () => {
    setTeacherFormState(prev => ({ ...prev, modalPage: prev.modalPage - 1 }));
  };

  const goToMainPage = () => {
    setStudentSubmitted(true);
    setTeacherSubmitted(true);
    if (examplerole === '멘토멘티') {
      if (studentSubmitted && teacherSubmitted) {
        navigate("/main");
      } else {
        message.error("학생 정보와 선생 정보 모두 제출해야 합니다.");
      }
    } else {
      navigate("/main");
    }
  };

  const handleSubjectChange = (value, formType) => {
    if (formType === 'student') {
      setStudentFormState(prev => ({ ...prev, selectedSubject: value }));
    } else {
      setTeacherFormState(prev => ({ ...prev, selectedSubject: value }));
    }
  };

  const handleLocationChange = (newValue, formType) => {
    if (formType === 'student') {
      setStudentFormState(prev => ({ ...prev, selectedLocation: newValue }));
    } else {
      setTeacherFormState(prev => ({ ...prev, selectedLocation: newValue }));
    }
  };

  const handleMethodChange = (newValue, formType) => {
    if (formType === 'student') {
      setStudentFormState(prev => ({ ...prev, selectedMethod: newValue }));
    } else {
      setTeacherFormState(prev => ({ ...prev, selectedMethod: newValue }));
    }
  };

  const handleFeeChange = (e, formType) => {
    const value = e.target.value;
    const formattedValue = value
      .replace(/\D/g, '')
      .replace(/\B(?=(\d{3})+(?!\d))/g, ',');

    if (formType === 'student') {
      setStudentFormState(prev => ({ ...prev, fee: formattedValue }));
    } else {
      setTeacherFormState(prev => ({ ...prev, fee: formattedValue }));
    }
  };

  const handleOneLineIntroChange = (e, formType) => {
    const value = e.target.value;
    const filteredValue = value.replace(/[^ㄱ-ㅎㅏ-ㅣ가-힣a-zA-Z0-9]/g, "");
    if (filteredValue.length <= 12) {
      if (formType === 'student') {
        setStudentFormState(prev => ({ ...prev, oneLineIntro: filteredValue }));
      } else {
        setTeacherFormState(prev => ({ ...prev, oneLineIntro: filteredValue }));
      }
    }
  };

  const handlePortfolioChange = (e, formType) => {
    const value = e.target.value;
    if (formType === 'student') {
      setStudentFormState(prev => ({ ...prev, portfolio: value }));
    } else {
      setTeacherFormState(prev => ({ ...prev, portfolio: value }));
    }
  };

  const handleChange = ({ fileList: newFileList }, formType) => {
    if (formType === 'student') {
      setStudentFormState(prev => ({ ...prev, fileList: newFileList }));
    } else {
      setTeacherFormState(prev => ({ ...prev, fileList: newFileList }));
    }
  };

  const handlePreview = async (file, formType) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    if (formType === 'student') {
      setStudentFormState(prev => ({ ...prev, previewImage: file.url || file.preview, previewOpen: true }));
    } else {
      setTeacherFormState(prev => ({ ...prev, previewImage: file.url || file.preview, previewOpen: true }));
    }
  };

  const uploadButton = (
    <div>
      {studentFormState.loading || teacherFormState.loading ? <PlusOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  const handleFinishFailed = (errorInfo) => {
    message.error("모든 필수 항목을 입력해 주세요.");
  };

  const updateUserProfile = useMutation({
    mutationFn: async (data) => {
      try {
        await defaultAPI.put("/user", data, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
          },
        });
      } catch (error) {
        if (error.response && error.response.status === 400) {
          throw new Error('잘못된 요청입니다. 입력 데이터를 확인해 주세요.');
        } else {
          throw error;
        }
      }
    },
    onSuccess: async () => {
      if (role === '2') {
        내_멘티_프로필_수정.mutate();
      } else if (role === '1') {
        내_멘토_프로필_수정.mutate();
      }
      message.success("회원님의 프로필이 수정되었습니다!");
      queryClient.invalidateQueries("myProfile");
    },
    onError: (e) => {
      message.error(e.message || "프로필 수정 중 오류가 발생했습니다.");
    },
  });

  const 내_멘티_프로필_수정 = useMutation({
    mutationFn: async (data) => {
      const formData = new FormData();
      formData.append("introduction", data.introduction || '');
      formData.append("method", data.method || '');
      formData.append("schedule", data.schedule || '');
      formData.append("fee", data.fee || '');
      formData.append("pr", data.pr || '');
      formData.append("portfolio", data.portfolio || '');
      formData.append("contents", data.contents || '');
      formData.append("nickname", data.nickname || '');

      if (data.files.length > 0) {
        data.files.forEach((file) => {
          formData.append("img", file);
        });
      } else {
        formData.append("img", await convertUrlToFile(defaultuser)); // default user image if no files
      }

      formData.append("subject1", data.subject1 || '');
      formData.append("subject2", data.subject2 || '');
      formData.append("subject3", data.subject3 || '');
      formData.append("subject4", data.subject4 || '');
      formData.append("subject5", data.subject5 || '');

      try {
        const response = await authFileAPI.put("/user/mentee", formData, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        return response.data;
      } catch (error) {
        if (error.response && error.response.status === 400) {
          throw new Error('잘못된 요청입니다. 입력 데이터를 확인해 주세요.');
        } else {
          throw error;
        }
      }
    },
    onSuccess: (data, variables) => {
      message.success("회원님의 멘티 프로필이 수정되었습니다!");
      queryClient.invalidateQueries("myMenteeProfile");
    },
    onError: (e) => {
      console.log("멘티 프로필 수정 실패: ", e);
    },
  });

  const 내_멘토_프로필_수정 = useMutation({
    mutationFn: async (data) => {
      const formData = new FormData();
      formData.append("introduction", data.introduction || '');
      formData.append("method", data.method || '');
      formData.append("schedule", data.schedule || '');
      formData.append("fee", data.fee || '');
      formData.append("pr", data.pr || '');
      formData.append("portfolio", data.portfolio || '');
      formData.append("contents", data.contents || '');
      formData.append("nickname", data.nickname || '');

      if (data.files.length > 0) {
        data.files.forEach((file) => {
          formData.append("img", file);
        });
      } else {
        formData.append("img", await convertUrlToFile(defaultuser)); // default user image if no files
      }

      formData.append("subject1", data.subject1 || '');
      formData.append("subject2", data.subject2 || '');
      formData.append("subject3", data.subject3 || '');
      formData.append("subject4", data.subject4 || '');
      formData.append("subject5", data.subject5 || '');

       // 콘솔로 데이터 값 찍기
    formData.forEach((value, key) => {
      console.log(key, value);
    });


      await authFileAPI.put("/user/mentor", formData, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
    },
    onSuccess: (data, variables) => {
      message.success("회원님의 멘토 프로필이 수정되었습니다!");
      queryClient.invalidateQueries("myMentorProfile");
    },
    onError: (e) => {
      console.log("멘토 프로필 수정 실패: ", e);
    },
  });

  const handleStudentFinish = async (values) => {
    const role = sessionStorage.getItem('role');
  
    if (!studentFormState.selectedSubject.length || !studentFormState.selectedLocation.length || !studentFormState.selectedMethod.length || !studentFormState.fee) {
      message.error("모든 필수 항목을 입력해 주세요.");
      return;
    }
  
    const commonData = {
      email: sessionStorage.getItem('email'),
      location1: studentFormState.selectedLocation[0] || '',
      location2: studentFormState.selectedLocation[1] || '',
      location3: studentFormState.selectedLocation[2] || '',
      nickname: nickname,
    };
  
    const profileData = {
      subject1: studentFormState.selectedSubject[0] || '',
      subject2: studentFormState.selectedSubject[1] || '',
      subject3: studentFormState.selectedSubject[2] || '',
      subject4: studentFormState.selectedSubject[3] || '',
      subject5: studentFormState.selectedSubject[4] || '',
      method: studentFormState.selectedMethod || '',
      fee: parseInt(studentFormState.fee.replace(/,/g, ""), 10) || '',
      introduction: studentFormState.oneLineIntro || '',
      schedule: values.schedule || '',
      pr: values.appeal || '',
      portfolio: studentFormState.portfolio || '',
      contents: values.intro || '',
      files: studentFormState.fileList.map(file => file.originFileObj),
      nickname: nickname,
    };

    if (!studentFormState.fileList.length) {
      profileData.files.push(await convertUrlToFile(defaultuser)); // default user image if no files
    }
  
    const dataToSend = { ...commonData, ...profileData };
  
    try {
      await updateUserProfile.mutateAsync(dataToSend);
  
      if (role === '2') {
        await 내_멘티_프로필_수정.mutateAsync(profileData);
      }
  
      setStudentFormState(prev => ({ ...prev, formSubmitted: true, modalVisible: false }));
      setStudentSubmitted(true); 
  
    } catch (error) {
      console.error("학생용 프로필 수정 실패: ", error);
      message.error("학생용 프로필 수정 중 오류가 발생했습니다.");
    }
  };
  
  const handleTeacherFinish = async (values) => {
    const role = sessionStorage.getItem('role');
  
    if (!teacherFormState.selectedSubject.length || !teacherFormState.selectedLocation.length || !teacherFormState.selectedMethod.length || !teacherFormState.fee) {
      message.error("모든 필수 항목을 입력해 주세요.");
      return;
    }
  
    const commonData = {
      email: sessionStorage.getItem('email'),
      location1: teacherFormState.selectedLocation[0] || '',
      location2: teacherFormState.selectedLocation[1] || '',
      location3: teacherFormState.selectedLocation[2] || '',
      nickname: nickname,
    };
  
    const profileData = {
      subject1: teacherFormState.selectedSubject[0] || '',
      subject2: teacherFormState.selectedSubject[1] || '',
      subject3: teacherFormState.selectedSubject[2] || '',
      subject4: teacherFormState.selectedSubject[3] || '',
      subject5: teacherFormState.selectedSubject[4] || '',
      method: teacherFormState.selectedMethod || '',
      fee: parseInt(teacherFormState.fee.replace(/,/g, ""), 10) || '',
      introduction: teacherFormState.oneLineIntro || '',
      schedule: values.schedule || '',
      pr: values.appeal || '',
      portfolio: teacherFormState.portfolio || '',
      contents: values.intro || '',
      files: teacherFormState.fileList.map(file => file.originFileObj),
      nickname: nickname,
    };

    if (!teacherFormState.fileList.length) {
      profileData.files.push(await convertUrlToFile(defaultuser)); // default user image if no files
    }
  
    const dataToSend = { ...commonData, ...profileData };
  
    try {
      await updateUserProfile.mutateAsync(dataToSend);
  
      if (role === '1') {
        await 내_멘토_프로필_수정.mutateAsync(profileData);
      }
  
      setTeacherFormState(prev => ({ ...prev, formSubmitted: true, modalVisible: false }));
      setTeacherSubmitted(true);
  
    } catch (error) {
      console.error("선생님용 프로필 수정 실패: ", error);
      message.error("선생님용 프로필 수정 중 오류가 발생했습니다.");
    }
  };
  
  const placeholdercontents = "구인공고에 들어갈 내용 \n \n예) 파이썬을 배우고 있는 대학생입니다, 파이썬을 처음부터 친절하게 가르쳐주실 과외선생님 구합니다!  \n\n예) 웹페이지 제작 프론트엔드 전공자입니다. 웹페이지 제작에 쓸만한 기술이나 언어에 관심있는 과외 학생 구합니다";
  const placeholderschedule = "과외가 가능한 일정 \n \n예) 주중 및 주말 협의\n\n예) 월요일 15:00~18:00, 문의시 조율하여 결정";

  return (
    <div
      style={{
        marginTop: isMobile ? 50 : 100,
        marginLeft: isMobile ? "5%" : isTablet ? 30 : "15%",
        marginRight: isMobile ? "5%" : isTablet ? 30 : "15%",
        display: isMobile ? null : "flex",
        justifyContent: "center",
      }}
    >
      {!isMobile && (
        <div className={style.background}>
          <div className={style.logo}>
            <LogoTitle_Login />
          </div>
          <div className={style.body}>
            <div style={{ marginTop: "15px", marginBottom: "15px" }}></div>
          </div>
        </div>
      )}
      <div
        className={style.register}
        style={{ marginLeft: isMobile ? 0 : isTablet ? 50 : 50 }}
      >
        <div style={{ maxWidth: "800px" }}>
          <div className={style.content} style={{ marginLeft: "20px" }}>
            <Card
              style={{
                backgroundColor: "#f0f0f0",
                padding: "10px",
                borderRadius: "15px",
              }}
            >
              <div
                style={{
                  fontSize: "30px",
                  fontWeight: "bold",
                  marginBottom: "100px",
                }}
              >
                DevTogether의 회원이 되신걸 축하합니다!
              </div>
              <div style={{ marginBottom: "80px" }}>
                {" "}
                DevTogether에서 회원님의 좋은 학생/선생님의 매칭을 기원합니다!
              </div>
              <div style={{ marginBottom: "20px" }}>
                {" "}
                매칭 공고를 올리기 위해서는 추가 정보 입력이 필요합니다.
              </div>
              <div style={{ marginBottom: "80px" }}>
                {" "}
                정보가 입력되지 않은 회원은 매칭 공고가 등록되지 않습니다.
              </div>
              <div>
                <span style={{ color: "red" }}>*</span> 추후에는 마이페이지에서
                정보 입력{" "}
              </div>
            </Card>
            <div
              style={{
                display: "flex",
                justifyContent:'space-between',
                marginTop: "50px",
              }}
            >
              <div style={{display:'flex'}}>
                {examplerole === '멘토멘티' && (
                  <>
                    <FilterButton name={"학생 정보 입력"} onClick={handleStudentModalOpen} style={{ margin: "10px" }} />
                    <FilterButton name={"선생 정보 입력"} onClick={handleTeacherModalOpen} style={{ margin: "10px" }} />
                  </>
                )}
                {examplerole === '멘티' && (
                  <FilterButton name={"학생 정보 입력"} onClick={handleStudentModalOpen} style={{ margin: "10px" }} />
                )}
                {examplerole === '멘토' && (
                  <FilterButton name={"선생 정보 입력"} onClick={handleTeacherModalOpen} style={{ margin: "10px" }} />
                )}
              </div>
              <FilterButton name={"다음에"} onClick={goToMainPage} style={{ margin: "10px" }} />
            </div>
          </div>

          <Modal
            title="학생용 정보 입력"
            visible={studentFormState.modalVisible}
            onOk={handleStudentModalOk}
            onCancel={handleStudentModalCancel}
            footer={null}
          >
            <Form
              name="additional_info_student"
              layout="vertical"
              onFinish={handleStudentFinish}
              onFinishFailed={handleFinishFailed}
            >
              {studentFormState.modalPage === 1 && (
                <div style={{ marginTop: "30px" }}>
                  <Form.Item
                    label="과목"
                    name="subject"
                    rules={[{ required: true, message: "과목을 선택하세요!" }]}
                  >
                    <RegisterSelect
                      mode="multiple"
                      placeholder="과목 (최대 5개)"
                      filterOption={(input, option) =>
                        (option?.label ?? "")
                          .toLowerCase()
                          .includes(input.toLowerCase())
                      }
                      filterSort={(optionA, optionB) =>
                        (optionA?.label ?? "")
                          .toLowerCase()
                          .localeCompare((optionB?.label ?? "").toLowerCase())
                      }
                      options={data_subject.map((subject) => ({
                        value: subject,
                        label: subject,
                      }))}
                      onChange={(value) => handleSubjectChange(value, 'student')}
                      maxTags={5}
                    />
                  </Form.Item>
                  <Form.Item
                    label="지역"
                    name="region"
                    rules={[{ required: true, message: "지역을 입력하세요!" }]}
                  >
                    <RegisterSelect
                      placeholder="지역 (최대 3개)"
                      filterOption={(input, option) =>
                        (option?.label ?? "")
                          .toLowerCase()
                          .includes(input.toLowerCase())
                      }
                      filterSort={(optionA, optionB) =>
                        (optionA?.label ?? "")
                          .toLowerCase()
                          .localeCompare((optionB?.label ?? "").toLowerCase())
                      }
                      options={data_location.map((location) => ({
                        value: location,
                        label: location,
                      }))}
                      onChange={(newValue) => handleLocationChange(newValue, 'student')}
                      maxTags={3}
                    />
                  </Form.Item>
                  <Form.Item
                    label="과외 방식"
                    name="method"
                    rules={[
                      { required: true, message: "과외 방식을 선택하세요!" },
                    ]}
                  >
                    <RegisterSelect
                      placeholder="과외 방식"
                      options={[
                        { value: "대면", label: "대면" },
                        { value: "비대면", label: "비대면" },
                        { value: "블렌딩", label: "블렌딩" },
                      ]}
                      onChange={(newValue) => handleMethodChange(newValue, 'student')}
                    />
                  </Form.Item>
                  <Form.Item label="최대 과외비" name="fee" rules={[{ required: true, message: "과외비를 입력하세요!" }]}>
                    <Input
                      type="text"
                      placeholder="과외 금액"
                      suffix="원"
                      value={studentFormState.fee} 
                      onChange={(e) => handleFeeChange(e, 'student')} 
                    />
                  </Form.Item>

                  <Form.Item label="프로필 이미지" name="profileImage">
                    <Upload
                      listType="picture-circle"
                      fileList={studentFormState.fileList}
                      onPreview={(file) => handlePreview(file, 'student')}
                      onChange={(newFileList) => handleChange(newFileList, 'student')}
                      beforeUpload={() => false}
                    >
                      {studentFormState.fileList.length >= 1 ? null : uploadButton}
                    </Upload>
                    {studentFormState.previewImage && (
                      <Image
                        wrapperStyle={{ display: "none" }}
                        preview={{
                          visible: studentFormState.previewOpen,
                          onVisibleChange: (visible) => setStudentFormState(prev => ({ ...prev, previewOpen: visible })),
                          afterOpenChange: (visible) =>
                            !visible && setStudentFormState(prev => ({ ...prev, previewImage: "" })),
                        }}
                        src={studentFormState.previewImage}
                      />
                    )}
                  </Form.Item>
                  <Form.Item label="한줄 소개" name="oneLineIntro">
                    <Input
                      maxLength={12}
                      showCount
                      placeholder="한 줄 소개"
                      value={studentFormState.oneLineIntro}
                      onChange={(e) => handleOneLineIntroChange(e, 'student')}
                    />
                  </Form.Item>
                  <div style={{ display: "flex", justifyContent: "flex-end" }}>
                    <Button onClick={nextStudentModalPage}>다음</Button>
                  </div>
                </div>
              )}
              {studentFormState.modalPage === 2 && (
                <div style={{ marginTop: "30px" }}>
                  <Form.Item label="포트폴리오" name="portfolio">
                    <Input
                      value={studentFormState.portfolio}
                      placeholder="포트폴리오 링크"
                      onChange={(e) => handlePortfolioChange(e, 'student')}
                    />
                  </Form.Item>
                  <Form.Item label="과외 소개" name="intro">
                    <Input.TextArea
                      rows={4}
                      placeholder={placeholdercontents}
                      showCount
                      maxLength={100}
                      style={{ height: 120, resize: "none" }}
                    />
                  </Form.Item>
                  <Form.Item label="과외 일정" name="schedule">
                    <Input.TextArea
                      rows={4}
                      placeholder={placeholderschedule}
                      showCount
                      maxLength={100}
                      style={{ height: 120, resize: "none" }}
                    />
                  </Form.Item>
                  <Form.Item label="어필" name="appeal">
                    <Input.TextArea
                      rows={4}
                      placeholder="본인이 어필할 내용"
                      showCount
                      maxLength={100}
                      style={{ height: 120, resize: "none" }}
                    />
                  </Form.Item>
                  <div
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <Button onClick={prevStudentModalPage}>이전</Button>
                    <Button type="primary" htmlType="submit">
                      제출
                    </Button>
                  </div>
                </div>
              )}
            </Form>
          </Modal>

          <Modal
            title="선생님용 정보 입력"
            visible={teacherFormState.modalVisible}
            onOk={handleTeacherModalOk}
            onCancel={handleTeacherModalCancel}
            footer={null}
          >
            <Form
              name="additional_info_teacher"
              layout="vertical"
              onFinish={handleTeacherFinish}
              onFinishFailed={handleFinishFailed}
            >
              {teacherFormState.modalPage === 1 && (
                <div style={{ marginTop: "30px" }}>
                  <Form.Item
                    label="과목"
                    name="subject"
                    rules={[{ required: true, message: "과목을 선택하세요!" }]}
                  >
                    <RegisterSelect
                      mode="multiple"
                      placeholder="과목 (최대 5개)"
                      filterOption={(input, option) =>
                        (option?.label ?? "")
                          .toLowerCase()
                          .includes(input.toLowerCase())
                      }
                      filterSort={(optionA, optionB) =>
                        (optionA?.label ?? "")
                          .toLowerCase()
                          .localeCompare((optionB?.label ?? "").toLowerCase())
                      }
                      options={data_subject.map((subject) => ({
                        value: subject,
                        label: subject,
                      }))}
                      onChange={(value) => handleSubjectChange(value, 'teacher')}
                      maxTags={5}
                    />
                  </Form.Item>
                  <Form.Item
                    label="지역"
                    name="region"
                    rules={[{ required: true, message: "지역을 입력하세요!" }]}
                  >
                    <RegisterSelect
                      placeholder="지역 (최대 3개)"
                      filterOption={(input, option) =>
                        (option?.label ?? "")
                          .toLowerCase()
                          .includes(input.toLowerCase())
                      }
                      filterSort={(optionA, optionB) =>
                        (optionA?.label ?? "")
                          .toLowerCase()
                          .localeCompare((optionB?.label ?? "").toLowerCase())
                      }
                      options={data_location.map((location) => ({
                        value: location,
                        label: location,
                      }))}
                      onChange={(newValue) => handleLocationChange(newValue, 'teacher')}
                      maxTags={3}
                    />
                  </Form.Item>
                  <Form.Item
                    label="과외 방식"
                    name="method"
                    rules={[
                      { required: true, message: "과외 방식을 선택하세요!" },
                    ]}
                  >
                    <RegisterSelect
                      placeholder="과외 방식"
                      options={[
                        { value: "대면", label: "대면" },
                        { value: "비대면", label: "비대면" },
                        { value: "블렌딩", label: "블렌딩" },
                      ]}
                      onChange={(newValue) => handleMethodChange(newValue, 'teacher')}
                    />
                  </Form.Item>
                  <Form.Item label="최소 과외비" name="fee" rules={[{ required: true, message: "과외비를 입력하세요!" }]}>
                    <Input
                      type="text"
                      placeholder="과외 금액"
                      suffix="원"
                      value={teacherFormState.fee}
                      onChange={(e) => handleFeeChange(e, 'teacher')}
                    />
                  </Form.Item>
                  <Form.Item label="프로필 이미지" name="profileImage">
                    <Upload
                      listType="picture-circle"
                      fileList={teacherFormState.fileList}
                      onPreview={(file) => handlePreview(file, 'teacher')}
                      onChange={(newFileList) => handleChange(newFileList, 'teacher')}
                      beforeUpload={() => false}
                    >
                      {teacherFormState.fileList.length >= 1 ? null : uploadButton}
                    </Upload>
                    {teacherFormState.previewImage && (
                      <Image
                        wrapperStyle={{ display: "none" }}
                        preview={{
                          visible: teacherFormState.previewOpen,
                          onVisibleChange: (visible) => setTeacherFormState(prev => ({ ...prev, previewOpen: visible })),
                          afterOpenChange: (visible) =>
                            !visible && setTeacherFormState(prev => ({ ...prev, previewImage: "" })),
                        }}
                        src={teacherFormState.previewImage}
                      />
                    )}
                  </Form.Item>
                  <Form.Item label="한줄 소개" name="oneLineIntro">
                    <Input
                      maxLength={12}
                      showCount
                      placeholder="한 줄 소개"
                      value={teacherFormState.oneLineIntro}
                      onChange={(e) => handleOneLineIntroChange(e, 'teacher')}
                    />
                  </Form.Item>
                  <div style={{ display: "flex", justifyContent: "flex-end" }}>
                    <Button onClick={nextTeacherModalPage}>다음</Button>
                  </div>
                </div>
              )}
              {teacherFormState.modalPage === 2 && (
                <div style={{ marginTop: "30px" }}>
                  <Form.Item label="포트폴리오" name="portfolio">
                    <Input
                      value={teacherFormState.portfolio}
                      placeholder="포트폴리오 링크"
                      onChange={(e) => handlePortfolioChange(e, 'teacher')}
                    />
                  </Form.Item>
                  <Form.Item label="과외 소개" name="intro">
                    <Input.TextArea
                      rows={4}
                      placeholder={placeholdercontents}
                      showCount
                      maxLength={100}
                      style={{ height: 120, resize: "none" }}
                    />
                  </Form.Item>
                  <Form.Item label="과외 일정" name="schedule">
                    <Input.TextArea
                      rows={4}
                      placeholder={placeholderschedule}
                      showCount
                      maxLength={100}
                      style={{ height: 120, resize: "none" }}
                    />
                  </Form.Item>
                  <Form.Item label="어필" name="appeal">
                    <Input.TextArea
                      rows={4}
                      placeholder="본인이 어필할 내용"
                      showCount
                      maxLength={100}
                      style={{ height: 120, resize: "none" }}
                    />
                  </Form.Item>
                  <div
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <Button onClick={prevTeacherModalPage}>이전</Button>
                    <Button type="primary" htmlType="submit">
                      제출
                    </Button>
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
