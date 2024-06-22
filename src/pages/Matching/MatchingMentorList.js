import React, { useState, useEffect } from 'react';
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
import { RecoilRoot, useRecoilState, useRecoilValue } from 'recoil';
import { selectedgenderStateAtom, selectedsubjectStateAtom, selectedlocationStateAtom, selectedminageStateAtom, selectedmaxageStateAtom, 
    selectedminfeeStateAtom, selectedmaxfeeStateAtom, selectedmethodStateAtom } from '../../recoil/atoms/matchingAtom';
import { data_mentor } from '../../assets/data/mentor';
import NavigateButton from '../../components/Button/NavigateButton';
import PageHeader from '../../components/Group/PageHeader/PageHeader';

const MatchingMentorList = ({ handleSidebarButtonClick }) => {
    const isDesktopOrLaptop = useMediaQuery({ minWidth: 992 });
    const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 991 });
    const isMobile = useMediaQuery({ maxWidth: 767 });
    const isNotMobile = useMediaQuery({ minWidth: 768 });

    const navigate = useNavigate();

    const [totalPages, setTotalPages] = useState(1);
    const [currentPage, setCurrentPage] = useState(1);
    const [profiles, setProfiles] = useState(data_mentor); // 초기 상태를 모든 프로필로 설정
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
    const [noProfilesFound, setNoProfilesFound] = useState(false); // 필터링된 프로필이 없는지 여부를 추적하는 상태 변수 추가

    useEffect(() => {
        // 페이지 이동 시 상태 초기화
        setProfiles(data_mentor);
        setSearchText("");
        setSelectedSubjects([]);
        setSelectedLocations([]);
        setSelectedGenders([]);
        setSelectedMinAges("");
        setSelectedMaxAges("");
        setSelectedMethods([]);
        setSelectedMinFees("");
        setSelectedMaxFees("");
        setIsSearchApplied(false);
        setIsModalOpen(false);
        setIsFilterApplied(false);
        setNoProfilesFound(false);
    }, []);

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

    const applyFilters = () => {
        const filteredProfiles = data_mentor.filter(profile => {
            const subjectFilter = selectedSubjects.length === 0 || selectedSubjects.every(subject => profile.subject.includes(subject));
            const locationFilter = selectedLocations.length === 0 || selectedLocations.includes(profile.location1);
            const genderFilter = selectedGenders.length === 0 || selectedGenders.includes(profile.gender === 0 ? "남자" : "여자");
            const ageFilter = 
            (selectedMinAges === undefined || selectedMinAges === "" || parseInt(profile.age) >= parseInt(selectedMinAges)) && 
            (selectedMaxAges === undefined || selectedMaxAges === "" || parseInt(profile.age) <= parseInt(selectedMaxAges));
            const methodFilter = selectedMethods.length === 0 || selectedMethods.includes(profile.method.toString());
            const feeFilter = 
            (selectedMinFees === undefined || selectedMinFees === "" || parseInt(profile.fee) >= parseInt(selectedMinFees.replace(/,/g, ''))) && 
            (selectedMaxFees === undefined || selectedMaxFees === "" || parseInt(profile.fee) <= parseInt(selectedMaxFees.replace(/,/g, '')));
            const searchFilter = !isSearchApplied || profile.name.includes(searchText);
            
            return subjectFilter && locationFilter && genderFilter && ageFilter && methodFilter && feeFilter && searchFilter;
        });

        setProfiles(filteredProfiles);
        setIsFilterApplied(true);
        setNoProfilesFound(filteredProfiles.length === 0); // 필터링된 프로필이 없는지 여부를 업데이트
    };

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
    const currentProfiles = profiles.slice(indexOfFirstProfile, indexOfFirstProfile + profilesPerPage);

    const paginate = pageNumber => setCurrentPage(pageNumber);

    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
    }

    useEffect(() => {
        setTotalPages(Math.ceil(profiles.length / profilesPerPage));
    }, [profiles, profilesPerPage]);

    useEffect(() => {
        applyFilters();
    }, [searchText, selectedSubjects, selectedLocations, selectedGenders, selectedMinAges, selectedMaxAges, selectedMethods, selectedMinFees, selectedMaxFees]);

    return (
        <div>
            {!isMobile && <div className={style.background2}>
                <div style={{paddingBottom:'200px'}}></div>
                <Body
                    sentence1="보다 쉬운 코딩 과외 매칭을 위해"
                    sentence2="DevTogether에서 더 나은 매칭 선택"
                    title="선생님 찾기"
                    imageSrc='/matching2.png' // 이미지 경로를 전달합니다.
                />
            </div>}
            {isMobile && <div className={style.background2}>
                <div style={{paddingBottom:'100px'}}></div>
                <Body
                    sentence1="보다 쉬운 코딩 과외 매칭을 위해"
                    sentence2="DevTogether에서 더 나은 매칭 선택"
                    title="선생님 찾기"
                />
            </div>}
            {/* {isMobile && 
            <PageHeader
            title='선생님 찾기'
            subtitle="DevTogether에서 더 나은 매칭 선택"
            />} */}
            
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
                                    <div className={style.head} style={{fontSize: isDesktopOrLaptop ? '25px' : '25px' }}>선생님 목록</div>
                                    <Searchbar defaultSearchText="닉네임으로 검색" onSearch={handleSearch} />
                                </div>
                                <div className={style.body} style={{ marginTop: '20px', justifyContent: 'flex-end' }}>
                                    <FilterButton name="필터 적용" onClick={showModal} />
                                </div>
                            </div>
                            }
                             {/* {!isMobile &&
                            <div>
                                <div className={style.background_head}>
                                    <div className={style.head} style={{fontSize: isDesktopOrLaptop ? '25px' : '25px' }}>선생님 목록</div>
                                </div>
                                <div className={style.body} style={{ marginTop: '20px', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <FilterButton name="필터 적용" onClick={showModal} />
                                    <Searchbar defaultSearchText="닉네임으로 검색" onSearch={handleSearch} />
                                </div>
                            </div>
                            } */}
                            {isMobile &&
                            <div>
                                <div className={style.background_head}>
                                    <div className={style.head} style={{fontSize: isDesktopOrLaptop ? '25px' : '20px', marginBottom: '10px' }}>선생님 목록</div>
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
                             {/* {isMobile &&
                            <div>
                                <div className={style.background_head}>
                                    <div className={style.head} style={{fontSize: isDesktopOrLaptop ? '25px' : '25px', marginBottom: '10px' }}>학생 목록</div>
                                    <NavigateSelect
                                        placeholder="목록"
                                        options={[
                                            { value: '학생 찾기', label: '학생' },
                                            { value: '선생님 찾기', label: '선생님' },
                                        ]}
                                        onChange={(newValue) => handleCategoryClick(newValue)}
                                    />
                                </div>
                                <div className={style.body} style={{ marginTop: '30px', marginBottom:'20px', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <FilterButton name="필터 적용" onClick={showModal} />
                                    <Searchbar defaultSearchText="닉네임으로 검색" onSearch={handleSearch} />
                                </div>
                                <div className={style.tagbg}>
                                    <MobFilterTag selectedSubjects={selectedSubjects} selectedLocations={selectedLocations} selectedGenders={selectedGenders} 
                                    selectedMinAges={selectedMinAges} selectedMaxAges={selectedMaxAges} selectedMethods={selectedMethods} selectedMinFees={selectedMinFees} selectedMaxFees={selectedMaxFees} />
                                </div>
                            </div>
                            } */}
                            <div className={style.outer}>
                                <div className={style.inner}>
                                    {noProfilesFound ? ( // 필터링된 프로필이 없는 경우 메시지 표시
                                        <div className={style.noProfilesMessage}>
                                            해당하는 프로필이 존재하지 않습니다.
                                        </div>
                                    ) : (
                                        currentProfiles.map(profile => (
                                            <Profile
                                                key={profile.nickname}
                                                id={profile.id}
                                                name={profile.name}
                                                nickname={profile.nickname}
                                                subject={profile.subject.join(", ")}
                                                gender={profile.gender === 0 ? "남자" : "여자"}
                                                age={profile.age}
                                                role={profile.role}
                                                location={profile.location1}
                                                fee={profile.fee}
                                                method={profile.method === 0 ? "대면" : profile.method === 1 ? "비대면" : "블렌딩"}
                                                imagepath={profile.img}
                                                imagetext="프로필 이미지"
                                            />
                                        ))
                                    )}
                                </div>
                            </div>
                            <div className={style.pagination}>
                                {pageNumbers.map(number => (
                                    <div className={`${style.page} ${currentPage === number ? style.active : ''}`} key={number} onClick={() => paginate(number)}>
                                        {number}
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

export default MatchingMentorList;
