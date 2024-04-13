import React from "react";
import style from "./Sidebar.module.css";

const Sidebar = ({ title1, title2, onClick }) => {
    return (
        <div className={style.background}>
            <div className={style.fix}>
                {/* 학생 찾기 버튼 클릭 시 학생 페이지로 이동 */}
                <div className={style.body} onClick={() => onClick("mentee")}>{title1}</div>
                {/* 선생님 찾기 버튼 클릭 시 선생님 페이지로 이동 */}
                <div className={style.body} onClick={() => onClick("mentor")}>{title2}</div>
            </div>
        </div>
    );
};

export default Sidebar;
