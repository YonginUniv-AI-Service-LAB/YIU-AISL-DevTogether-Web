import React from "react";
import style from "./Body.module.css";

const Body = (props) => {
    return (
        <div className={style.background}>
            <div className={style.body}>
                <div className={style.element}>
                    <div className={style.text}>
                        <div style={{marginBottom:'50px'}}>
                            {props.sentence1}<br/>
                            {props.sentence2}<br/>
                            {props.sentence3}<br/>
                         </div> 
                    </div>
                    <div className={style.title}>{props.title}</div>
                </div>
                <img src="./matching.png" alt="매칭게시판 이미지"></img>
            </div>
        </div>
    );
};
export default Body;
