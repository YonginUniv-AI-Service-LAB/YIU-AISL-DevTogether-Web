import React, { useState } from "react";
import style from "./UserDetail.module.css";
import { useMediaQuery } from "react-responsive";
import { Tabs, Input, Upload, Image, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import Studyinfo from "./Studyinfo";
import Selfinfo from "./Selfinfo";
import Reviewinfo from "./Reviewinfo";
import { data_mentee } from '../../../assets/data/mentee';
import FilterButton from "../../../components/Button/FilterButton";
import { editStateAtom } from "../../../recoil/atoms/mypage";
import { useRecoilState } from "recoil";

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
  const isNotMobile = useMediaQuery({ minWidth: 768 });

  const [isEditing, setIsEditing] = useRecoilState(editStateAtom);
  const [tab, setTab] = useState('1');
  const [formData, setFormData] = useState(data_mentee[2]);
  const [introduction, setIntroduction] = useState(formData.introduction);
  const [initialData, setInitialData] = useState(data_mentee[2]);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [fileList, setFileList] = useState([
    {
      uid: '-1',
      name: 'image.png',
      status: 'done',
      url: formData.img,
    },
  ]);

  const handleTab = (value) => {
    setTab(value);
  };

  const handleIntroductionChange = (e) => {
    setIntroduction(e.target.value);
  };

  const handleSaveClick = () => {
    // 현재 상태를 저장하여 초기 상태로 설정합니다.
    setFormData(prevState => ({
      ...prevState,
      introduction: introduction,
      img: fileList.length > 0 ? fileList[0].url : formData.img,
    }));
    setInitialData(prevState => ({
      ...prevState,
      introduction: introduction,
      img: fileList.length > 0 ? fileList[0].url : formData.img,
    })); // 초기 상태로 설정합니다.
    setIsEditing(false);
  };
  
  const handleEditCancelClick = () => {
    // 초기 상태로 되돌립니다.
    setIntroduction(initialData.introduction); // 초기 상태로 되돌립니다.
    setFormData(initialData); // 초기 상태로 되돌립니다.
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
            <img src={user.img} alt="유저이미지" />
          </div>
        )}
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', marginLeft: '20px' }}>
          <div className={!isMobile ? style.writer : style.mobwriter}>{user.nickname}</div>
          {isEditing ? (
            <Input
              className={!isMobile ? style.introduction : style.mobintroduction}
              value={introduction}
              onChange={handleIntroductionChange}
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
          // {
          //   label: '리뷰',
          //   key: '3',
          // },
        ]}
      />
      {tab === '1' && <Studyinfo isEditing={isEditing} />}
      {/* {tab === '1' && <Selfinfo isEditing={isEditing} />} */}
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
