import React, { useState } from "react";
import style from "./MatchingDetail.module.css";
import { Select, Input } from 'antd';
import Selfintro from "./selfintro";

const Studyintro = ({ profile, isEditing }) => {
  // studyData가 존재하지 않을 경우를 대비하여 기본 값을 설정합니다.
  const initialStudyData = profile.studyData || { content: '', schedule: '', feeDescription: '', test: '' };
  const [studyData, setStudyData] = useState(initialStudyData);

  const { TextArea } = Input;

  const formatTextWithLineBreaks = (text) => {
    return { __html: text.replace(/\n/g, '<br />') };
  };

  const formatCurrency = (amount) => {
    if (!amount) return '';
    const numericAmount = Number(String(amount).replace(/[^0-9]/g, ''));
    return new Intl.NumberFormat('ko-KR').format(numericAmount);
  };

  const placeholdercontents = "구인공고에 들어갈 내용을 입력하세요 \n \nex) 파이썬을 배우고 있는 대학생입니다, 파이썬을 처음부터 친절하게 가르쳐주실 과외선생님 구합니다!  \n\nex) 웹페이지 제작에 관심이 생긴 비전공자입니다. 웹페이지 제작에 쓸만한 기술이나 언어를 알려주실 과외 구합니다";
  const placeholderschedule = "과외가 가능한 일정을 입력하세요 \n \nex) 주중 및 주말 협의\n\nex) 월요일 15:00~18:00, 문의시 조율하여 결정";
  const placeholderfee = "과외비에 대한 자세한 설명을 입력하세요 \n \n ex) 주 2회 3시간 50만원 협의가능\n\n ex) 달 5회 4시간 80만원 자세한 건 문의주시면 안내해드리겠습니다";

  return (
    <div className={style.contents}>
      <Selfintro/>
      <div className={style.border} style={{ marginTop: '30px'}}>
        <div style={{ fontSize: '20px', fontWeight: '900' }}>과외 소개</div>
        <div style={{ marginTop: '10px' }}>
            <div 
              style={{color:'#444444', fontSize:'16px'}} 
              dangerouslySetInnerHTML={formatTextWithLineBreaks(studyData.content || '등록된 과외 소개 정보가 없습니다.')} 
            />
        </div>
      </div>

      <div className={style.border} style={{ marginTop: '30px'}}>
        <div style={{ fontSize: '20px', fontWeight: '900' }}>과목</div>
        <div style={{ marginTop: '10px' }}>
          <div style={{color:'#444444', fontSize:'16px'}}>{profile.subject.join(', ')}</div>
        </div>
      </div>

      <div className={style.border} style={{ marginTop: '30px'}}>
        <div style={{ fontSize: '20px', fontWeight: '900' }}>과외 방식</div>
        <div style={{ marginTop: '10px' }}>
          <div style={{color:'#444444', fontSize:'16px'}}>{profile.method === 0 ? '대면' : profile.method === 1 ? '비대면' : '블렌딩'}</div>
        </div>
      </div>

      <div className={style.border} style={{ marginTop: '30px'}}>
        <div style={{ fontSize: '20px', fontWeight: '900' }}>과외 일정</div>
        <div style={{ marginTop: '10px' }}>
            <div 
              style={{color:'#444444', fontSize:'16px'}} 
              dangerouslySetInnerHTML={formatTextWithLineBreaks(studyData.schedule || '등록된 일정이 없습니다.')} 
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
              dangerouslySetInnerHTML={formatTextWithLineBreaks(studyData.pr || '등록된 어필 내용이 없습니다.')} 
            />
        </div>
      </div>
    </div>
  );
};

export default Studyintro;
