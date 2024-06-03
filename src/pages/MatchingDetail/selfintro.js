import React, { useState, useEffect } from "react";
import style from "./MatchingDetail.module.css";
import { Select, Input, Badge } from 'antd';
import EditSelect from "../../components/Select/EditSelect";
import { data_location } from "../../assets/data/location";
import { data_subject } from "../../assets/data/subject";
import NormalButton from "../../components/Button/NormalButton";
import { useMediaQuery } from "react-responsive";

const Selfintro = ({ profile }) => {

  const isDesktopOrLaptop = useMediaQuery({ minWidth: 992 });
  const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 991 });
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const isNotMobile = useMediaQuery({ minWidth: 768 });
  
  // profile 값이 존재하지 않을 경우 기본값 설정
  const formData = profile || {
    name: '',
    img: '',
    introduction: '',
    subject: [],
    location1: [],
    method: [],
    fee: '',
    career: [],
    gender: 0,
    age: '',
  };

  const [name, setName] = useState(formData.name);
  const [img, setImg] = useState(formData.img);
  const [introduction, setIntroduction] = useState(formData.introduction);
  const [selectedSubject, setSelectedSubject] = useState(formData.subject);
  const [selectedLocation, setSelectedLocation] = useState(formData.location1);
  const [selectedMethod, setSelectedMethod] = useState(
    Array.isArray(formData.method) ? formData.method.map(m => m.toString()) : [formData.method.toString()]
  );
  const [career, setCareer] = useState(formData.career);

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

  const handleCareerInputChange = (value, index) => {
    const updatedCareer = [...career];
    updatedCareer[index] = value;
    setCareer(updatedCareer);
  };

  const handleAddCareerInput = () => {
    setCareer([...career, '']);
  };

  const handleDeleteCareer = (index) => {
    const updatedCareer = career.filter((_, i) => i !== index);
    setCareer(updatedCareer);
  };

  return (
    <div className={style.contents}>
      <div style={{ display: 'flex', flexDirection: 'column', marginTop: '30px', marginLeft: '10px'  }}>
        <div style={{ display: 'flex', flexDirection: !isMobile ? 'row' : 'column', justifyContent: 'space-between' }}>
          <div className={style.border} style={{ flex: '1', marginRight: '20px' }}>
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

              <div style={{ display: 'flex', marginBottom: '10px' }}>
                <div style={{ flex: '1' }}>
                  <span style={{ fontSize: '15px', fontWeight: '600', color: '#666666' }}>과목</span>
                </div>
                <div style={{ flex: '4' }}>
                    <div>{Array.isArray(formData.subject) ? formData.subject.join(', ') : formData.subject}</div>
                </div>
              </div>

              <div style={{ display: 'flex', marginBottom: '10px' }}>
                <div style={{ flex: '1' }}>
                  <span style={{ fontSize: '15px', fontWeight: '600', color: '#666666' }}>지역</span>
                </div>
                <div style={{ flex: '4' }}>
                    <div>{Array.isArray(formData.location1) ? formData.location1.join(', ') : formData.location1}</div>
                </div>
              </div>

              <div style={{ display: 'flex', marginBottom: '10px' }}>
                <div style={{ flex: '1' }}>
                  <span style={{ fontSize: '15px', fontWeight: '600', color: '#666666' }}>과외방식</span>
                </div>
                <div style={{ flex: '4' }}>
                    <div>
                      {Array.isArray(formData.method) 
                        ? formData.method.map(m => (m === 0 ? '대면' : m === 1 ? '비대면' : '블렌딩')).join(', ') 
                        : (formData.method === 0 ? '대면' : formData.method === 1 ? '비대면' : '블렌딩')}
                    </div>
                </div>
              </div>

              <div style={{ display: 'flex', marginBottom: '10px' }}>
                <div style={{ flex: '1' }}>
                  <span style={{ fontSize: '15px', fontWeight: '600', color: '#666666' }}>과외비</span>
                </div>
                <div style={{ flex: '4' }}>
                    <div>{formatCurrency(formData.fee)} 원</div>
                </div>
              </div>
            </div>
          </div>

          <div className={style.border} style={{ flex: '1', marginLeft: !isMobile ? '20px' : '', marginTop: !isMobile ? '': '30px' }}>
            <div style={{display:'flex', justifyContent:'space-between'}}>
               <span style={{ fontSize: '20px', fontWeight: '900' }}>경력</span>
            </div>
              <div>
                {career.length > 0 && career.some(item => item.trim() !== '') ? (
                career.filter(item => item.trim() !== '').map((item, index) => (
                    <div key={index} style={{ marginTop: '15px', marginLeft: '5px' }}>
                    <Badge status="default" text={item} />
                    </div>
                ))
                ) : (
                <div style={{ display: 'flex', justifyContent: 'center', marginTop: '100px' }}>등록된 경력이 없습니다.</div>
                )}
              </div>
          </div>
        </div>

        <div className={style.border} style={{ marginTop: '30px', minHeight:'400px' }}>
          <span style={{ fontSize: '20px', fontWeight: '900' }}>포트폴리오</span>
          <div style={{ display: 'flex', alignContent: 'center', justifyContent: 'center', marginTop: '100px' }}>등록된 포트폴리오가 없습니다.</div>
        </div>
      </div>
    </div>
  );
};

export default Selfintro;
