import React, { useState } from 'react';
import style from './Modal.module.css';

const FeeModal = ({ isOpen, closeModal, applyFilter }) => {
    const [selectedFees, setSelectedFees] = useState([]); // 선택된 수업료을 관리하는 상태
    const [showFeeList, setShowFeeList] = useState(false); // 수업료 목록을 보이게 할지 여부를 관리하는 상태
    const [showAddFeediv, setShowAddFeediv] = useState(true); // 수업료 추가 버튼을 보이게 할지 여부를 관리하는 상태

    const Fees = ['C', 'C++', 'Python', 'Java', 'JavaScript', 'Flutter', 'React', 'Spring']; // 수업료 목록입니다.

    // 수업료을 선택했을 때 실행되는 함수
    const handleFeeSelect = (Fee) => {
        // 이미 선택된 수업료인지 확인
        if (!selectedFees.includes(Fee)) {
            setSelectedFees([...selectedFees, Fee]); // 선택된 수업료에 새로운 수업료 추가
            setShowFeeList(false); // 수업료을 선택한 후에는 수업료 목록을 숨깁니다.
            setShowAddFeediv(true); // 수업료을 선택한 후에는 수업료 추가 버튼을 다시 보이게 합니다.
        }
    };

    // 수업료 목록을 토글하는 함수
    const toggleFeeList = () => {
        setShowFeeList(!showFeeList); // 수업료 목록의 보이기/숨기기 상태를 토글합니다.
    };

    // 수업료 추가 버튼을 눌렀을 때 실행되는 함수
    const handleAddFeedivClick = () => {
        setShowAddFeediv(false); // 수업료 추가 버튼을 누르면 해당 버튼을 숨깁니다.
        setShowFeeList(true); // 수업료 추가 버튼을 누르면 수업료 목록을 보이게 합니다.
    };

    // 필터 초기화 함수
    const resetFilter = () => {
        setSelectedFees([]); // 선택된 수업료 초기화
    };

    const handleApplyFilter = () => {
        applyFilter(selectedFees);
        closeModal(); // 필터 적용 후 모달 닫기
    };

    return (
        <div className={style.background} style={{ display: isOpen ? 'block' : 'none' }}>
            <div>
                <div className={style.head}>
                    <div className={style.title}>수업료 필터</div>
                    {/* 닫는 버튼 */}
                    <div onClick={closeModal} className={style.close}>x</div>
                </div>
                
                {/* 선택된 수업료을 표시하는 버튼 */}
                {selectedFees.map((Fee, index) => (
                    <div className={style.text} key={index}>{Fee}</div>
                ))}
                {/* 수업료 선택 버튼 */}
                {!showFeeList && selectedFees.length === 0 && (
                    <div className={style.text} onClick={toggleFeeList}>수업료을 선택하세요</div>
                )}
                {/* 수업료 추가 버튼 */}
                {showAddFeediv && selectedFees.length < Fees.length && (
                    <div className={style.text} onClick={handleAddFeedivClick}>+</div>
                )}
                {/* 수업료 목록 */}
                {showFeeList && (
                    <div style={{ maxHeight: '150px', overflowY: 'auto' }}>
                        {/* 수업료 목록을 표시하고 클릭할 때마다 해당 수업료을 선택하는 버튼을 생성합니다. */}
                        {Fees.map((Fee, index) => (
                            // 이미 선택된 수업료은 선택 목록에 없으므로 선택 목록에 있는 수업료만 보여줍니다.
                            selectedFees.includes(Fee) ? null : (
                                <div className={style.select} key={index} onClick={() => handleFeeSelect(Fee)}>{Fee}</div>
                            )
                        ))}
                    </div>
                )}
                <div style={{display:'flex'}}>
                    <div className={style.apply}onClick={handleApplyFilter}>적용</div>
                    <div className={style.reset}onClick={resetFilter}>초기화</div>
                </div>
                
            </div>
        </div>
    );
};

export default FeeModal;
