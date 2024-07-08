import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import style from './Matching.module.css';
import Body from '../../components/Group/Body/Body';
import FilterButton from '../../components/Button/FilterButton';
import Profile from '../../components/Group/Profile/Profile';
import Sidebar from '../../components/Group/Sidebar/Sidebar';
import Searchbar from '../../components/Group/Searchbar/Searchbar';
import FilterTag from '../../components/Group/Filtertag/Filtertag';
import EntireModal from '../../components/Modal/FilterModal/EntireModal';
import NavigateSelect from '../../components/Select/NavigateSelect';
import MobFilterTag from '../../components/Group/Filtertag/MobFiltertag';
import { useRecoilState } from 'recoil';
import { selectedgenderStateAtom, selectedsubjectStateAtom, selectedlocationStateAtom, selectedminageStateAtom, selectedmaxageStateAtom, 
    selectedminfeeStateAtom, selectedmaxfeeStateAtom, selectedmethodStateAtom } from '../../recoil/atoms/matchingAtom';
import PageHeader from '../../components/Group/PageHeader/PageHeader';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import LoadingSpin from '../../components/Spin/LoadingSpin';
import GetDataErrorView from '../../components/Result/GetDataError';
import AltImage from "../../assets/images/devtogether_logo.png";

const fetchMenteeData = async () => {
    const accessToken = sessionStorage.getItem('accessToken');
    const response = await axios.get('/mentee', {
        headers: {
            Authorization: `Bearer ${accessToken}`
        }
    });

    console.log('API Response Data:', response.data);

    return response.data.map(profile => ({
        id: profile.userProfileId,
        name: profile.introduction,
        nickname: profile.nickname,
        subject1: profile.subject1,
        subject2: profile.subject2,
        subject3: profile.subject3,
        subject4: profile.subject4,
        subject5: profile.subject5,
        gender: profile.gender === '남' ? "남자" : "여자",
        age: profile.age,
        role: profile.role,
        location1: profile.location1,
        location2: profile.location2,
        location3: profile.location3,
        fee: profile.fee,
        method: profile.method === '비대면' ? "비대면" : profile.method === '대면' ? "대면" : "블렌딩",
        img: profile.img,
        introduction: profile.introduction,
        portfolio: profile.portfolio,
        contents: profile.contents,
        schedule: profile.schedule,
        pr: profile.pr
    }));
};

