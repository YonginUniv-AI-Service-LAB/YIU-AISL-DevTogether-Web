import React from 'react';
import style from './Button.module.css';

const SortButton = ({ text, onClick }) => {
    return (
        <div className={style.sort} onClick={onClick}>
            {text}
        </div>
    );
};

export default SortButton;
