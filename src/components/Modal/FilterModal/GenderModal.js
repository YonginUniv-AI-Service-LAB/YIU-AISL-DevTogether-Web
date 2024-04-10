import React, { useState } from 'react';
import style from './Modal.module.css';

const GenderModal = ({ isOpen, closeModal, applyFilter }) => {
    const [selectedGenders, setSelectedGenders] = useState([]); // 선택된 성별을 관리하는 상태
    const [showGenderList, setShowGenderList] = useState(false); // 성별 목록을 보이게 할지 여부를 관리하는 상태
    const [showAddGenderdiv, setShowAddGenderdiv] = useState(true); // 성별 추가 버튼을 보이게 할지 여부를 관리하는 상태

    const Genders = ['남자', '여자']; // 성별 목록입니다.

    // 성별을 선택했을 때 실행되는 함수
    const handleGenderSelect = (gender) => {
        // 이미 선택된 성별인지 확인
        if (!selectedGenders.includes(gender)) {
            setSelectedGenders([...selectedGenders, gender]); // 선택된 성별에 새로운 성별 추가
            setShowGenderList(false); // 성별을 선택한 후에는 성별 목록을 숨깁니다.
            setShowAddGenderdiv(true); // 성별을 선택한 후에는 성별 추가 버튼을 다시 보이게 합니다.
        }
    };

    // 성별 목록을 토글하는 함수
    const toggleGenderList = () => {
        setShowGenderList(!showGenderList); // 성별 목록의 보이기/숨기기 상태를 토글합니다.
    };

    // 성별 추가 버튼을 눌렀을 때 실행되는 함수
    const handleAddGenderdivClick = () => {
        setShowAddGenderdiv(false); // 성별 추가 버튼을 누르면 해당 버튼을 숨깁니다.
        setShowGenderList(true); // 성별 추가 버튼을 누르면 성별 목록을 보이게 합니다.
    };

    // 필터 초기화 함수
    const resetFilter = () => {
        setSelectedGenders([]); // 선택된 성별 초기화
    };

    const handleApplyFilter = () => {
        applyFilter(selectedGenders);
        closeModal(); // 필터 적용 후 모달 닫기
    };

    return (
        <div className={style.background} style={{ display: isOpen ? 'block' : 'none' }}>
            <div>
                <div className={style.head}>
                    <div className={style.title}>성별 필터</div>
                    {/* 닫는 버튼 */}
                    <div onClick={closeModal} className={style.close}>x</div>
                </div>
                
                {/* 선택된 성별을 표시하는 버튼 */}
                {selectedGenders.map((gender, index) => (
                    <div className={style.text} key={index}>{gender}</div>
                ))}
                {/* 성별 선택 버튼 */}
                {!showGenderList && selectedGenders.length === 0 && (
                    <div className={style.text} onClick={toggleGenderList}>성별을 선택하세요</div>
                )}
                {/* 성별 추가 버튼 */}
                {showAddGenderdiv && selectedGenders.length < Genders.length && (
                    <div className={style.text} onClick={handleAddGenderdivClick}>+</div>
                )}
                {/* 성별 목록 */}
                {showGenderList && (
                    <div style={{ maxHeight: '150px', overflowY: 'auto' }}>
                        {/* 성별 목록을 표시하고 클릭할 때마다 해당 성별을 선택하는 버튼을 생성합니다. */}
                        {Genders.map((gender, index) => (
                            // 이미 선택된 성별은 선택 목록에 없으므로 선택 목록에 있는 성별만 보여줍니다.
                            selectedGenders.includes(gender) ? null : (
                                <div className={style.select} key={index} onClick={() => handleGenderSelect(gender)}>{gender}</div>
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

export default GenderModal;
