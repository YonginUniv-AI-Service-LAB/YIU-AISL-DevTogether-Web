import React from "react";
import style from "./Button.module.css";
import { FaPlus } from "react-icons/fa6";

const MoreButton = (props) => {
  return (
    <div className={style.more}>
        <FaPlus size={20} />
    </div>
  );
};
export default MoreButton;
