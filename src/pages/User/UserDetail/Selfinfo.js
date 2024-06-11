import React, { useState, useEffect } from "react";
import style from "./UserDetail.module.css";
import { useMediaQuery } from "react-responsive";
import { Select, Input, Badge } from 'antd';
import EditSelect from "../../../components/Select/EditSelect";
import { data_location } from "../../../assets/data/location";
import { data_subject } from "../../../assets/data/subject";
import { data_mentee } from '../../../assets/data/mentee';
import NormalButton from "../../../components/Button/NormalButton";
import { editStateAtom } from "../../../recoil/atoms/mypage";
import { useRecoilState } from "recoil";

const { TextArea } = Input;

const Selfinfo = () => {
  const ismiddle = useMediaQuery({ maxWidth: 1226, minWidth: 768 });
  const isDesktopOrLaptop = useMediaQuery({ minWidth: 992 });
  const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 991 });
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const isNotMobile = useMediaQuery({ minWidth: 768 });

  const [isEditing, setIsEditing] = useRecoilState(editStateAtom);
  const [formData, setFormData] = useState(data_mentee[2]);

  const [name, setName] = useState(formData.name);
  const [img, setImg] = useState(formData.img);
  const [introduction, setIntroduction] = useState(formData.introduction);
  const [selectedSubject, setSelectedSubject] = useState(formData.subject);
  const [selectedLocation, setSelectedLocation] = useState(formData.location1);
  const [selectedMethod, setSelectedMethod] = useState(
    Array.isArray(formData.method) ? formData.method.map(m => m.toString()) : [formData.method.toString()]
  );
  const [career, setCareer] = useState(formData.career);
  const [portfolio, setPortfolio] = useState(formData.portfolio);

  const formatCurrency = (amount) => {
    if (!amount) return '';
    const numericAmount = Number(String(amount).replace(/[^0-9]/g, ''));
    return new Intl.NumberFormat('ko-KR').format(numericAmount);
  };

  const [fee, setFee] = useState(formatCurrency(formData.fee));

  useEffect(() => {
    setName(formData.name);
    setImg(formData.img);
    setIntroduction(formData.introduction);
    setSelectedSubject(formData.subject);
    setSelectedLocation(formData.location1);
    setSelectedMethod(Array.isArray(formData.method) ? formData.method.map(m => m.toString()) : [formData.method.toString()]); 
    setFee(formatCurrency(formData.fee));
    setCareer(formData.career);
  }, [formData]);

  const handleSaveClick = () => {
    if (!selectedSubject.length) {
      alert('과목을 선택해주세요.');
      return;
    }
    if (!selectedLocation.length) {
      alert('지역을 선택해주세요.');
      return;
    }
    if (!selectedMethod.length) {
      alert('과외 방식을 선택해주세요.');
      return;
    }
    if (!fee.trim()) {
      alert('과외 금액을 입력해주세요.');
      return;
    }

    const filteredCareer = career.filter((item) => item.trim() !== '');
    const updatedData = {
      ...formData,
      career: filteredCareer,
      name: name,
      img: img,
      introduction: introduction,
      subject: selectedSubject,
      location1: selectedLocation,
      method: selectedMethod.map(m => parseInt(m, 10)),
      fee: fee.replace(/[^0-9]/g, ''),
    };
    setFormData(updatedData);
    setIsEditing(false);
  };

  const handleEditCancelClick = () => {
    setName(formData.name);
    setImg(formData.img);
    setIntroduction(formData.introduction);
    setSelectedSubject(formData.subject);
    setSelectedLocation(formData.location1);
    setSelectedMethod(Array.isArray(formData.method) ? formData.method.map(m => m.toString()) : [formData.method.toString()]);
    setFee(formatCurrency(formData.fee));
    setCareer(formData.career.filter(item => item.trim() !== ''));
    setIsEditing(false);
  };

  const handleSubjectChange = (value) => {
    if (value.length <= 5) {
      setSelectedSubject(value);
    }
  };

  const handleLocationChange = (value) => {
    setSelectedLocation(value);
  };

  const handleFeeChange = (e) => {
    const inputValue = e.target.value.replace(/\D/g, '');
    setFee(inputValue ? formatCurrency(inputValue) : '');
  };

  const handleMethodChange = (value) => {
    setSelectedMethod(value);
  };

  // const handleCareerInputChange = (value, index) => {
  //   const updatedCareer = [...career];
  //   updatedCareer[index] = value;
  //   setCareer(updatedCareer);
  // };

  // const handleAddCareerInput = () => {
  //   setCareer([...career, '']);
  // };

  // const handleDeleteCareer = (index) => {
  //   const updatedCareer = career.filter((_, i) => i !== index);
  //   setCareer(updatedCareer);
  // };

  const handlePortfolioChange = (e) => {
    setPortfolio(e.target.value);
  };

  return (
    <div className={style.contents}>
      <div style={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', marginTop: '30px'  }}>
        <div className={style.border} style={{ flex: '1', marginRight: isMobile ? '0' : '20px', marginBottom: isMobile ? '20px' : '0' }}>
          <span style={{ fontSize: '20px', fontWeight: '900' }}>기본 정보</span>
          <div style={{ marginTop: '20px' }}>
            <div style={{ display: 'flex', marginBottom: '10px' }}>
              <div style={{ flex: '1' }}>
                <span style={{ fontSize: '15px', fontWeight: '600', color: '#666666' }}>이름</span>
              </div>
              <div style={{ flex: '4' }}>
                  {formData.name}
              </div>
            </div>

            <div style={{ display: 'flex', marginBottom: '10px' }}>
              <div style={{ flex: '1' }}>
                <span style={{ fontSize: '15px', fontWeight: '600', color: '#666666' }}>성별</span>
              </div>
              <div style={{ flex: '4' }}>
                {formData.gender === 0 ? '남자' : '여자'}
              </div>
            </div>

            <div style={{ display: 'flex', marginBottom: '10px' }}>
              <div style={{ flex: '1' }}>
                <span style={{ fontSize: '15px', fontWeight: '600', color: '#666666' }}>나이</span>
              </div>
              <div style={{ flex: '4' }}>
                {formData.age}세
              </div>
            </div>

            <div style={{ display: 'flex',flexDirection: (isEditing && ismiddle) ? 'column' : 'row', marginBottom: '10px' }}>
              <div style={{ flex: '1' }}>
                <span style={{ fontSize: '15px', fontWeight: '600', color: '#666666' }}>과목</span>
              </div>
              <div style={{ flex: '4' }}>
                {isEditing ? (
                  <EditSelect
                    value={selectedSubject}
                    placeholder="과목 (최대 5개)"
                    className={style.inputField}
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
                    onChange={(value) => handleSubjectChange(value)}
                    maxTags={5}
                  />
                ) : (
                  <div>{Array.isArray(formData.subject) ? formData.subject.join(', ') : formData.subject}</div>
                )}
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: (isEditing && ismiddle) ? 'column' : 'row', marginBottom: '10px' }}>
              <div style={{ flex: '1' }}>
                <span style={{ fontSize: '15px', fontWeight: '600', color: '#666666' }}>지역</span>
              </div>
              <div style={{ flex: '4' }}>
                {isEditing ? (
                  <EditSelect
                    value={selectedLocation}
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
                ) : (
                  <div>{Array.isArray(formData.location1) ? formData.location1.join(', ') : formData.location1}</div>
                )}
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: (isEditing && ismiddle) ? 'column' : 'row', marginBottom: '10px' }}>
              <div style={{ flex: '1' }}>
                <span style={{ fontSize: '15px', fontWeight: '600', color: '#666666' }}>과외방식</span>
              </div>
              <div style={{ flex: '4' }}>
                {isEditing ? (
                  <EditSelect
                    value={selectedMethod}
                    placeholder="과외 방식"
                    options={[
                      { value: '0', label: '대면' },
                      { value: '1', label: '비대면' },
                      { value: '2', label: '블렌딩' }
                    ]}
                    onChange={(newValue) => handleMethodChange(newValue)}
                    maxTags={3}
                  />
                ) : (
                  <div>
                    {Array.isArray(formData.method) 
                      ? formData.method.map(m => (m === 0 ? '대면' : m === 1 ? '비대면' : '블렌딩')).join(', ') 
                      : (formData.method === 0 ? '대면' : formData.method === 1 ? '비대면' : '블렌딩')}
                  </div>
                )}
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection:(isEditing && ismiddle) ? 'column' : 'row', marginBottom: '10px' }}>
              <div style={{ flex: '1' }}>
                <span style={{ fontSize: '15px', fontWeight: '600', color: '#666666' }}>과외비</span>
              </div>
              <div style={{ flex: '4' }}>
                {isEditing ? (
                  <Input
                    className={style.feeField}
                    type="text"
                    placeholder="과외 금액"
                    suffix="원"
                    value={fee}
                    onChange={handleFeeChange}
                    style={{width:'200px'}}
                  />     
                ) : (
                  <div>{formatCurrency(formData.fee)} 원</div>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className={style.border} style={{ flex: '1', marginLeft: isMobile ? '0' : '20px', marginBottom: isMobile ? '20px' : '0' }}>
          <span style={{ fontSize: '20px', fontWeight: '900' }}>포트폴리오</span>
          <div style={{ marginTop: '20px' }}>
            {isEditing ? (
              <TextArea
                value={portfolio}
                placeholder="포트폴리오 링크"
                onChange={handlePortfolioChange}
                rows={4}
                style={{ resize: 'none' }}
              />
            ) : (
              <div style={{ display: 'flex', alignContent: 'center', justifyContent: 'center', marginTop: '100px' }}>
                {portfolio ? portfolio : '등록된 포트폴리오가 없습니다.'}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Selfinfo;
