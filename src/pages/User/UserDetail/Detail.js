import React, { useState, useEffect } from "react";
import style from "./UserDetail.module.css";
import { useMediaQuery } from "react-responsive";
import { Tabs, Input, Upload, Image, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import Studyinfo from "./Studyinfo";
import Reviewinfo from "./Reviewinfo";
import FilterButton from "../../../components/Button/FilterButton";
import { editStateAtom, nameState, imgState, introductionState, subject1State, subject2State, subject3State, subject4State, subject5State, location1State, location2State, location3State, methodState, feeState, careerState, portfolioState, contentState, scheduleState, prState } from "../../../recoil/atoms/mypage";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import axios from "axios";
import AltImage from "../../../assets/images/devtogether_logo.png";

const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

const Detail = () => {
  const isDesktopOrLaptop = useMediaQuery({ minWidth: 992 });
  const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 991 });
  const isMobile = useMediaQuery({ maxWidth: 767 });

  const [isEditing, setIsEditing] = useRecoilState(editStateAtom);
  const [tab, setTab] = useState('1');

  const name = useRecoilValue(nameState);
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
  const career = useRecoilValue(careerState);
  const portfolio = useRecoilValue(portfolioState);
  const content = useRecoilValue(contentState);
  const schedule = useRecoilValue(scheduleState);
  const pr = useRecoilValue(prState);

  const setName = useSetRecoilState(nameState);
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
  const setCareer = useSetRecoilState(careerState);
  const setPortfolio = useSetRecoilState(portfolioState);
  const setContent = useSetRecoilState(contentState);
  const setSchedule = useSetRecoilState(scheduleState);
  const setPr = useSetRecoilState(prState);

  const [formData, setFormData] = useState(null);
  const [initialData, setInitialData] = useState(null);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [fileList, setFileList] = useState([]);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get('/user', {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem('accessToken')}`,
          },
        });
        const userData = response.data;
        const role = userData.role;

        let profileResponse;
        if (role === '멘토') {
          profileResponse = await axios.get('/user/mentor', {
            headers: {
              Authorization: `Bearer ${sessionStorage.getItem('accessToken')}`,
            },
          });
        } else if (role === '멘티') {
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
        setImg(mergedData.img);
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
        setCareer(mergedData.career || []);
        setPortfolio(mergedData.portfolio || '');
        setContent(mergedData.content || '');
        setSchedule(mergedData.schedule || '');
        setPr(mergedData.pr || '');
        setFileList([{
          uid: '-1',
          name: 'image.png',
          status: 'done',
          url: mergedData.img,
        }]);
      } catch (error) {
        console.error('사용자 정보를 가져오는 데 실패했습니다.', error);
        message.error('사용자 정보를 가져오는 데 실패했습니다.');
      }
    };

    fetchUserProfile();
  }, [setName, setImg, setIntroduction, setSubject1, setSubject2, setSubject3, setSubject4, setSubject5, setLocation1, setLocation2, setLocation3, setMethod, setFee, setCareer, setPortfolio, setContent, setSchedule, setPr]);

  const handleTab = (value) => {
    setTab(value);
  };

  const handleSaveClick = async () => {
    const updatedFormData = {
      ...formData,
      name,
      img,
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
      career,
      portfolio,
      content,
      schedule,
      pr,
    };

    console.log('내 정보 수정 시 보내는 데이터:', updatedFormData);

    try {
      await axios.put('/user', updatedFormData, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem('accessToken')}`,
        },
      });

      const role = formData.role;
      const profileUrl = role === '멘토' ? '/user/mentor' : '/user/mentee';
      await axios.put(profileUrl, updatedFormData, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem('accessToken')}`,
        },
      });

      message.success("프로필이 성공적으로 수정되었습니다.");
      setIsEditing(false);
    } catch (error) {
      console.error('프로필 수정에 실패했습니다.', error);
      message.error('프로필 수정에 실패했습니다.');
    }
  };

  const handleEditCancelClick = () => {
    setIntroduction(initialData.introduction);
    setFormData(initialData);
    setIsEditing(false);
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

  if (!formData) {
    return <div>Loading...</div>;
  }

  const user = formData;

  return (
    <div style={{ marginLeft: !isMobile ? '30px' : '20px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <div style={{ fontSize: isDesktopOrLaptop ? '25px' : '20px', fontWeight: '600', marginTop: '20px' }}>내 정보</div>
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
        {isEditing ? (
          <Upload
            action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
            listType="picture-circle"
            fileList={fileList}
            onPreview={handlePreview}
            onChange={handleChange}
          >
            {fileList.length >= 1 ? null : uploadButton}
          </Upload>
        ) : (
          <div className={!isMobile ? style.mincircle : style.mobcircle}>
            <img src={user.img || AltImage} alt="유저이미지" />
          </div>
        )}
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
      {tab === '1' && <Studyinfo isEditing={isEditing} />}
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
