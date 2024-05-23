import React from "react";
import style from "./Profile.module.css"
import MoreButton from "../../Button/MoreButton";
import ScarpButton from "../../Button/ScrapButton";
import { useMediaQuery } from "react-responsive";

const Profile = (props) => {
     // 반응형 화면
     const isDesktopOrLaptop = useMediaQuery({ minWidth: 992 });
     const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 991 });
     const isMobile = useMediaQuery({ maxWidth: 767 });
     const isNotMobile = useMediaQuery({ minWidth: 768 });

  return (

    <div className={style.background} style={{width: isMobile ? '176px' : '200px'}}>
        <div className={`${style.circle} ${style.circleImage}`}><img src={props.imagepath}  alt={props.imagetext}/></div>
        <div style={{display:'flex', justifyContent:'space-between', marginRight:'10px', marginLeft:'10px', marginTop:'25px'}}>
          <ScarpButton/>
          <MoreButton/>
        </div>
        <div className={style.information}>
            <span style={{fontWeight:'900'}}>{props.name}</span><br/>
            <span style={{fontSize: isMobile? '12px' : '15px' }}>{props.subject}</span><br/>
            <span style={{fontSize: isMobile? '12px' : '15px' }}>{props.gender}</span><span style={{opacity:'0.3'}}> | </span> <span  style={{fontSize: isMobile? '12px' : '15px' }}>{props.age}</span> <br/>
            <span style={{fontSize: isMobile? '12px' : '15px' }}>{props.location}</span><br/>
        </div>
    </div>
  );
};
export default Profile;
