import React, { useState } from 'react';
import style from './Modal.module.css';

const AgeModal = ({ isOpen, closeModal, applyFilter }) => {
    const [selectedAges, setSelectedAges] = useState([]); // 선택된 나이을 관리하는 상태
    const [showAgeList, setShowAgeList] = useState(false); // 나이 목록을 보이게 할지 여부를 관리하는 상태
    const [showAddAgediv, setShowAddAgediv] = useState(true); // 나이 추가 버튼을 보이게 할지 여부를 관리하는 상태

    const Ages = [20, 21, 22, 23, 24, 25, 26]; // 나이 목록입니다.

    // 나이을 선택했을 때 실행되는 함수
    const handleAgeSelect = (Age) => {
        // 이미 선택된 나이인지 확인
        if (!selectedAges.includes(Age)) {
            setSelectedAges([...selectedAges, Age]); // 선택된 나이에 새로운 나이 추가
            setShowAgeList(false); // 나이을 선택한 후에는 나이 목록을 숨깁니다.
            setShowAddAgediv(true); // 나이을 선택한 후에는 나이 추가 버튼을 다시 보이게 합니다.
        }
    };

    // 나이 목록을 토글하는 함수
    const toggleAgeList = () => {
        setShowAgeList(!showAgeList); // 나이 목록의 보이기/숨기기 상태를 토글합니다.
    };

    // 나이 추가 버튼을 눌렀을 때 실행되는 함수
    const handleAddAgedivClick = () => {
        setShowAddAgediv(false); // 나이 추가 버튼을 누르면 해당 버튼을 숨깁니다.
        setShowAgeList(true); // 나이 추가 버튼을 누르면 나이 목록을 보이게 합니다.
    };

    // 필터 초기화 함수
    const resetFilter = () => {
        setSelectedAges([]); // 선택된 나이 초기화
    };

    const handleApplyFilter = () => {
        applyFilter(selectedAges);
        closeModal(); // 필터 적용 후 모달 닫기
    };

    return (
        <div className={style.background} style={{ display: isOpen ? 'block' : 'none' }}>
            <div>
                <div className={style.head}>
                    <div className={style.title}>나이 필터</div>
                    {/* 닫는 버튼 */}
                    <div onClick={closeModal} className={style.close}>x</div>
                </div>
                
                {/* 선택된 나이을 표시하는 버튼 */}
                {selectedAges.map((age, index) => (
                    <div className={style.text} key={index}>{age}</div>
                ))}
                {/* 나이 선택 버튼 */}
                {!showAgeList && selectedAges.length === 0 && (
                    <div className={style.text} onClick={toggleAgeList}>나이을 선택하세요</div>
                )}
                {/* 나이 추가 버튼 */}
                {showAddAgediv && selectedAges.length < Ages.length && (
                    <div className={style.text} onClick={handleAddAgedivClick}>+</div>
                )}
                {/* 나이 목록 */}
                {showAgeList && (
                    <div style={{ maxHeight: '150px', overflowY: 'auto' }}>
                        {/* 나이 목록을 표시하고 클릭할 때마다 해당 나이을 선택하는 버튼을 생성합니다. */}
                        {Ages.map((Age, index) => (
                            // 이미 선택된 나이은 선택 목록에 없으므로 선택 목록에 있는 나이만 보여줍니다.
                            selectedAges.includes(Age) ? null : (
                                <div className={style.select} key={index} onClick={() => handleAgeSelect(Age)}>{Age}</div>
                            )
                        ))}
                    </div>
                )}
                <div style={{display:'flex'}}>
                    <div className={style.apply} onClick={handleApplyFilter}>적용</div>
                    <div className={style.reset} onClick={resetFilter}>초기화</div>
                </div>
                
            </div>
        </div>
    );
};

export default AgeModal;
