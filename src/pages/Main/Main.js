import React from "react";
import { useMediaQuery } from "react-responsive";
import { useNavigate } from "react-router-dom";

import Body from '../../components/Group/Body/Body';
// import Layout from './components/Group/Layout/Layout';
import Matching_Mentee from '../../pages/Matching/MatchingMenteeList';

const MainPage = () => {
  // 반응형 화면
  const isDesktopOrLaptop = useMediaQuery({ minWidth: 992 });
  const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 991 });
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const isNotMobile = useMediaQuery({ minWidth: 768 });

  // 페이지 이동
  const navigate = useNavigate();

  return (
    <div>
<div className='background'>
      <div style={{paddingBottom:'200px'}}></div>
      <Body sentence1="보다 쉬운 코딩 과외 매칭을 위해" sentence2="DevTogether에서 더 나은 매칭 선택" title="학생 찾기 / 선생님 찾기"/>
      <Matching_Mentee/>
    </div>
    </div>
  );
};

export default MainPage;