import React, { useState, useEffect } from "react";
import style from "./UserDetail.module.css";
import { Select, Input } from 'antd';
import { data_mentee } from '../../../assets/data/mentee';
import { data_study } from '../../../assets/data/study';
import { editStateAtom } from "../../../recoil/atoms/mypage";
import { useRecoilState } from "recoil";

const Studyinfo = ( ) => {

  const [isEditing, setIsEditing] = useRecoilState(editStateAtom);
  const [formData, setFormData] = useState(data_mentee[2]);
  const [studyData, setStudyData] = useState(data_study[0]);

  const user = formData;
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
      <div className={style.border} style={{ marginTop: '30px', marginLeft: '10px'}}>
        <div style={{ fontSize: '20px', fontWeight: '900' }}>과외 소개</div>
        <div style={{ marginTop: '10px' }}>
          {isEditing ? (
            <TextArea 
              value={studyData.content} 
              onChange={(e) => setStudyData({ ...studyData, content: e.target.value })} 
              placeholder={placeholdercontents} 
              rows={4} 
              showCount
              maxLength={200}
              style={{
                height: 120,
                resize: 'none',
              }}
            />
          ) : (
            <div 
              style={{color:'#444444', fontSize:'16px'}} 
              dangerouslySetInnerHTML={formatTextWithLineBreaks(studyData.content)} 
            />
          )}
        </div>
      </div>

      <div className={style.border} style={{ marginTop: '30px', marginLeft: '10px' }}>
        <div style={{ fontSize: '20px', fontWeight: '900' }}>과목</div>
        <div style={{ marginTop: '10px' }}>
          <div style={{color:'#444444', fontSize:'16px'}}>{user.subject.join(', ')}</div>
        </div>
      </div>

      <div className={style.border} style={{ marginTop: '30px', marginLeft: '10px' }}>
        <div style={{ fontSize: '20px', fontWeight: '900' }}>과외 방식</div>
        <div style={{ marginTop: '10px' }}>
          <div style={{color:'#444444', fontSize:'16px'}}>{user.method === 0 ? '대면' : user.method === 1 ? '비대면' : '블렌딩'}</div>
        </div>
      </div>

      <div className={style.border} style={{ marginTop: '30px', marginLeft: '10px' }}>
        <div style={{ fontSize: '20px', fontWeight: '900' }}>과외 일정</div>
        <div style={{ marginTop: '10px' }}>
          {isEditing ? (
            <TextArea 
              value={studyData.schedule}
              onChange={(e) => setStudyData({ ...studyData, schedule: e.target.value })}
              placeholder={placeholderschedule}
              showCount
              maxLength={100}
              style={{
                height: 120,
                resize: 'none',
              }}
            />
          ) : (
            <div 
              style={{color:'#444444', fontSize:'16px'}} 
              dangerouslySetInnerHTML={formatTextWithLineBreaks(studyData.schedule || '등록된 일정이 없습니다.')} 
            />
          )}
        </div>
      </div>

      <div className={style.border} style={{ marginTop: '30px', marginLeft: '10px' }}>
        <div style={{ fontSize: '20px', fontWeight: '900' }}>과외비</div>
        <div style={{ marginTop: '10px' }}>
          {isEditing ? (
            <div>
                <div style={{marginBottom:'20px'}}>
                <span style={{marginRight:'10px', opacity:'0.5'}}>최소 금액</span>{formatCurrency(user.fee)}원
                </div> 
                <TextArea 
                value={studyData.feeDescription}
                onChange={(e) => setStudyData({ ...studyData, feeDescription: e.target.value })}
                placeholder={placeholderfee}
                rows={2}
                showCount
                maxLength={100}
                style={{
                    height: 120,
                    resize: 'none',
                }}  
                />
            </div>
          ) : (
            <div>
                <div style={{marginBottom:'20px'}}>
                <span style={{marginRight:'10px', opacity:'0.5'}}>최소 금액</span>{formatCurrency(user.fee)}원
                </div>    
                <div 
                style={{color:'#444444', fontSize:'16px'}} 
                dangerouslySetInnerHTML={formatTextWithLineBreaks(studyData.feeDescription || '등록된 과외비 설명이 없습니다.')} 
                />
            </div>
          )}
        </div>
      </div>

      <div className={style.border} style={{ marginTop: '30px', marginLeft: '10px' }}>
        <div style={{ fontSize: '20px', fontWeight: '900' }}>시범 과외</div>
        <div style={{ marginTop: '10px' }}>
          {isEditing ? (
            <Select
              value={studyData.test}
              onChange={(value) => setStudyData({ ...studyData, test: value })}
              options={[
                { value: '무료', label: '무료' },
                { value: '유료', label: '유료' },
                { value: '불가', label: '불가' },
              ]}
              style={{ width: '100%' }}
            />
          ) : (
            <div style={{color:'#444444', fontSize:'16px'}}>{studyData.test || '등록된 시범 과외 정보가 없습니다.'}</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Studyinfo;
