import React from "react";
import style from "./MatchingDetail.module.css";
import { useMediaQuery } from "react-responsive";

const Selfintro = () => {
  const isMobile = useMediaQuery({ maxWidth: 767 });

  // 세션 스토리지에서 프로필 데이터 가져오기
  const profile = JSON.parse(sessionStorage.getItem('selectedProfile')) || {};

  const formatCurrency = (amount) => {
    if (!amount) return '';
    const numericAmount = Number(String(amount).replace(/[^0-9]/g, ''));
    return new Intl.NumberFormat('ko-KR').format(numericAmount);
  };

  // 개별 subject와 location 필드를 합쳐서 사용
  const subjectText = [profile.subject1, profile.subject2, profile.subject3, profile.subject4, profile.subject5]
    .filter(Boolean)
    .join(', ');

  const locationText = [profile.location1, profile.location2, profile.location3]
    .filter(Boolean)
    .join(', ');

  return (
    <div className={style.contents}>
      <div style={{ display: 'flex', flexDirection: 'column', marginTop: '30px'}}>
        <div style={{ display: 'flex', flexDirection: !isMobile ? 'row' : 'column', justifyContent: 'space-between' }}>
          <div className={style.border} style={{ flex: '1', marginRight: '20px' }}>
            <span style={{ fontSize: '20px', fontWeight: '900' }}>기본 정보</span>
            <div style={{ marginTop: '20px' }}>
              <div style={{ display: 'flex', marginBottom: '10px' }}>
                <div style={{ flex: '1' }}>
                  <span style={{ fontSize: '15px', fontWeight: '600', color: '#666666' }}>이름</span>
                </div>
                <div style={{ flex: '4' }}>
                    {profile.nickname}
                </div>
              </div>

              <div style={{ display: 'flex', marginBottom: '10px' }}>
                <div style={{ flex: '1' }}>
                  <span style={{ fontSize: '15px', fontWeight: '600', color: '#666666' }}>성별</span>
                </div>
                <div style={{ flex: '4' }}>
                  {profile.gender}
                </div>
              </div>

              <div style={{ display: 'flex', marginBottom: '10px' }}>
                <div style={{ flex: '1' }}>
                  <span style={{ fontSize: '15px', fontWeight: '600', color: '#666666' }}>나이</span>
                </div>
                <div style={{ flex: '4' }}>
                  {profile.age}세
                </div>
              </div>

              <div style={{ display: 'flex', marginBottom: '10px' }}>
                <div style={{ flex: '1' }}>
                  <span style={{ fontSize: '15px', fontWeight: '600', color: '#666666' }}>과목</span>
                </div>
                <div style={{ flex: '4' }}>
                    <div>{subjectText}</div>
                </div>
              </div>

              <div style={{ display: 'flex', marginBottom: '10px' }}>
                <div style={{ flex: '1' }}>
                  <span style={{ fontSize: '15px', fontWeight: '600', color: '#666666' }}>지역</span>
                </div>
                <div style={{ flex: '4' }}>
                    <div>{locationText}</div>
                </div>
              </div>

              <div style={{ display: 'flex', marginBottom: '10px' }}>
                <div style={{ flex: '1' }}>
                  <span style={{ fontSize: '15px', fontWeight: '600', color: '#666666' }}>과외방식</span>
                </div>
                <div style={{ flex: '4' }}>
                    <div>{profile.method}</div>
                </div>
              </div>

              <div style={{ display: 'flex', marginBottom: '10px' }}>
                <div style={{ flex: '1' }}>
                  <span style={{ fontSize: '15px', fontWeight: '600', color: '#666666' }}>과외비</span>
                </div>
                <div style={{ flex: '4' }}>
                    <div>{formatCurrency(profile.fee)} 원</div>
                </div>
              </div>
            </div>
          </div>

          <div className={style.border} style={{ flex: '1', marginLeft: !isMobile ? '20px' : '', marginTop: !isMobile ? '' : '30px' }}>
            <span style={{ fontSize: '20px', fontWeight: '900' }}>포트폴리오</span>
            <div style={{ display: 'flex', alignContent: 'center', justifyContent: 'center', marginTop: '100px' }}>
              {profile.portfolio ? profile.portfolio : '등록된 포트폴리오가 없습니다.'}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Selfintro;
