import React, { useState } from 'react';
import style from './Modal.module.css';

const FeeModal = ({ isOpen, closeModal, applyFilter }) => {
    const [minFee, setMinFee] = useState(''); // 최소 나이를 관리하는 상태
    const [maxFee, setMaxFee] = useState(''); // 최대 나이를 관리하는 상태

    const handleApplyFilter = () => {
        const min = parseInt(minFee);
        const max = parseInt(maxFee);

        if (!isNaN(min) && !isNaN(max) && min <= max) {
            applyFilter(min, max); // 최소와 최대 나이를 applyFilter 함수로 전달
            closeModal();
        } else {
            console.log('유효하지 않은 나이입니다.');
        }
    };

    const resetFilter = () => {
        setMinFee('');
        setMaxFee('');
        applyFilter(); // 모든 필터를 초기화하여 모든 프로필을 보여줌
    };

    return (
        <div className={style.background} style={{ display: isOpen ? 'block' : 'none' }}>
            <div className={style.flex}>
                <div className={style.text_title}>수업료 필터</div>
                <div onClick={closeModal} className={style.close}>
                    x
                </div>
            </div>
            <div className={style.age_background}>
                <input
                    type="text"
                    value={minFee}
                    onChange={(e) => setMinFee(e.target.value)}
                    placeholder="최소 금액을 입력하세요."
                    className={style.age}
                />
                <span className={style.dash}>~</span>
                <input
                    type="text"
                    value={maxFee}
                    onChange={(e) => setMaxFee(e.target.value)}
                    placeholder="최대 금액을 입력하세요."
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

export default FeeModal;
