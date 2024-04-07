import React from 'react';
import style from "./Matching.module.css";

import Sidebar from '../../components/Group/Sidebar/Sidebar';
import FillterButton from '../../components/Button/FillterButton';
import Profile from '../../components/Group/Profile/Profile';

const Matching_Mentor = (props) => {
    return (
        <div className={style.color}>
            <div className={style.line}></div>
            <div className={style.background}>
                <Sidebar title1="학생 찾기" title2="선생님 찾기"/>
                <div style={{marginTop:'40px', marginLeft:'130px', marginRight:'180px'}}>
                  <div className={style.background}>
                    <div className={style.head}>선생님 목록</div>
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
                    <Profile name="이완주 교수님" subject="Python" gender="남자" age="24살" location="인천광역시 서구 검암동" imagepath="./basic-user.png" imagetext="이완주 교수님 이미지"/>
                    <Profile name="김경중 교수님" subject="플러터" gender="남자" age="24살" location="인천광역시 부평구 청천동" imagepath="./basic-user.png" imagetext="김경중 교수님 이미지"/>
                    <Profile name="변미현" subject="React" gender="여자" age="24살" location="충남 천안시 서북구 두정동" imagepath="./basic-user.png" imagetext="변미현 이미지"/>
                    <Profile name="안영환" subject="파이썬" gender="남자" age="24살" location="충남 천안시 서북구 성정동" imagepath="./basic-user.png" imagetext="안영환 이미지"/>
                  </div>
                </div>
            </div>
        </div>
    );
}
export default  Matching_Mentor;