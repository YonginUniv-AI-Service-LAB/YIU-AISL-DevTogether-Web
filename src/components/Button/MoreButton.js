import React from "react";
import style from "./Button.module.css";
import { FaPlus } from "react-icons/fa6";

const MoreButton = ({ onClick }) => {
  return (
    <div className={style.more} onClick={onClick}>
        <FaPlus size={20} />
    </div>
  );
};
export default MoreButton;