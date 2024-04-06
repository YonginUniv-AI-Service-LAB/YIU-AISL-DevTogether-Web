import React from 'react';
import style from "./Matching.module.css";

import Sidebar from '../../components/Group/Sidebar/Sidebar';
import FillterButton from '../../components/Button/FillterButton';
import Profile from '../../components/Group/Profile/Profile';

const Matching_Menti = (props) => {
    return (
        <div className={style.color}>
            <div className={style.line}></div>
            <div className={style.background}>
                <Sidebar title1="학생 찾기" title2="선생님 찾기"/>
                <div style={{marginTop:'40px', marginLeft:'130px', marginRight:'180px'}}>
                  <div className={style.background}>
                    <div className={style.head}>학생 목록</div>
                    <div className={style.search}>닉네임으로 검색</div>
                  </div>
                  <div className={style.background} style={{marginTop:'80px', justifyContent:'space-between'}}>
                      <FillterButton name="과목"/>
                      <FillterButton name="지역"/>
                      <FillterButton name="성별"/>
                      <FillterButton name="나이"/>
                      <FillterButton name="과외방식"/>
                      <FillterButton name="수업료"/>
                  </div>
                  <div className={style.background}> 
                    <Profile name="쿠로미쨩" subject="리액트" gender="여자" age="24살" location="경기 용인시 처인구 삼가동" imagepath="./kuromi.png" imagetext="쿠로미쨩 이미지"/>
                    <Profile name="m_iiin_u" subject="자바스크립트" gender="남자" age="24살" location="경기 용인시 처인구 남동" imagepath="./keroro.png" imagetext="m_iiin_u 이미지"/>
                    <Profile name="달디단 갱갱갱" subject="C++" gender="여자" age="21살" location="충남 천안시 서북구 두정동" imagepath="./basic-user.png" imagetext="달디단 갱갱갱 이미지"/>
                    <Profile name="안영환" subject="플러터" gender="남자" age="24살" location="경기 용인시 처인구 역북동" imagepath="./youngman.png" imagetext="안영환 이미지"/>
                  </div>
                </div>
            </div>
        </div>
    );
}
export default  Matching_Menti;