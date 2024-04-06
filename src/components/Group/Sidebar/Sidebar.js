import React from "react";
import style from "./Sidebar.module.css";

const Sidebar = (props) => {
    return (
        <div className= {style.background}> 
            <div className={style.body}>{props.title1}</div>
            <div className={style.body}>{props.title2}</div> 
            <div className={style.body}>{props.title3}</div> 
            <div className={style.body}>{props.title4}</div> 
        </div>
    );
};

export default Sidebar;