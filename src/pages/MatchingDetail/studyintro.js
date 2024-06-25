import React, { useEffect, useState } from "react";
import style from "./MatchingDetail.module.css";
import Selfintro from "./selfintro";

const Studyintro = () => {
  const profile = JSON.parse(sessionStorage.getItem('selectedProfile')) || {};
  const initialStudyData = { 
    content: profile.contents || '', 
    pr: profile.pr || '' ,
  };

  const [studyData, setStudyData] = useState(initialStudyData);

  const formatTextWithLineBreaks = (text) => {
    return { __html: text.replace(/\n/g, '<br />') };
  };

  const formatCurrency = (amount) => {
    if (!amount) return '';
    const numericAmount = Number(String(amount).replace(/[^0-9]/g, ''));
    return new Intl.NumberFormat('ko-KR').format(numericAmount);
  };

  const subjects = [profile.subject1, profile.subject2, profile.subject3, profile.subject4, profile.subject5].filter(Boolean).join(', ');
  const locations = [profile.location1, profile.location2, profile.location3].filter(Boolean).join(', ');

  return (
    <div className={style.contents}>
      <Selfintro/>
      <div className={style.border} style={{ marginTop: '30px'}}>
        <div style={{ fontSize: '20px', fontWeight: '900' }}>과외 소개</div>
        <div style={{ marginTop: '10px' }}>
            <div 
              style={{color:'#444444', fontSize:'16px'}} 
              dangerouslySetInnerHTML={formatTextWithLineBreaks(studyData.content) || '등록된 과외소개가 없습니다.'} 
            />
        </div>
      </div>

      <div className={style.border} style={{ marginTop: '30px'}}>
        <div style={{ fontSize: '20px', fontWeight: '900' }}>과목</div>
        <div style={{ marginTop: '10px' }}>
          <div style={{color:'#444444', fontSize:'16px'}}>{subjects || '등록된 과목이 없습니다.'}</div>
        </div>
      </div>

      <div className={style.border} style={{ marginTop: '30px'}}>
        <div style={{ fontSize: '20px', fontWeight: '900' }}>과외 방식</div>
        <div style={{ marginTop: '10px' }}>
          <div style={{color:'#444444', fontSize:'16px'}}>{profile.method}</div>
        </div>
      </div>

      <div className={style.border} style={{ marginTop: '30px'}}>
        <div style={{ fontSize: '20px', fontWeight: '900' }}>과외 일정</div>
        <div style={{ marginTop: '10px' }}>
            <div 
              style={{color:'#444444', fontSize:'16px'}} 
              dangerouslySetInnerHTML={formatTextWithLineBreaks(profile.schedule || '등록된 일정이 없습니다.')} 
            />
        </div>
      </div>

      <div className={style.border} style={{ marginTop: '30px' }}>
        <div style={{ fontSize: '20px', fontWeight: '900' }}>과외비</div>
        <div style={{ marginTop: '10px' }}>
            <div>
              <span style={{marginRight:'10px', opacity:'0.5'}}>최소 금액</span>{formatCurrency(profile.fee)}원
            </div>    
        </div>
      </div>

      <div className={style.border} style={{ marginTop: '30px'}}>
        <div style={{ fontSize: '20px', fontWeight: '900' }}>어필</div>
        <div style={{ marginTop: '10px' }}>
            <div 
              style={{color:'#444444', fontSize:'16px'}} 
              dangerouslySetInnerHTML={formatTextWithLineBreaks(studyData.pr || '등록된 어필이 없습니다.')} 
            />
        </div>
      </div>
    </div>
  );
};

export default Studyintro;