const MatchingMenteeList = ({ handleSidebarButtonClick }) => {
    const isDesktopOrLaptop = useMediaQuery({ minWidth: 992 });
    const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 991 });
    const isMobile = useMediaQuery({ maxWidth: 767 });
    const isNotMobile = useMediaQuery({ minWidth: 768 });

    const navigate = useNavigate();

    const [totalPages, setTotalPages] = useState(1);
    const [currentPage, setCurrentPage] = useState(1);
    const [filteredProfiles, setFilteredProfiles] = useState([]);
    const [searchText, setSearchText] = useState("");

    const [selectedSubjects, setSelectedSubjects] = useRecoilState(selectedsubjectStateAtom);
    const [selectedLocations, setSelectedLocations] = useRecoilState(selectedlocationStateAtom);
    const [selectedGenders, setSelectedGenders] = useRecoilState(selectedgenderStateAtom);
    const [selectedMinAges, setSelectedMinAges] = useRecoilState(selectedminageStateAtom);
    const [selectedMaxAges, setSelectedMaxAges] = useRecoilState(selectedmaxageStateAtom);
    const [selectedMethods, setSelectedMethods] = useRecoilState(selectedmethodStateAtom);
    const [selectedMinFees, setSelectedMinFees] = useRecoilState(selectedminfeeStateAtom);
    const [selectedMaxFees, setSelectedMaxFees] = useRecoilState(selectedmaxfeeStateAtom);
    const [isSearchApplied, setIsSearchApplied] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isFilterApplied, setIsFilterApplied] = useState(false);
    const [isFilterTagExpanded, setIsFilterTagExpanded] = useState(false);
    const [noProfilesFound, setNoProfilesFound] = useState(false);

    const { data: profiles, isLoading, error } = useQuery({
        queryKey: ['mentee'],
        queryFn: fetchMenteeData
    });

    const toggleFilterTag = () => {
        setIsFilterApplied(!isFilterApplied);
    };

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const closeModal = () => {
        applyFilters();
        setIsModalOpen(false);
    };

    const applyFilters = useCallback(() => {
        if (!profiles) return;

        const filteredProfiles = profiles.filter(profile => {
            const subjectFilter = selectedSubjects.length === 0 || selectedSubjects.every(subject => 
                [profile.subject1, profile.subject2, profile.subject3, profile.subject4, profile.subject5].includes(subject)
            );
            const locationFilter = selectedLocations.length === 0 || selectedLocations.includes(profile.location1) || selectedLocations.includes(profile.location2) || selectedLocations.includes(profile.location3);
            const genderFilter = selectedGenders.length === 0 || selectedGenders.includes(profile.gender);
            const ageFilter = 
            (selectedMinAges === undefined || selectedMinAges === "" || parseInt(profile.age) >= parseInt(selectedMinAges)) && 
            (selectedMaxAges === undefined || selectedMaxAges === "" || parseInt(profile.age) <= parseInt(selectedMaxAges));
            const methodFilter = selectedMethods.length === 0 || selectedMethods.includes(profile.method);
            const feeFilter = 
            (selectedMinFees === undefined || selectedMinFees === "" || parseInt(profile.fee) >= parseInt(selectedMinFees.replace(/,/g, ''))) && 
            (selectedMaxFees === undefined || selectedMaxFees === "" || parseInt(profile.fee) <= parseInt(selectedMaxFees.replace(/,/g, '')));
            const searchFilter = !isSearchApplied || profile.nickname.includes(searchText);
            
            return subjectFilter && locationFilter && genderFilter && ageFilter && methodFilter && feeFilter && searchFilter;
        });

        setFilteredProfiles(filteredProfiles);
        setIsFilterApplied(true);
        setNoProfilesFound(filteredProfiles.length === 0);
    }, [profiles, selectedSubjects, selectedLocations, selectedGenders, selectedMinAges, selectedMaxAges, selectedMethods, selectedMinFees, selectedMaxFees, isSearchApplied, searchText]);

    const handleSearch = (searchValue) => {
        setSearchText(searchValue);
        setIsSearchApplied(true);
    };

    const handleCategoryClick = (category) => {
        switch (category) {
            case "학생 찾기":
                navigate('/matching/menteelist');
                break;
            case "선생님 찾기":
                navigate('/matching/mentorlist');
                break;
            default:
                break;
        }
    };

    const profilesPerPage = 8;
    const indexOfLastProfile = currentPage * profilesPerPage;
    const indexOfFirstProfile = indexOfLastProfile - profilesPerPage;
    const currentProfiles = filteredProfiles.slice(indexOfFirstProfile, indexOfFirstProfile + profilesPerPage);

    const paginate = pageNumber => setCurrentPage(pageNumber);

    useEffect(() => {
        if (profiles) {
            setTotalPages(Math.ceil(filteredProfiles.length / profilesPerPage));
        }
    }, [filteredProfiles, profilesPerPage]);

    useEffect(() => {
        if (profiles) {
            applyFilters();
        }
    }, [applyFilters, profiles]);

    if (isLoading) {
        return <LoadingSpin />;
    }

    if (error) {
        return <GetDataErrorView />;
    }

    return (
        <div>
            {!isMobile && <div className={style.background2}>
                <div style={{paddingBottom:'200px'}}></div>
                <Body
                    sentence1="보다 쉬운 코딩 과외 매칭을 위해"
                    sentence2="DevTogether에서 더 나은 매칭 선택"
                    title="학생 찾기"
                    imageSrc='/matching2.png'
                />
            </div>}
            {isMobile && <div className={style.background2}>
                <div style={{paddingBottom:'100px'}}></div>
                <Body
                    sentence1="보다 쉬운 코딩 과외 매칭을 위해"
                    sentence2="DevTogether에서 더 나은 매칭 선택"
                    title="학생 찾기"
                />
            </div>}
            <div style={{
                marginLeft: isMobile ? '5%' : isTablet ? 30 : '15%',
                marginRight: isMobile ? '5%' : isTablet ? 30 : '15%',
            }}>
                <div className={style.line}></div>
                <div className={style.color}>
                    <div className={style.background}>
                        {!isMobile && 
                        <div>
                            <div className={style.fix_left}>
                                <Sidebar titles={["학생 찾기", "선생님 찾기"]} onCategoryClick={handleCategoryClick} />
                                <div className={style.situation}>
                                    <FilterTag selectedSubjects={selectedSubjects} selectedLocations={selectedLocations} selectedGenders={selectedGenders} 
                                    selectedMinAges={selectedMinAges} selectedMaxAges={selectedMaxAges} selectedMethods={selectedMethods} selectedMinFees={selectedMinFees} selectedMaxFees={selectedMaxFees}/>
                                </div>
                            </div>
                        </div>
                        }
                        <div style={{ flex: '1', marginTop: '40px', marginLeft: isMobile ? '0px' : '40px' }}>
                            {!isMobile && 
                            <div>
                                <div className={style.background_head}>
                                    <div className={style.head} style={{fontSize: isDesktopOrLaptop ? '25px' : '25px' }}>학생 목록</div>
                                    <Searchbar defaultSearchText="닉네임으로 검색" onSearch={handleSearch} />
                                </div>
                                <div className={style.body} style={{ marginTop: '20px', justifyContent: 'flex-end' }}>
                                    <FilterButton name="필터 적용" onClick={showModal} />
                                </div>
                            </div>
                            }
                            {isMobile &&
                            <div>
                                <div className={style.background_head}>
                                    <div className={style.head} style={{fontSize: isDesktopOrLaptop ? '25px' : '20px', marginBottom: '10px' }}>학생 목록</div>
                                    <Searchbar defaultSearchText="닉네임으로 검색" onSearch={handleSearch} />
                                </div>
                                <div className={style.body} style={{ marginTop: '30px', marginBottom:'20px', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <NavigateSelect
                                        placeholder="목록"
                                        options={[
                                            { value: '학생 찾기', label: '학생' },
                                            { value: '선생님 찾기', label: '선생님' },
                                        ]}
                                        onChange={(newValue) => handleCategoryClick(newValue)}
                                    />
                                    <div style={{display:'flex'}}>
                                        <FilterButton name="필터 적용" onClick={showModal} />
                                        { !isFilterApplied && (
                                            <FilterButton name="필터 보이기" onClick={toggleFilterTag} />
                                        )} 
                                        { isFilterApplied && (
                                            <FilterButton name="필터 숨기기" onClick={toggleFilterTag} />
                                        )} 
                                    </div>
                                </div>
                                { isFilterApplied && (
                                        <div className={style.tagbg}>
                                            <MobFilterTag selectedSubjects={selectedSubjects} selectedLocations={selectedLocations} selectedGenders={selectedGenders} 
                                            selectedMinAges={selectedMinAges} selectedMaxAges={selectedMaxAges} selectedMethods={selectedMethods} selectedMinFees={selectedMinFees} selectedMaxFees={selectedMaxFees} />
                                        </div>
                                    )}
                            </div>
                            }
                            <div className={style.outer}>
                                <div className={style.inner}>
                                    {noProfilesFound ? ( 
                                        <div className={style.noProfilesMessage}>
                                            해당하는 프로필이 존재하지 않습니다.
                                        </div>
                                    ) : (
                                        currentProfiles.map(profile => (
                                            <Profile
                                            key={profile.id}
                                            id={profile.id}
                                            name={profile.name}
                                            nickname={profile.nickname}
                                            subject1={profile.subject1}
                                            subject2={profile.subject2}
                                            subject3={profile.subject3}
                                            subject4={profile.subject4}
                                            subject5={profile.subject5}
                                            gender={profile.gender}
                                            age={profile.age}
                                            role={profile.role}
                                            location1={profile.location1}
                                            location2={profile.location2}
                                            location3={profile.location3}
                                            fee={profile.fee}
                                            method={profile.method}
                                            imagetext="프로필 이미지"
                                            imagepath={profile.img || AltImage} // profile.img가 없으면 기본 이미지를 사용
                                            introduction={profile.introduction}
                                            portfolio={profile.portfolio}
                                            contents={profile.contents}
                                            schedule={profile.schedule}
                                            pr={profile.pr}
                                        />

                                        ))
                                    )}
                                </div>
                            </div>
                            <div className={style.pagination}>
                                {[...Array(totalPages).keys()].map(number => (
                                    <div className={`${style.page} ${currentPage === number + 1 ? style.active : ''}`} key={number + 1} onClick={() => paginate(number + 1)}>
                                        {number + 1}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                    <EntireModal isOpen={isModalOpen} handleCancel={handleCancel} closeModal={closeModal} applyFilter={applyFilters}/>
                </div>
            </div>
        </div>
    );
};

export default MatchingMenteeList;
