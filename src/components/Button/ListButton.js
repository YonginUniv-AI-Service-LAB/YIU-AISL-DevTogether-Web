import React from "react";
import style from "./Button.module.css";

const ListButton = (props) => {

  const handleClick = () => {
      if (props.onClick) {
          props.onClick(); // 클릭 이벤트 핸들러 실행
      }
  };

  return (
      <div
          className={style.list}
          onClick={handleClick}
      >
          {props.name}
      </div>
  );
};


export default ListButton;
