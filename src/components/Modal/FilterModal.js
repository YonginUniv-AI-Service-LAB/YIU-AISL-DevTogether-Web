import React from 'react';
import style from './Modal.module.css';

const FilterModal = ({ isOpen, closeModal }) => {
      // 페이지 이동
    return (
        <div className={style.filter} style={{ display: isOpen ? 'block' : 'none' }}>
            <div>
            <div> </div>
            <button onClick={closeModal}>모달 닫기</button>
            </div>
        </div>
    );
};

export default FilterModal;
