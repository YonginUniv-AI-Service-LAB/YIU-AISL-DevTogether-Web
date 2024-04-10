import React, { useState } from 'react';
import style from './Modal.module.css';

const SubjectModal = ({ isOpen, closeModal, applyFilter }) => {
    const [selectedSubjects, setSelectedSubjects] = useState([]); // 선택된 과목을 관리하는 상태
    const [showSubjectList, setShowSubjectList] = useState(false); // 과목 목록을 보이게 할지 여부를 관리하는 상태
    const [showAddSubjectdiv, setShowAddSubjectdiv] = useState(true); // 과목 추가 버튼을 보이게 할지 여부를 관리하는 상태

    const subjects = ['C', 'C++', 'Python', 'Java', 'JavaScript', 'Flutter', 'React', 'Spring']; // 과목 목록입니다.

    // 과목을 선택했을 때 실행되는 함수
    const handleSubjectSelect = (subject) => {
        // 이미 선택된 과목인지 확인
        if (!selectedSubjects.includes(subject)) {
            setSelectedSubjects([...selectedSubjects, subject]); // 선택된 과목에 새로운 과목 추가
            setShowSubjectList(false); // 과목을 선택한 후에는 과목 목록을 숨깁니다.
            setShowAddSubjectdiv(true); // 과목을 선택한 후에는 과목 추가 버튼을 다시 보이게 합니다.
        }
    };

    // 과목 목록을 토글하는 함수
    const toggleSubjectList = () => {
        setShowSubjectList(!showSubjectList); // 과목 목록의 보이기/숨기기 상태를 토글합니다.
    };

    // 과목 추가 버튼을 눌렀을 때 실행되는 함수
    const handleAddSubjectdivClick = () => {
        setShowAddSubjectdiv(false); // 과목 추가 버튼을 누르면 해당 버튼을 숨깁니다.
        setShowSubjectList(true); // 과목 추가 버튼을 누르면 과목 목록을 보이게 합니다.
    };

    // 필터 초기화 함수
    const resetFilter = () => {
        setSelectedSubjects([]); // 선택된 과목 초기화
    };

    const handleApplyFilter = () => {
        applyFilter(selectedSubjects);
        closeModal(); // 필터 적용 후 모달 닫기
    };

    return (
        <div className={style.background} style={{ display: isOpen ? 'block' : 'none' }}>
            <div>
                <div className={style.head}>
                    <div className={style.title}>과목 필터</div>
                    {/* 닫는 버튼 */}
                    <div onClick={closeModal} className={style.close}>x</div>
                </div>
                
                {/* 선택된 과목을 표시하는 버튼 */}
                {selectedSubjects.map((subject, index) => (
                    <div className={style.text} key={index}>{subject}</div>
                ))}
                {/* 과목 선택 버튼 */}
                {!showSubjectList && selectedSubjects.length === 0 && (
                    <div className={style.text} onClick={toggleSubjectList}>과목을 선택하세요</div>
                )}
                {/* 과목 추가 버튼 */}
                {showAddSubjectdiv && selectedSubjects.length < subjects.length && (
                    <div className={style.text} onClick={handleAddSubjectdivClick}>+</div>
                )}
                {/* 과목 목록 */}
                {showSubjectList && (
                    <div style={{ maxHeight: '150px', overflowY: 'auto' }}>
                        {/* 과목 목록을 표시하고 클릭할 때마다 해당 과목을 선택하는 버튼을 생성합니다. */}
                        {subjects.map((subject, index) => (
                            // 이미 선택된 과목은 선택 목록에 없으므로 선택 목록에 있는 과목만 보여줍니다.
                            selectedSubjects.includes(subject) ? null : (
                                <div className={style.select} key={index} onClick={() => handleSubjectSelect(subject)}>{subject}</div>
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

export default SubjectModal;
