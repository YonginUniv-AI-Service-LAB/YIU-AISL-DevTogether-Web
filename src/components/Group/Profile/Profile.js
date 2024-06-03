import React from "react";
import style from "./Profile.module.css";
import MoreButton from "../../Button/MoreButton";
import ScrapButton from "../../Button/ScrapButton";
import { useMediaQuery } from "react-responsive";
import { useNavigate } from "react-router-dom";

const Profile = (props) => {
  // 반응형 화면
  const isDesktopOrLaptop = useMediaQuery({ minWidth: 992 });
  const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 991 });
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const isNotMobile = useMediaQuery({ minWidth: 768 });

  const navigate = useNavigate();

  const handleMoreButtonClick = () => {
    console.log('Profile props:', props.role);
    const detailPagePath = props.role === 2 ? `/matching/mentor/${props.id}` : `/matching/mentee/${props.id}`;
    navigate(detailPagePath); // 프로필 상세 페이지로 이동
  };

  return (
    <div className={style.background} style={{ width: isMobile ? '176px' : '200px' }}>
      <div className={`${style.circle} ${style.circleImage}`}>
        <img src={props.imagepath} alt={props.imagetext} />
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginRight: '10px', marginLeft: '10px', marginTop: '25px' }}>
        <ScrapButton nickname={props.nickname} />
        <MoreButton onClick={handleMoreButtonClick} />
      </div>
      <div className={style.information}>
        <span style={{ fontWeight: '900' }}>{props.nickname}</span><br />
        <span style={{ fontSize: isMobile ? '12px' : '15px' }}>{props.subject}</span><br />
        <span style={{ fontSize: isMobile ? '12px' : '15px' }}>{props.gender}</span>
        <span style={{ opacity: '0.3' }}> | </span>
        <span style={{ fontSize: isMobile ? '12px' : '15px' }}>{props.age}</span><br />
        <span style={{ fontSize: isMobile ? '12px' : '15px' }}>{props.location}</span><br />
      </div>
    </div>
  );
};

export default Profile;
