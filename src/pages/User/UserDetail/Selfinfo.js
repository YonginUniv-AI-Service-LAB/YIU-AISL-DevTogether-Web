import React from "react";
import style from "./UserDetail.module.css";
import { useMediaQuery } from "react-responsive";
import { Select, Input } from 'antd';
import EditSelect from "../../../components/Select/EditSelect";
import { data_location } from "../../../assets/data/location";
import { data_subject } from "../../../assets/data/subject";
import { useRecoilState } from "recoil";
import { nameState, imgState, introductionState, subject1State, subject2State, subject3State, subject4State, subject5State, location1State, location2State, location3State, methodState, feeState, careerState, portfolioState, genderState, ageState } from "../../../recoil/atoms/mypage";

const { TextArea } = Input;

const Selfinfo = ({ isEditing, handleSubjectChange, handleLocationChange, handleMethodChange, handleFeeChange, handlePortfolioChange }) => {
  const ismiddle = useMediaQuery({ maxWidth: 1226, minWidth: 768 });
  const isDesktopOrLaptop = useMediaQuery({ minWidth: 992 });
  const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 991 });
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const isNotMobile = useMediaQuery({ minWidth: 768 });

  const [name] = useRecoilState(nameState);
  const [img, setImg] = useRecoilState(imgState);
  const [introduction, setIntroduction] = useRecoilState(introductionState);
  const [subject1, setSubject1] = useRecoilState(subject1State);
  const [subject2, setSubject2] = useRecoilState(subject2State);
  const [subject3, setSubject3] = useRecoilState(subject3State);
  const [subject4, setSubject4] = useRecoilState(subject4State);
  const [subject5, setSubject5] = useRecoilState(subject5State);
  const [location1, setLocation1] = useRecoilState(location1State);
  const [location2, setLocation2] = useRecoilState(location2State);
  const [location3, setLocation3] = useRecoilState(location3State);
  const [method, setMethod] = useRecoilState(methodState);
  const [fee, setFee] = useRecoilState(feeState);
  const [career, setCareer] = useRecoilState(careerState);
  const [portfolio, setPortfolio] = useRecoilState(portfolioState);
  const [gender] = useRecoilState(genderState);
  const [age] = useRecoilState(ageState);

  const formatCurrency = (amount) => {
    if (!amount) return '';
    const numericAmount = Number(String(amount).replace(/[^0-9]/g, ''));
    return new Intl.NumberFormat('ko-KR').format(numericAmount);
  };

  return (
    <div className={style.contents}>
      <div style={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', marginTop: '30px' }}>
        <div className={style.border} style={{ flex: '1', marginRight: isMobile ? '0' : '20px', marginBottom: isMobile ? '20px' : '0' }}>
          <span style={{ fontSize: '20px', fontWeight: '900' }}>기본 정보</span>
          <div style={{ marginTop: '20px' }}>
            <div style={{ display: 'flex', marginBottom: '10px' }}>
              <div style={{ flex: '1' }}>
                <span style={{ fontSize: '15px', fontWeight: '600', color: '#666666' }}>이름</span>
              </div>
              <div style={{ flex: '4' }}>
                {name || '이름 정보가 없습니다.'}
              </div>
            </div>

            <div style={{ display: 'flex', marginBottom: '10px' }}>
              <div style={{ flex: '1' }}>
                <span style={{ fontSize: '15px', fontWeight: '600', color: '#666666' }}>성별</span>
              </div>
              <div style={{ flex: '4' }}>
                {gender === "남" ? "남자" : gender === "여" ? "여자" : "성별 정보가 없습니다."}
              </div>
            </div>

            <div style={{ display: 'flex', marginBottom: '10px' }}>
              <div style={{ flex: '1' }}>
                <span style={{ fontSize: '15px', fontWeight: '600', color: '#666666' }}>나이</span>
              </div>
              <div style={{ flex: '4' }}>
                {age || '나이 정보가 없습니다.'}
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: (isEditing && ismiddle) ? 'column' : 'row', marginBottom: '10px' }}>
              <div style={{ flex: '1' }}>
                <span style={{ fontSize: '15px', fontWeight: '600', color: '#666666' }}>과목</span>
              </div>
              <div style={{ flex: '4' }}>
                {isEditing ? (
                  <EditSelect
                    value={[subject1, subject2, subject3, subject4, subject5].filter(Boolean)}
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
                    onChange={handleSubjectChange}
                    maxTags={5}
                  />
                ) : (
                  <div>{[subject1, subject2, subject3, subject4, subject5].filter(Boolean).join(', ') || '과목 정보가 없습니다.'}</div>
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
                    value={[location1, location2, location3].filter(Boolean)}
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
                    onChange={handleLocationChange}
                    maxTags={3}
                  />
                ) : (
                  <div>{[location1, location2, location3].filter(Boolean).join(', ') || '지역 정보가 없습니다.'}</div>
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
                    value={method}
                    placeholder="과외 방식"
                    options={[
                      { value: '0', label: '대면' },
                      { value: '1', label: '비대면' },
                      { value: '2', label: '블렌딩' }
                    ]}
                    onChange={handleMethodChange}
                    maxTags={1}
                  />
                ) : (
                  <div>
                    {Array.isArray(method) 
                      ? method.map(m => (m === '0' ? '대면' : m === '1' ? '비대면' : '블렌딩')).join(', ') 
                      : (method === '0' ? '대면' : method === '1' ? '비대면' : '블렌딩')}
                  </div>
                )}
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: (isEditing && ismiddle) ? 'column' : 'row', marginBottom: '10px' }}>
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
                  <div>{fee ? `${formatCurrency(fee)} 원` : '과외비 정보가 없습니다.'}</div>
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
