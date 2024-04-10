import React, { useState, useEffect } from 'react';
import style from './Matching.module.css';
import FilterButton from '../../components/Button/FilterButton';
import Profile from '../../components/Group/Profile/Profile';
import Sidebar from '../../components/Group/Sidebar/Sidebar';
import Searchbar from '../../components/Group/Searchbar/Searchbar';
import SubjectModal from '../../components/Modal/FilterModal/SubjectModal';
import LocationModal from '../../components/Modal/FilterModal/LocationModal';
import GenderModal from '../../components/Modal/FilterModal/GenderModal';
import AgeModal from '../../components/Modal/FilterModal/AgeModal';
import MethodModal from '../../components/Modal/FilterModal/MethodModal';
import FeeModal from '../../components/Modal/FilterModal/FeeModal';

// 임시 데이터
import { data_mentee } from '../../assets/data/mentee';

const MatchingMenteeList = ({ handleSidebarButtonClick }) => {
    const [profiles, setProfiles] = useState([]);
    const [searchText, setSearchText] = useState("");
    const [isSubjectModalOpen, setIsSubjectModalOpen] = useState(false);
    const [isLocationModalOpen, setIsLocationModalOpen] = useState(false);
    const [isGenderModalOpen, setIsGenderModalOpen] = useState(false);
    const [isAgeModalOpen, setIsAgeModalOpen] = useState(false);
    const [isMethodModalOpen, setIsMethodModalOpen] = useState(false);
    const [isFeeModalOpen, setIsFeeModalOpen] = useState(false);

    const [selectedSubjects, setSelectedSubjects] = useState([]);
    const [selectedLocations, setSelectedLocations] = useState([]);
    const [selectedGenders, setSelectedGenders] = useState([]);
    const [selectedAges, setSelectedAges] = useState([]);
    const [selectedMethods, setSelectedMethods] = useState([]);
    const [selectedFees, setSelectedFees] = useState([]);
    const [isSearchApplied, setIsSearchApplied] = useState(false); // 검색이 적용되었는지 여부를 나타내는 상태 변수 추가
    const [isEnterPressed, setIsEnterPressed] = useState(false); // 엔터 키 입력 상태를 나타내는 상태 변수 추가

    useEffect(() => {
        const applyFilters = () => {
            const filteredProfiles = data_mentee.filter(profile => {
                const subjectFilter = selectedSubjects.length === 0 || selectedSubjects.every(subject => profile.subject.includes(subject));
                const locationFilter = selectedLocations.length === 0 || 
                    (Array.isArray(profile.location1) ? 
                        profile.location1.some(location => selectedLocations.includes(location)) : 
                        selectedLocations.includes(profile.location1));
                const genderFilter = selectedGenders.length === 0 || selectedGenders.includes(profile.gender === 0 ? "남자" : "여자");
                const ageFilter = selectedAges.length === 0 || selectedAges.includes(parseInt(profile.age));
                const methodFilter = selectedMethods.length === 0 || selectedMethods.every(method => profile.method.includes(method));
                const feeFilter = selectedFees.length === 0 || selectedFees.every(fee => profile.fee.includes(fee));
                const searchFilter = isEnterPressed || profile.name.includes(searchText); // 검색이 적용되었거나 검색어가 포함된 경우에만 검색 필터 적용
        
                return subjectFilter && locationFilter && genderFilter && ageFilter && methodFilter && feeFilter && searchFilter;
            });
        
            setProfiles(filteredProfiles);
        };

        applyFilters();
    }, [selectedSubjects, selectedLocations, selectedGenders, selectedAges, selectedMethods, selectedFees, searchText, isEnterPressed]); // isEnterPressed도 의존성으로 추가

    const applySelectedSubjectFilter = (selectedSubjects) => {
        setSelectedSubjects(selectedSubjects);
    };

    const applySelectedLocationFilter = (selectedLocations) => {
        setSelectedLocations(selectedLocations);
    };

    const applySelectedGenderFilter = (selectedGenders) => {
        setSelectedGenders(selectedGenders);
    };

    const applySelectedAgeFilter = (selectedAges) => {
        setSelectedAges(selectedAges);
    };

    const applySelectedMethodFilter = (selectedMethods) => {
        setSelectedMethods(selectedMethods);
    };

    const applySelectedFeeFilter = (selectedFees) => {
        setSelectedFees(selectedFees);
    };

    const openSubjectModal = () => {
        setIsSubjectModalOpen(true);
    };

    const openLocationModal = () => {
        setIsLocationModalOpen(true);
    };

    const openGenderModal = () => {
        setIsGenderModalOpen(true);
    };

    const openAgeModal = () => {
        setIsAgeModalOpen(true);
    };

    const openMethodModal = () => {
        setIsMethodModalOpen(true);
    };

    const openFeeModal = () => {
        setIsFeeModalOpen(true);
    };

    const closeModal = () => {
        setIsSubjectModalOpen(false);
        setIsLocationModalOpen(false);
        setIsGenderModalOpen(false);
        setIsAgeModalOpen(false);
        setIsMethodModalOpen(false);
        setIsFeeModalOpen(false);
    };

    // 검색어 입력 시 호출되는 함수
    const handleSearch = (searchValue) => {
        setSearchText(searchValue);
        setIsEnterPressed(false); // 엔터 키 입력 상태 초기화
    };

    // 엔터 키 이벤트 처리 함수
    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            setIsEnterPressed(true); // 엔터 키 입력 상태 변경
        }
    };

    // 다른 영역을 클릭하면 검색이 풀리도록 설정
    const handleOutsideClick = () => {
        if (!isEnterPressed) {
            setIsSearchApplied(false);
        }
    };

    return (
        <div className={style.color} onClick={handleOutsideClick}>
            <div className={style.line}></div>
            <div className={style.background}>
                <Sidebar onClick={handleSidebarButtonClick} title1="학생 찾기" title2="선생님 찾기"/>
                <div style={{flex: '1', marginTop:'40px', marginLeft:'150px', marginRight:'350px'}}>
                    <div className={style.background}>
                        <div className={style.head}>학생 목록</div>
                        <Searchbar onSearch={handleSearch} onKeyPress={handleKeyPress} />
                    </div>
                    <div className={style.background} style={{marginTop:'80px', justifyContent:'space-between'}}>
                        <FilterButton name="과목" onClick={openSubjectModal} />
                        <FilterButton name="지역" onClick={openLocationModal} />
                        <FilterButton name="성별" onClick={openGenderModal} />
                        <FilterButton name="나이" onClick={openAgeModal} />
                        <FilterButton name="과외방식" onClick={openMethodModal} />
                        <FilterButton name="수업료" onClick={openFeeModal} />
                    </div>
                    <div className={style.background} style={{ display: 'flex', flexWrap: 'wrap' }}>
                        {profiles.map(profile => (
                            <Profile
                                key={profile.id}
                                name={profile.name}
                                subject={profile.subject.join(", ")}
                                gender={profile.gender === 0 ? "남자" : "여자"}
                                age={profile.age}
                                location={profile.location1}
                                imagepath={profile.img}
                                imagetext="프로필 이미지"
                            />
                        ))}
                    </div>
                </div>
            </div>
            <SubjectModal isOpen={isSubjectModalOpen} closeModal={closeModal} applyFilter={applySelectedSubjectFilter} />
            <LocationModal isOpen={isLocationModalOpen} closeModal={closeModal} applyFilter={applySelectedLocationFilter} />
            <GenderModal isOpen={isGenderModalOpen} closeModal={closeModal} applyFilter={applySelectedGenderFilter} />
            <AgeModal isOpen={isAgeModalOpen} closeModal={closeModal} applyFilter={applySelectedAgeFilter} />
            <MethodModal isOpen={isMethodModalOpen} closeModal={closeModal} applyFilter={applySelectedMethodFilter} />
            <FeeModal isOpen={isFeeModalOpen} closeModal={closeModal} applyFilter={applySelectedFeeFilter} />
        </div>
    );
};

export default MatchingMenteeList;
