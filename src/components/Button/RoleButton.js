import React from "react";
import style from "./Button.module.css";

const RoleButton = (props) => {
  const { isFilterApplied } = props;

  const handleClick = () => {
      if (props.onClick) {
          props.onClick(); // 클릭 이벤트 핸들러 실행
      }
  };

  return (
      <div
          className={`${style.role} ${isFilterApplied ? style.roleApplied : ""}`}
          onClick={handleClick}
      >
          {props.name}
      </div>
  );
};


export default RoleButton
