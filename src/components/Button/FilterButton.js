import React from "react";
import style from "./Button.module.css";

const FilterButton = (props) => {
  const { isFilterApplied } = props;

  const handleClick = () => {
      if (props.onClick) {
          props.onClick(); // 클릭 이벤트 핸들러 실행
      }
  };

  return (
      <div
          className={`${style.filter} ${isFilterApplied ? style.filterApplied : ""}`}
          onClick={handleClick}W
      >
          {props.name}
      </div>
  );
};


export default FilterButton;
