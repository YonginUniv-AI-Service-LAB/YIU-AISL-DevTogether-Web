import React, { useState } from "react";
import style from "./Button.module.css";
// import { BsBookmark, BsBookmarkFill  } from "react-icons/bs";
import { GoHeart, GoHeartFill  } from "react-icons/go";
import {matchingScrapState, scrappedProfilesState} from "../../recoil/atoms/scrap";
import { RecoilRoot, useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';

const ScarpButton = ({nickname}) => {
  const [isBookmarked, setIsBookmarked] = useRecoilState(matchingScrapState(nickname));
  const setScrappedProfiles = useSetRecoilState(scrappedProfilesState);
    
  const handleClick = () => {
    setIsBookmarked(!isBookmarked); // 클릭 시 상태를 변경
    // 스크랩한 프로필 목록을 업데이트합니다.
    setScrappedProfiles((prevProfiles) => {
      if (isBookmarked) {
        // 만약 스크랩 상태가 true이면 해당 닉네임을 제거합니다.
        return prevProfiles.filter(profile => profile !== nickname);
      } else {
        // 스크랩 상태가 false이면 해당 닉네임을 추가합니다.
        return [...prevProfiles, nickname];
      }
    });
  };
      
  return (
      <div className={style.scrap} onClick={handleClick}>
          {isBookmarked ? <GoHeartFill size={20} style={{ color: 'red' }} />  : <GoHeart size={20} />}
      </div>
  );
};
export default ScarpButton;
