import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import style from "./Review.module.css";
import { FaStar } from "react-icons/fa";
import { useRecoilState } from 'recoil';
import NormalButton from "../../Button/NormalButton";
import { editStateAtom } from '../../../recoil/atoms/mypage';
import { useMediaQuery } from 'react-responsive';

const Review = (props) => {
  const navigate = useNavigate();
  const [edit] = useRecoilState(editStateAtom);
  const [isHidden, setIsHidden] = useState(props.isHidden);
  const [buttonText, setButtonText] = useState(props.isHidden ? '보이기' : '숨기기');

  const isMobile = useMediaQuery({ maxWidth: 767 });

  useEffect(() => {
    setIsHidden(props.isHidden);
    setButtonText(props.isHidden ? '보이기' : '숨기기');
  }, [props.isHidden]);

  const renderStars = (rating) => {
    let stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(
        <FaStar
          key={i}
          className={i < rating ? style.filledStar : style.emptyStar}
        />
      );
    }
    return stars;
  };

  const calculateMonths = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const months = (end.getFullYear() - start.getFullYear()) * 12 + (end.getMonth() - start.getMonth());
    return months;
  };

  const totalMonths = calculateMonths(props.startDate, props.endDate);

  const handleToggleHide = () => {
    setIsHidden(!isHidden);
    setButtonText(isHidden ? '숨기기' : '보이기');
  };

  const handleSave = () => {
    props.onHide(props.id, isHidden);
  };

  if (!edit && isHidden) {
    return null; // 수정 상태가 아닐 때 숨김 처리된 리뷰는 렌더링하지 않음
  }

  return (
    <div className={`${style.file} ${isHidden ? style.hidden : ''}`}>
      <div className={style.background}>
        <div className={style.body}>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <div className={style.horizon}>
              <div className={style.circle}>
                <img src={props.userImage} alt="유저 이미지" />
              </div>
              <div className={style.height}>
                <div className={style.writer}>{props.nickname}</div>
                <div className={style.introduction}>{props.introduction}</div>
              </div>
            </div>
            {!edit && (
              <div style={{ fontSize: '12px', fontWeight: 'bold', color: '#444444', marginRight: '10px' }}>
                <span style={{ marginRight: '5px', opacity: '0.5' }}>작성일</span> {props.createdAt}
              </div>
            )}
            {edit && (
              <div>
                <div onClick={(e) => e.stopPropagation()}>
                  <NormalButton name={buttonText} onClick={handleToggleHide} style={{ fontSize: '12px', paddingLeft: '10px', paddingRight: '10px' }} />
                </div>
                <div style={{ fontSize: '12px', fontWeight: 'bold', color: '#444444', marginRight: '10px' }}>
                  <span style={{ marginRight: '5px', opacity: '0.5' }}>작성일</span> {props.createdAt}
                </div>
              </div>
            )}
          </div>
          <div>
            <div className={style.width}>
              <span style={{ fontWeight: '500' }}>{props.contents}</span>
            </div>
            <div className={`${style.rating} ${isMobile ? style.mobileRating : ''}`}>
              <div style={{ marginRight: '10px', fontWeight: 'bold', fontSize: '14px' }}>참여태도 {renderStars(props.preparerating)}</div>
              <div style={{ marginRight: '10px', fontWeight: 'bold', fontSize: '14px' }}>집중력 {renderStars(props.studyrating)}</div>
              <div style={{ fontWeight: 'bold', fontSize: '14px' }}>시간준수 {renderStars(props.timerating)}</div>
            </div>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <div style={{ marginTop: '20px', fontSize: '12px', fontWeight: 'bold', color: '#444444' }}>
              <span style={{ marginRight: '5px', opacity: '0.5' }}>과외기간</span> {props.startDate} ~ {props.endDate} ({totalMonths}개월)
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Review;
