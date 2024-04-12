import React, { useState } from 'react';
import style from './Modal.module.css';

const AgeModal = ({ isOpen, closeModal, applyFilter }) => {
    const [minAge, setMinAge] = useState(''); // 최소 나이를 관리하는 상태
    const [maxAge, setMaxAge] = useState(''); // 최대 나이를 관리하는 상태

    const handleApplyFilter = () => {
        const min = parseInt(minAge);
        const max = parseInt(maxAge);

        if (!isNaN(min) && !isNaN(max) && min <= max) {
            applyFilter(min, max); // 최소와 최대 나이를 applyFilter 함수로 전달
            closeModal();
        } else {
            console.log('유효하지 않은 나이입니다.');
        }
    };

    const resetFilter = () => {
        setMinAge('');
        setMaxAge('');
        applyFilter(); // 모든 필터를 초기화하여 모든 프로필을 보여줌
    };

    return (
        <div className={style.background} style={{ display: isOpen ? 'block' : 'none' }}>
            <div className={style.flex}>
                <div className={style.text_title}>나이 필터</div>
                <div onClick={closeModal} className={style.close}>
                    x
                </div>
            </div>
            <div className={style.age_background}>
                <input
                    type="text"
                    value={minAge}
                    onChange={(e) => setMinAge(e.target.value)}
                    placeholder="최소 나이를 입력하세요."
                    className={style.age}
                />
                <span className={style.dash}>~</span>
                <input
                    type="text"
                    value={maxAge}
                    onChange={(e) => setMaxAge(e.target.value)}
                    placeholder="최대 나이를 입력하세요."
                    className={style.age}
                />
            </div>
            <div className={style.foot}>
                <div className={style.apply} onClick={handleApplyFilter}>적용</div>
                <div className={style.reset} onClick={resetFilter}>초기화</div>
            </div>
        </div>
    );
};

export default AgeModal;
