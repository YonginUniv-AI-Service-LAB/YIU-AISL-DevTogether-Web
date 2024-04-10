import React, { useState } from 'react';
import style from './Modal.module.css';

const MethodModal = ({ isOpen, closeModal, applyFilter }) => {
    const [selectedMethods, setSelectedMethods] = useState([]); // 선택된 방식을 관리하는 상태
    const [showMethodList, setShowMethodList] = useState(false); // 방식 목록을 보이게 할지 여부를 관리하는 상태
    const [showAddMethoddiv, setShowAddMethoddiv] = useState(true); // 방식 추가 버튼을 보이게 할지 여부를 관리하는 상태

    const Methods = ['대면','비대면']; // 방식 목록입니다.

    // 방식을 선택했을 때 실행되는 함수
    const handleMethodSelect = (Method) => {
        // 이미 선택된 방식인지 확인
        if (!selectedMethods.includes(Method)) {
            setSelectedMethods([...selectedMethods, Method]); // 선택된 방식에 새로운 방식 추가
            setShowMethodList(false); // 방식을 선택한 후에는 방식 목록을 숨깁니다.
            setShowAddMethoddiv(true); // 방식을 선택한 후에는 방식 추가 버튼을 다시 보이게 합니다.
        }
    };

    // 방식 목록을 토글하는 함수
    const toggleMethodList = () => {
        setShowMethodList(!showMethodList); // 방식 목록의 보이기/숨기기 상태를 토글합니다.
    };

    // 방식 추가 버튼을 눌렀을 때 실행되는 함수
    const handleAddMethoddivClick = () => {
        setShowAddMethoddiv(false); // 방식 추가 버튼을 누르면 해당 버튼을 숨깁니다.
        setShowMethodList(true); // 방식 추가 버튼을 누르면 방식 목록을 보이게 합니다.
    };

    // 필터 초기화 함수
    const resetFilter = () => {
        setSelectedMethods([]); // 선택된 방식 초기화
    };

    const handleApplyFilter = () => {
        applyFilter(selectedMethods);
        closeModal(); // 필터 적용 후 모달 닫기
    };

    return (
        <div className={style.background} style={{ display: isOpen ? 'block' : 'none' }}>
            <div>
                <div className={style.head}>
                    <div className={style.title}>방식 필터</div>
                    {/* 닫는 버튼 */}
                    <div onClick={closeModal} className={style.close}>x</div>
                </div>
                
                {/* 선택된 방식을 표시하는 버튼 */}
                {selectedMethods.map((Method, index) => (
                    <div className={style.text} key={index}>{Method}</div>
                ))}
                {/* 방식 선택 버튼 */}
                {!showMethodList && selectedMethods.length === 0 && (
                    <div className={style.text} onClick={toggleMethodList}>방식을 선택하세요</div>
                )}
                {/* 방식 추가 버튼 */}
                {showAddMethoddiv && selectedMethods.length < Methods.length && (
                    <div className={style.text} onClick={handleAddMethoddivClick}>+</div>
                )}
                {/* 방식 목록 */}
                {showMethodList && (
                    <div style={{ maxHeight: '150px', overflowY: 'auto' }}>
                        {/* 방식 목록을 표시하고 클릭할 때마다 해당 방식을 선택하는 버튼을 생성합니다. */}
                        {Methods.map((Method, index) => (
                            // 이미 선택된 방식은 선택 목록에 없으므로 선택 목록에 있는 방식만 보여줍니다.
                            selectedMethods.includes(Method) ? null : (
                                <div className={style.select} key={index} onClick={() => handleMethodSelect(Method)}>{Method}</div>
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

export default MethodModal;
