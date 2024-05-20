import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import style from './Matching.module.css';
import Body from '../../components/Group/Body/Body';
import FilterButton from '../../components/Button/FilterButton';
import Profile from '../../components/Group/Profile/Profile';
import Sidebar from '../../components/Group/Sidebar/Sidebar';
import Searchbar from '../../components/Group/Searchbar/Searchbar';
import FilterTag from '../../components/Group/Filtertag/Filtertag';
import SubjectModal from '../../components/Modal/FilterModal/SubjectModal';
import LocationModal from '../../components/Modal/FilterModal/LocationModal';
import GenderModal from '../../components/Modal/FilterModal/GenderModal';
import AgeModal from '../../components/Modal/FilterModal/AgeModal';
import MethodModal from '../../components/Modal/FilterModal/MethodModal';
import FeeModal from '../../components/Modal/FilterModal/FeeModal';

import { data_mentee } from '../../assets/data/mentee';
import NavigateButton from '../../components/Button/NavigateButton';

const MatchingMenteeList = ({ handleSidebarButtonClick }) => {
    const navigate = useNavigate();

    const [totalPages, setTotalPages] = useState(1);
    const [currentPage, setCurrentPage] = useState(1);
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
    const [isSearchApplied, setIsSearchApplied] = useState(false);

    useEffect(() => {
        const applyFilters = () => {
            const filteredProfiles = data_mentee.filter(profile => {
                const subjectFilter = selectedSubjects.length === 0 || selectedSubjects.every(subject => profile.subject.includes(subject));
                const locationFilter = selectedLocations.length === 0 || 
                    (Array.isArray(profile.location1) ? 
                        profile.location1.some(location => selectedLocations.includes(location)) : 
                        selectedLocations.includes(profile.location1));
                const genderFilter = selectedGenders.length === 0 || selectedGenders.includes(profile.gender === 0 ? "남자" : "여자");
                const ageFilter = selectedAges.min === undefined || selectedAges.max === undefined || (parseInt(profile.age) >= selectedAges.min && parseInt(profile.age) <= selectedAges.max);
                const methodFilter = selectedMethods.length === 0 || selectedMethods.every(method => profile.method.includes(method));
                const feeFilter = selectedFees.length === 0 || selectedFees.every(fee => profile.fee.includes(fee));
                const searchFilter = isSearchApplied || profile.name.includes(searchText); // 검색이 적용되었거나 검색어가 포함된 경우에만 검색 필터 적용
        
                return subjectFilter && locationFilter && genderFilter && ageFilter && methodFilter && feeFilter && searchFilter;
            });
        
            setProfiles(filteredProfiles);
        };

        applyFilters();
    }, [selectedSubjects, selectedLocations, selectedGenders, selectedAges, selectedMethods, selectedFees, searchText, isSearchApplied]);

    const applySelectedSubjectFilter = (selectedSubjects) => {
        setSelectedSubjects(selectedSubjects);
    };

    const applySelectedLocationFilter = (selectedLocations) => {
        setSelectedLocations(selectedLocations);
    };

    const applySelectedGenderFilter = (selectedGenders) => {
        setSelectedGenders(selectedGenders);
    };

    const applySelectedAgeFilter = (minAge, maxAge) => {
        setSelectedAges({ min: minAge, max: maxAge });
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

    const handleSearch = (searchValue) => {
        setSearchText(searchValue);
    };

    const handleCategoryClick = (category) => {
        // 클릭된 카테고리에 따라 페이지 이동을 처리합니다.
        switch (category) {
            case "학생 찾기":
            navigate('/matching/menteelist');
            break;
        case "선생님 찾기":
            navigate('/matching/mentorlist');
            break;
        default:
            // 다른 동작 처리
            break;
        }
    };

    const profilesPerPage = 30;
    const indexOfLastProfile = currentPage * profilesPerPage;
    const indexOfFirstProfile = indexOfLastProfile - profilesPerPage;
    const currentProfiles = profiles.slice(indexOfFirstProfile, indexOfLastProfile);

    const paginate = pageNumber => setCurrentPage(pageNumber);

    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
    }
    

    useEffect(() => {
        setTotalPages(Math.ceil(profiles.length / profilesPerPage));
    }, [profiles, profilesPerPage]);

    return (
        <div className={style.background2}>
            <div style={{paddingBottom:'200px'}}></div>
            <div>
                <Body
                    sentence1="보다 쉬운 코딩 과외 매칭을 위해"
                    sentence2="DevTogether에서 더 나은 매칭 선택"
                    title="학생 찾기/ 선생님 찾기"
                    imageSrc='/matching2.png' // 이미지 경로를 전달합니다.
                />
                 <div className={style.color}>
                    <div className={style.background}>
                        <div>
                            <div className={style.fix_left}>
                                <Sidebar titles={["학생 찾기", "선생님 찾기"]} onCategoryClick={handleCategoryClick} />
                                <div className={style.situation}><FilterTag selectedSubjects={selectedSubjects} selectedLocations={selectedLocations} selectedGenders={selectedGenders} selectedAges={selectedAges} selectedMethods={selectedMethods} selectedFees={selectedFees} /></div>
                            </div>
                        </div>
                        <div style={{flex: '1', marginTop:'40px', marginLeft:'40px', marginRight:'80px'}}>
                            <div className={style.fix_head}>
                                <div className={style.line}></div>
                                <div className={style.background_head}>
                                    <div className={style.head}>학생 목록</div>
                                    <Searchbar defaultSearchText="닉네임으로 검색" onSearch={handleSearch}/>
                                </div>
                                <div className={style.body} style={{marginTop:'50px', marginRight:'10px', justifyContent:'space-between'}}>
                                    <FilterButton name="과목" onClick={openSubjectModal} isFilterApplied={selectedSubjects.length > 0} />
                                    <FilterButton name="지역" onClick={openLocationModal} isFilterApplied={selectedLocations.length > 0} />
                                    <FilterButton name="성별" onClick={openGenderModal} isFilterApplied={selectedGenders.length > 0} />
                                    <FilterButton name="나이" onClick={openAgeModal} isFilterApplied={selectedAges.min !== undefined || selectedAges.max !== undefined} />
                                    <FilterButton name="과외방식" onClick={openMethodModal} isFilterApplied={selectedMethods.length > 0} />
                                    <FilterButton name="수업료" onClick={openFeeModal} isFilterApplied={selectedFees.length > 0} />
                                </div>
                            </div>
                            <div className={style.body} style={{ display: 'flex', flexWrap: 'wrap' }}>
                                {currentProfiles.map(profile => (
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
                            <div className={style.pagination}>
                                {pageNumbers.map(number => (
                                    <div className={`${style.page} ${currentPage === number? style.active : ''}`} key={number} onClick={() => paginate(number)}>
                                        {number}
                                    </div>
                                ))}
                            </div>
                        </div>
                        {/* <div className={style.situation}><FilterTag selectedSubjects={selectedSubjects} selectedLocations={selectedLocations} selectedGenders={selectedGenders} selectedAges={selectedAges} selectedMethods={selectedMethods} selectedFees={selectedFees} /></div> */}
                    </div>
                    <SubjectModal isOpen={isSubjectModalOpen} closeModal={closeModal} applyFilter={applySelectedSubjectFilter} />
                    <LocationModal isOpen={isLocationModalOpen} closeModal={closeModal} applyFilter={applySelectedLocationFilter} />
                    <GenderModal isOpen={isGenderModalOpen} closeModal={closeModal} applyFilter={applySelectedGenderFilter} />
                    <AgeModal isOpen={isAgeModalOpen} closeModal={closeModal} applyFilter={applySelectedAgeFilter} />
                    <MethodModal isOpen={isMethodModalOpen} closeModal={closeModal} applyFilter={applySelectedMethodFilter} />
                    <FeeModal isOpen={isFeeModalOpen} closeModal={closeModal} applyFilter={applySelectedFeeFilter} />
                </div>
            </div>
        </div>
    );
};

export default MatchingMenteeList;