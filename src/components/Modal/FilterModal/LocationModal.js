import React, { useState } from 'react';
import style from './Modal.module.css';

const LocationModal = ({ isOpen, closeModal, applyFilter }) => {
    const [selectedLocations, setSelectedLocations] = useState([]); // 선택된 지역을 관리하는 상태
    const [showLocationList, setShowLocationList] = useState(false); // 지역 목록을 보이게 할지 여부를 관리하는 상태
    const [showAddLocationdiv, setShowAddLocationdiv] = useState(true); // 지역 추가 버튼을 보이게 할지 여부를 관리하는 상태

    const locations = ['충남 천안시 서북구', '충남 천안시 동남구', '인천 부평구', '인천 서구', '경기 용인시 처인구', '경기 수원시 권선구', '경기 수원시 영통구', '대전 유성구', '강원 고성군', '부산 해운대구', '제주 서귀포시']; // 지역 목록입니다.

    // 지역을 선택했을 때 실행되는 함수
    const handleLocationSelect = (location) => {
        // 이미 선택된 지역인지 확인
        if (!selectedLocations.includes(location)) {
            setSelectedLocations([...selectedLocations, location]); // 선택된 지역에 새로운 지역 추가
            setShowLocationList(false); // 지역을 선택한 후에는 지역 목록을 숨깁니다.
            setShowAddLocationdiv(true); // 지역을 선택한 후에는 지역 추가 버튼을 다시 보이게 합니다.
        }
    };

    // 지역 목록을 토글하는 함수
    const toggleLocationList = () => {
        setShowLocationList(!showLocationList); // 지역 목록의 보이기/숨기기 상태를 토글합니다.
    };

    // 지역 추가 버튼을 눌렀을 때 실행되는 함수
    const handleAddLocationdivClick = () => {
        setShowAddLocationdiv(false); // 지역 추가 버튼을 누르면 해당 버튼을 숨깁니다.
        setShowLocationList(true); // 지역 추가 버튼을 누르면 지역 목록을 보이게 합니다.
    };

    // 필터 초기화 함수
    const resetFilter = () => {
        setSelectedLocations([]); // 선택된 지역 초기화
    };

    const handleApplyFilter = () => {
        applyFilter(selectedLocations);
        closeModal(); // 필터 적용 후 모달 닫기
    };

    return (
        <div className={style.background} style={{ display: isOpen ? 'block' : 'none' }}>
            <div>
                <div className={style.head}>
                    <div className={style.title}>지역 필터</div>
                    {/* 닫는 버튼 */}
                    <div onClick={closeModal} className={style.close}>x</div>
                </div>
                
                {/* 선택된 지역을 표시하는 버튼 */}
                {selectedLocations.map((location, index) => (
                    <div className={style.text} key={index}>{location}</div>
                ))}
                {/* 지역 선택 버튼 */}
                {!showLocationList && selectedLocations.length === 0 && (
                    <div className={style.text} onClick={toggleLocationList}>지역을 선택하세요</div>
                )}
                {/* 지역 추가 버튼 */}
                {showAddLocationdiv && selectedLocations.length < locations.length && (
                    <div className={style.text} onClick={handleAddLocationdivClick}>+</div>
                )}
                {/* 지역 목록 */}
                {showLocationList && (
                    <div style={{ maxHeight: '150px', overflowY: 'auto' }}>
                        {/* 지역 목록을 표시하고 클릭할 때마다 해당 지역을 선택하는 버튼을 생성합니다. */}
                        {locations.map((location, index) => (
                            // 이미 선택된 지역은 선택 목록에 없으므로 선택 목록에 있는 지역만 보여줍니다.
                            selectedLocations.includes(location) ? null : (
                                <div className={style.select} key={index} onClick={() => handleLocationSelect(location)}>{location}</div>
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

export default LocationModal;
