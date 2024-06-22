import React from "react";
import style from "./Button.module.css";

const NavigateButton = ({ title, onClick }) => {

    return (
        <div className={style.navigate}>
            {title}
        </div>
    );
};

export default NavigateButton;
