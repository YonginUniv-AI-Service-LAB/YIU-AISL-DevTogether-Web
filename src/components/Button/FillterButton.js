import React from "react";
import style from "./Button.module.css";

const FillterButton = (props) => {
  return (
    <div className={style.fillter}>
        {props.name}
    </div>
  );
};
export default FillterButton;
