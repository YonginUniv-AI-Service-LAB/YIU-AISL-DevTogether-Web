import React, { useState, useEffect } from "react";
import style from "./UserDetail.module.css";
import { useMediaQuery } from "react-responsive";
import { Tabs, Input, Upload, Image, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import Studyinfo from "./Studyinfo";
import Reviewinfo from "./Reviewinfo";
import FilterButton from "../../../components/Button/FilterButton";
import { editStateAtom, nameState, nicknameState, imgState, introductionState, subject1State, subject2State, subject3State, subject4State, subject5State, location1State, location2State, location3State, methodState, feeState, portfolioState, contentsState, scheduleState, prState, genderState, ageState } from "../../../recoil/atoms/mypage";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from "axios";
import defaultuser from "../../../assets/images/defaultUser.png";
import Selfinfo from "./Selfinfo";

const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

const Detail = () => {
  const queryClient = useQueryClient();

  const isDesktopOrLaptop = useMediaQuery({ minWidth: 992 });
  const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 991 });
  const isMobile = useMediaQuery({ maxWidth: 767 });

  const [isEditing, setIsEditing] = useRecoilState(editStateAtom);
  const [tab, setTab] = useState('1');

  const name = useRecoilValue(nameState);
  const nickname = useRecoilValue(nicknameState);
  const img = useRecoilValue(imgState);
  const introduction = useRecoilValue(introductionState);
  const subject1 = useRecoilValue(subject1State);
  const subject2 = useRecoilValue(subject2State);
  const subject3 = useRecoilValue(subject3State);
  const subject4 = useRecoilValue(subject4State);
  const subject5 = useRecoilValue(subject5State);
  const location1 = useRecoilValue(location1State);
  const location2 = useRecoilValue(location2State);
  const location3 = useRecoilValue(location3State);
  const method = useRecoilValue(methodState);
  const fee = useRecoilValue(feeState);
  const portfolio = useRecoilValue(portfolioState);
  const contents = useRecoilValue(contentsState);
  const schedule = useRecoilValue(scheduleState);
  const pr = useRecoilValue(prState);
  const gender = useRecoilValue(genderState);
  const age = useRecoilValue(ageState);

  const setName = useSetRecoilState(nameState);
  const setNickname = useSetRecoilState(nicknameState);
  const setImg = useSetRecoilState(imgState);
  const setIntroduction = useSetRecoilState(introductionState);
  const setSubject1 = useSetRecoilState(subject1State);
  const setSubject2 = useSetRecoilState(subject2State);
  const setSubject3 = useSetRecoilState(subject3State);
  const setSubject4 = useSetRecoilState(subject4State);
  const setSubject5 = useSetRecoilState(subject5State);
  const setLocation1 = useSetRecoilState(location1State);
  const setLocation2 = useSetRecoilState(location2State);
  const setLocation3 = useSetRecoilState(location3State);
  const setMethod = useSetRecoilState(methodState);
  const setFee = useSetRecoilState(feeState);
  const setPortfolio = useSetRecoilState(portfolioState);
  const setContents = useSetRecoilState(contentsState);
  const setSchedule = useSetRecoilState(scheduleState);
  const setPr = useSetRecoilState(prState);
  const setGender = useSetRecoilState(genderState);
  const setAge = useSetRecoilState(ageState);

  const [formData, setFormData] = useState(null);
  const [initialData, setInitialData] = useState(null);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [fileList, setFileList] = useState([]);
  const [originalFile, setOriginalFile] = useState(null); // 새로운 상태 추가

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get('/user', {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem('accessToken')}`,
          },
        });
        const userData = response.data;
        const role = sessionStorage.getItem('role');

        let profileResponse;
        if (role === '1') {
          profileResponse = await axios.get('/user/mentor', {
            headers: {
              Authorization: `Bearer ${sessionStorage.getItem('accessToken')}`,
            },
          });
        } else if (role === '2') {
          profileResponse = await axios.get('/user/mentee', {
            headers: {
              Authorization: `Bearer ${sessionStorage.getItem('accessToken')}`,
            },
          });
        } else {
          throw new Error('Invalid role');
        }

        const profileData = profileResponse.data[0];
        const mergedData = { ...userData, ...profileData };

        setFormData(mergedData);
        setInitialData(mergedData);
        setName(mergedData.name);
        setNickname(mergedData.nickname);
        setImg(mergedData.imgDto.fileData);
        setIntroduction(mergedData.introduction);
        setSubject1(mergedData.subject1 || '');
        setSubject2(mergedData.subject2 || '');
        setSubject3(mergedData.subject3 || '');
        setSubject4(mergedData.subject4 || '');
        setSubject5(mergedData.subject5 || '');
        setLocation1(mergedData.location1 || '');
        setLocation2(mergedData.location2 || '');
        setLocation3(mergedData.location3 || '');
        setMethod(mergedData.method || []);
        setFee(mergedData.fee || '');
        setPortfolio(mergedData.portfolio || '');
        setContents(mergedData.contents || '');
        setSchedule(mergedData.schedule || '');
        setPr(mergedData.pr || '');
        setGender(mergedData.gender || '');
        setAge(mergedData.age || '');

        // 이미지 파일 설정
        const base64Image = `data:image/png;base64,${mergedData.imgDto?.fileData}`; 
        const byteString = atob(mergedData.imgDto?.fileData);
        const arrayBuffer = new ArrayBuffer(byteString.length);
        const intArray = new Uint8Array(arrayBuffer);
        for (let i = 0; i < byteString.length; i++) {
          intArray[i] = byteString.charCodeAt(i);
        }
        const blob = new Blob([intArray], { type: 'image/png' });
        const imgFile = new File([blob], mergedData.imgDto?.originName || 'image.png', { type: 'image/png' });

        setFileList([{
          uid: '-1',
          name: mergedData.imgDto?.originName || 'image.png',
          status: 'done',
          url: base64Image,
          originFileObj: imgFile,
        }]);
        setOriginalFile(imgFile); // 원래 파일 저장
      } catch (error) {
        console.error('사용자 정보를 가져오는 데 실패했습니다.', error);
        message.error('사용자 정보를 가져오는 데 실패했습니다.');
      }
    };

    fetchUserProfile();
  }, [setName, setNickname, setImg, setIntroduction, setSubject1, setSubject2, setSubject3, setSubject4, setSubject5, setLocation1, setLocation2, setLocation3, setMethod, setFee, setPortfolio, setContents, setSchedule, setPr, setGender, setAge]);

  const handleTab = (value) => {
    setTab(value);
  };

  const handleSubjectChange = (selectedSubjects) => {
    setSubject1(selectedSubjects[0] || '');
    setSubject2(selectedSubjects[1] || '');
    setSubject3(selectedSubjects[2] || '');
    setSubject4(selectedSubjects[3] || '');
    setSubject5(selectedSubjects[4] || '');
  };

  const handleLocationChange = (selectedLocations) => {
    setLocation1(selectedLocations[0] || '');
    setLocation2(selectedLocations[1] || '');
    setLocation3(selectedLocations[2] || '');
  };

  const handleMethodChange = (selectedMethods) => {
    setMethod(selectedMethods);
  };

  const handleFeeChange = (e) => {
    setFee(e.target.value);
  };

  const handlePortfolioChange = (e) => {
    setPortfolio(e.target.value);
  };

  const handleEditCancelClick = () => {
    setIntroduction(initialData.introduction);
    setFormData(initialData);
    setIsEditing(false);
    window.location.reload();
  };

  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
  };

  const handleChange = ({ fileList: newFileList }) => setFileList(newFileList);

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  const updateUserProfile = useMutation({
    mutationFn: async (data) => {
      try {
        const userData = {
          email: data.email,
          location1: data.location1,
          location2: data.location2,
          location3: data.location3
        };
  
        await axios.put("/user", userData, {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem('accessToken')}`,
            'Content-Type': 'application/json',
          },
        });
  
        const role = sessionStorage.getItem('role');
        if (role === '1') {
          await 내_멘토_프로필_수정.mutateAsync(data);
        } else if (role === '2') {
          await 내_멘티_프로필_수정.mutateAsync(data);
        }
      } catch (error) {
        if (error.response && error.response.status === 400) {
          console.error('API 요청 오류: ', error.response.data);
          throw new Error('잘못된 요청입니다. 내 정보 수정 입력 데이터를 확인해 주세요.');
        } else {
          throw error;
        }
      }
    },
    onSuccess: () => {
      message.success("회원님의 프로필이 수정되었습니다!");
      queryClient.invalidateQueries("myProfile");
      setIsEditing(false);
      window.location.reload();
    },
    onError: (e) => {
      console.log("프로필 수정 실패: ", e);
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
        if (fileList.length === 0) {
          const defaultUserImageFile = await fetch(defaultuser)
            .then(r => r.blob())
            .then(blobFile => new File([blobFile], "defaultUser.png", { type: "image/png" }));
          formData.append("img", defaultUserImageFile);
        } else {
          formData.append("img", originalFile); // 원래 이미지를 전송
        }
      }

      formData.append("subject1", data.subject1 || '');
      formData.append("subject2", data.subject2 || '');
      formData.append("subject3", data.subject3 || '');
      formData.append("subject4", data.subject4 || '');
      formData.append("subject5", data.subject5 || '');

      console.log("전송할 FormData: ");
      formData.forEach((value, key) => {
        console.log(key, value);
      });

      try {
        const response = await axios.put("/user/mentee", formData, {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem('accessToken')}`,
          },
        });
        return response.data;
      } catch (error) {
        if (error.response && error.response.status === 400) {
          console.error('API 요청 오류: ', error.response.data); // 응답 로그 추가
          throw new Error('잘못된 요청입니다. 입력 데이터를 확인해 주세요.');
        } else {
          throw error;
        }
      }
    },
    onSuccess: (data, variables) => {
      message.success("회원님의 멘티 프로필이 수정되었습니다!");
      queryClient.invalidateQueries("myMenteeProfile");
      console.log("멘티 프로필 수정 성공: ", data);
    },
    onError: (e) => {
      console.log("멘티 프로필 수정 실패: ", e);
      // message.error("잠시 후에 다시 시도해주세요");
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
        if (fileList.length === 0) {
          const defaultUserImageFile = await fetch(defaultuser)
            .then(r => r.blob())
            .then(blobFile => new File([blobFile], "defaultUser.png", { type: "image/png" }));
          formData.append("img", defaultUserImageFile);
        } else {
          formData.append("img", originalFile); // 원래 이미지를 전송
        }
      }

      formData.append("subject1", data.subject1 || '');
      formData.append("subject2", data.subject2 || '');
      formData.append("subject3", data.subject3 || '');
      formData.append("subject4", data.subject4 || '');
      formData.append("subject5", data.subject5 || '');

      console.log("전송할 FormData: ");
      formData.forEach((value, key) => {
        console.log(key, value);
      });

      await axios.put("/user/mentor", formData, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem('accessToken')}`,
        },
      });
    },
    onSuccess: (data, variables) => {
      message.success("회원님의 멘토 프로필이 수정되었습니다!");
      queryClient.invalidateQueries("myMentorProfile");
      console.log("멘토 프로필 수정 성공: ", data);
    },
    onError: (e) => {
      console.log("멘토 프로필 수정 실패: ", e);
      // message.error("잠시 후에 다시 시도해주세요");
    },
  });

  const handleSaveClick = async () => {
    const updatedFormData = {
      ...formData,
      name,
      nickname,
      files: fileList.length > 0 ? fileList.map(file => file.originFileObj) : [], // 파일 리스트를 배열로 변환
      introduction,
      subject1,
      subject2,
      subject3,
      subject4,
      subject5,
      location1,
      location2,
      location3,
      method,
      fee,
      portfolio,
      contents,
      schedule,
      pr,
      gender,
      age,
      email: formData.email,
      role: formData.role,
    };

    console.log("보내는 데이터:", updatedFormData);

    await updateUserProfile.mutate(updatedFormData);
  };

  if (!formData) {
    return <div>Loading...</div>;
  }

  const user = formData;
  const role = sessionStorage.getItem('role');

  return (
    <div style={{ marginLeft: !isMobile ? '30px' : '0px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <div style={{ fontSize: isDesktopOrLaptop ? '25px' : '20px', fontWeight: '600', marginTop: '20px' }}>
          {role === '1' ? '내 멘토 정보' : '내 멘티 정보'}
        </div>
        {isEditing ? (
          <div style={{ display: 'flex' }}>
            <div style={{ display: 'flex', marginTop: '20px', marginRight: '10px' }}>
              <FilterButton name="취소하기" onClick={handleEditCancelClick} />
            </div>
            <div style={{ display: 'flex', marginTop: '20px', marginRight: '30px' }}>
              <FilterButton name="저장하기" onClick={handleSaveClick} />
            </div>
          </div>
        ) : (
          <div style={{ display: 'flex', marginTop: '20px', marginRight: '30px' }}>
            <FilterButton name="수정하기" onClick={() => setIsEditing(true)} />
          </div>
        )}
      </div>
      <div className={!isMobile ? style.horizon : style.mobhorizon}>
        <div>
          {isEditing ? (
            <Upload
              action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
              listType="picture-circle"
              fileList={fileList}
              onPreview={handlePreview}
              onChange={handleChange}
              beforeUpload={() => false}
            >
              {fileList.length >= 1 ? null : uploadButton}
            </Upload>
          ) : (
            <div className={style.circle}>
              <img src={fileList[0]?.url || defaultuser} alt="유저이미지" className={style.circleImg} />
            </div>
          )}
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', marginLeft: '20px' }}>
          <div className={!isMobile ? style.writer : style.mobwriter}>{user.nickname}</div>
          {isEditing ? (
            <Input
              className={!isMobile ? style.introduction : style.mobintroduction}
              value={introduction}
              onChange={(e) => setIntroduction(e.target.value)}
              placeholder="한 줄 소개"
              rows={4}
            />
          ) : (
            <div className={style.introduction}>{user.introduction}</div>
          )}
        </div>
      </div>

      <Tabs
        defaultActiveKey="1"
        type="card"
        size={"large"}
        onChange={handleTab}
        items={[
          {
            label: '소개',
            key: '1',
          },
          {
            label: '리뷰',
            key: '2',
          },
        ]}
      />
      {tab === '1' && (
        <div>
          <Selfinfo
            isEditing={isEditing}
            handleSubjectChange={handleSubjectChange}
            handleLocationChange={handleLocationChange}
            handleMethodChange={handleMethodChange}
            handleFeeChange={handleFeeChange}
            handlePortfolioChange={handlePortfolioChange}
          />
          <Studyinfo
            isEditing={isEditing}
            handleSubjectChange={handleSubjectChange}
            handleLocationChange={handleLocationChange}
            handleMethodChange={handleMethodChange}
            handleFeeChange={handleFeeChange}
            handlePortfolioChange={handlePortfolioChange}
          />
        </div>
      )}
      {tab === '2' && <Reviewinfo isEditing={isEditing} />}
      {previewImage && (
        <Image
          wrapperStyle={{
            display: 'none',
          }}
          preview={{
            visible: previewOpen,
            onVisibleChange: (visible) => setPreviewOpen(visible),
            afterOpenChange: (visible) => !visible && setPreviewImage(''),
          }}
          src={previewImage}
        />
      )}
    </div>
  );
};

export default Detail;
