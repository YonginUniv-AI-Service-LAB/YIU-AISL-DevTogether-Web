import React from 'react';
import style from './Modal.module.css';

const FilterModal = ({ isOpen, closeModal }) => {
      // 페이지 이동
    return (
        <div className={style.filter} style={{ display: isOpen ? 'block' : 'none' }}>
            <h1>필터를 키면 보입니다</h1>
            <div style={{ color: 'red' }}>필터를 키면 보입니다필터를 키면 보입니다필터를 키면 보입니다필터를 키면 보입니다필터를 키면 보입니다필터를 키면 보입니다</div>
            <button onClick={closeModal}>모달 닫기</button>
        </div>
    );
};

export default FilterModal;
