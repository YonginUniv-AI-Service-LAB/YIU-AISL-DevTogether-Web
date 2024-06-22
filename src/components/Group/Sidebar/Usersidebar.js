import React from "react";
import style from "./Sidebar.module.css";
import { useMediaQuery } from "react-responsive";


const Usersidebar = ({ titles, onCategoryClick }) => {

  // 반응형 화면
  const isDesktopOrLaptop = useMediaQuery({ minWidth: 992 });
  const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 991 });
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const isNotMobile = useMediaQuery({ minWidth: 768 });

  
  return (
    <div className={style.background}>
     <div className={style.fix}>
      {titles &&
        titles.map((title, index) => (
          <div
            key={index}
            className={style.userbody}
            onClick={() => onCategoryClick(title)}
          >
            {title}
          </div>
        ))}
    </div>
  </div>
  );
};

export default Usersidebar;