import React from "react";
import style from "./CheckBox.module.css";

const PWDCheckBox = (props) => {
  const { isChecked, onChange, label } = props;

  const handleChange = () => {
    if (onChange) {
      onChange(!isChecked); // 체크 상태를 반전시킴
    }
  };

  return (
    <div className={style.checkboxContainer}>
      <input
        type="checkbox"
        checked={isChecked}
        onChange={handleChange}
        className={style.checkboxInput}
      />
      <label className={style.checkboxLabel}>
        <span>{label}</span> {/* 레이블 텍스트 */}
      </label>
    </div>
  );
};

export default PWDCheckBox;
