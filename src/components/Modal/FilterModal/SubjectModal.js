import React, { useState } from 'react';
import style from './Modal.module.css';
import { Select } from 'antd';

const { Option } = Select;

const SubjectModal = ({ isOpen, closeModal, applyFilter }) => {
    const [selectedSubjects, setSelectedSubjects] = useState([]); // 선택된 과목을 관리하는 상태
    const [additionalDropdowns, setAdditionalDropdowns] = useState(0); // 추가 드롭다운 박스의 수를 관리하는 상태

    // 과목을 선택했을 때 실행되는 함수
    const handleSubjectSelect = (subject, dropdownIndex) => {
        const updatedSubjects = [...selectedSubjects]; // 현재 선택된 과목 복사
        updatedSubjects[dropdownIndex] = subject; // 새로운 과목으로 업데이트
        setSelectedSubjects(updatedSubjects); // 선택된 과목 업데이트
    };

    // 드롭다운 제거 함수
    const removeDropdown = (index) => {
        const updatedSubjects = [...selectedSubjects]; // 현재 선택된 과목 복사
        updatedSubjects.splice(index, 1); // 해당 인덱스의 드롭다운 제거
        setSelectedSubjects(updatedSubjects); // 선택된 과목 업데이트
        setAdditionalDropdowns(Math.max(0, additionalDropdowns - 1)); // 추가 드롭다운 박스 수 감소 (최소값 0으로 설정)
    };

    const handleApplyFilter = () => {
        applyFilter(selectedSubjects.filter(subject => subject)); // 선택된 과목 필터링 후 적용
        closeModal(); // 필터 적용 후 모달 닫기
    };

    const handleAddDropdown = () => {
        setAdditionalDropdowns(additionalDropdowns + 1); // 추가 버튼을 클릭할 때마다 추가 드롭다운 박스의 수를 증가
    };

    const resetFilter = () => {
        setSelectedSubjects([]); // 선택된 과목 초기화
        setAdditionalDropdowns(0); // 추가 드롭다운 박스 수 초기화
        applyFilter([]); // 필터 초기화 후 적용 함수 호출
    };

    return (
        <div className={style.background} style={{ display: isOpen ? 'block' : 'none' }}>
            <div className={style.flex}>
                <div className={style.text_title}>과목 필터</div>
                <div onClick={closeModal} className={style.close}>x</div>
            </div>
            {/* 추가 버튼 */}
            <div className={style.add} onClick={handleAddDropdown}>필터 추가</div>
            <div className={style.flex}>
                <Select
                    mode="single" // 한 번에 하나의 항목만 선택 가능한 드롭다운 박스
                    className={style.select}
                    style={{ width: '100%'}}
                    placeholder="과목 선택"
                    onChange={(value) => handleSubjectSelect(value, 0)} // 첫 번째 드롭다운 선택
                    value={selectedSubjects[0]}
                >
                    {['C', 'C++', 'Python', 'Java', 'JavaScript', 'Flutter', 'React', 'Spring'].map(subject => (
                        <Option key={subject} value={subject}>{subject}</Option>
                    ))}
                </Select>
                {additionalDropdowns > 0 && (
                    <div className={style.remove} onClick={() => removeDropdown(0)}>X</div>
                )}
            </div>
            {/* 추가 드롭다운 박스들 */}
            {Array.from({ length: additionalDropdowns }).map((_, index) => (
                <div className={style.flex} key={index} style={{ marginTop: '10px' }}>
                    <Select
                        mode="single"
                        style={{ width: '100%' }}
                        placeholder={`과목 선택 ${index + 2}`}
                        onChange={(value) => handleSubjectSelect(value, index + 1)} // 추가 드롭다운 선택
                        value={selectedSubjects[index + 1]}
                    >
                        {['C', 'C++', 'Python', 'Java', 'JavaScript', 'Flutter', 'React', 'Spring'].map(subject => (
                            <Option key={subject} value={subject}>{subject}</Option>
                        ))}
                    </Select>
                    <div className={style.remove} onClick={() => removeDropdown(index + 1)}>X</div>
                </div>
            ))}
            <div className={style.foot}>
                <div className={style.apply} onClick={handleApplyFilter}>적용</div>
                <div className={style.reset} onClick={resetFilter}>초기화</div>
            </div>
        </div>
    );
};

export default SubjectModal