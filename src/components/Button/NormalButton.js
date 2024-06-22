import React from "react";
import style from "./Button.module.css";

const NormalButton = (props) => {
  const { isApplied, style: buttonStyle } = props; // 부모 컴포넌트로부터 style prop을 받음

  const handleClick = () => {
      if (props.onClick) {
          props.onClick(); // 클릭 이벤트 핸들러 실행
      }
  };

  return (
      <div
          className={`${style.nomal} ${isApplied ? style.filterApplied : ""}`}
          onClick={handleClick}
          style={buttonStyle} // 스타일을 적용
      >
          {props.name}
      </div>
  );
};

export default NormalButton;