import React from "react";
import style from "./Header.module.css";

const Header = (props) => {
  return (
      <div>
          <header className={style.background}>
              <span className={style.logo}>DevTogether</span>
              <div className={style.menu}>  
                <span>내 정보</span>
                <span>학생 찾기</span> 
                <span>선생님 찾기</span>
                <span>커뮤니티</span>
                <span>공지사항</span>
                <span>자주묻는질문</span>
              </div>
              <div className={style.img}>
                <img src='./bell.png' alt='알림'/>
                <img src='./user.png' alt='마이페이지' style={{marginLeft:'30px', marginRight:'20px'}}/>
              </div>  
          </header>
    </div>
  );
};
export default Header;