import React, { useState, useEffect } from "react";
import style from "./Button.module.css";
import { GoHeart, GoHeartFill } from "react-icons/go";
import axios from 'axios';
import { message } from 'antd';

const ScrapButton = ({ profileId, isScrapped }) => {
  const [isBookmarked, setIsBookmarked] = useState(isScrapped);

  useEffect(() => {
    setIsBookmarked(isScrapped); // 초기 상태 설정
  }, [isScrapped]);

  const handleClick = async () => {
    try {
      const accessToken = sessionStorage.getItem('accessToken');
      const role = sessionStorage.getItem('role'); // 세션 스토리지에서 role 가져오기
      const scrapId = profileId;

      const params = new URLSearchParams();
      params.append('scrapId', scrapId);

      // role에 따라 API 엔드포인트 선택
      const apiEndpoint = role === '1' 
        ? (isBookmarked ? '/scrap/mentee' : '/scrap/mentee')
        : (isBookmarked ? '/scrap/mentor' : '/scrap/mentor');

      const response = await axios.post(apiEndpoint, params, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          Authorization: `Bearer ${accessToken}`
        }
      });

      if (response.status === 200) {
        setIsBookmarked(!isBookmarked); // 클릭 시 상태를 변경
        message.success('스크랩이 성공적으로 처리되었습니다.');
      } else {
        console.error('Failed to scrap/unscrap:', response.data);
        message.error('스크랩 처리에 실패했습니다.');
      }
    } catch (error) {
      console.error('Error during scrap operation:', error);
      message.error('스크랩 중 오류가 발생했습니다.');
    }
  };

  return (
    <div className={style.scrap} onClick={handleClick}>
      {isBookmarked ? (
        <GoHeartFill size={20} style={{ color: "red" }} />
      ) : (
        <GoHeart size={20} />
      )}
    </div>
  );
};

export default ScrapButton;
