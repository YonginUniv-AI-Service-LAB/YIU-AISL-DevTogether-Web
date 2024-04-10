import React from "react";
import style from "./Profile.module.css"
import MoreButton from "../../Button/MoreButton";

const Profile = (props) => {
  return (
    <div className={style.background}>
        <div className={`${style.circle} ${style.circleImage}`}><img src={props.imagepath}  alt={props.imagetext}/></div>
        <MoreButton/>
        <div className={style.information}>
            <span style={{fontWeight:'900'}}>{props.name}</span><br/>
            {props.subject}<br/>
            {props.gender}<span style={{opacity:'0.3'}}> | </span> {props.age} <br/>
            {props.location}
        </div>
    </div>
  );
};
export default Profile;
