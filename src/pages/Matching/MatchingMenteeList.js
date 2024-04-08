
import React, { useState, useEffect } from 'react';
import style from './Matching.module.css';
import FilterButton from '../../components/Button/FilterButton';
import Profile from '../../components/Group/Profile/Profile';
import Sidebar from '../../components/Group/Sidebar/Sidebar';
import Searchbar from '../../components/Group/Searchbar/Searchbar';
import FilterModal from '../../components/Modal/FilterModal';

// 임시 데이터
import { data_mentee } from '../../assets/data/mentee'; // 임시 데이터를 불러옵니다.

const MatchingMenteeList = ({ handleSidebarButtonClick }) => {
    // 프로필 목록 상태와 검색 텍스트 상태를 정의합니다.
    const [profiles, setProfiles] = useState([]);
    const [searchText, setSearchText] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false); // 모달 열림 상태 추가

    // 검색어가 변경될 때마다 프로필 목록을 필터링합니다.
    useEffect(() => {
        const timer = setTimeout(() => {
            // 검색어를 이용하여 필터링합니다.
            const filteredProfiles = data_mentee.filter(profile => profile.name.includes(searchText));
            // 필터링된 결과를 상태에 반영합니다.
            setProfiles(filteredProfiles);
        }, 300); // 300밀리초(0.3초) 후에 검색을 실행합니다.

        return () => clearTimeout(timer); // 컴포넌트가 언마운트되거나 검색어가 변경될 때마다 타이머를 해제합니다.
    }, [searchText]);

    const openModal = () => {
      setIsModalOpen(true);
    };

     // 모달 닫기 함수
    const closeModal = () => {
      setIsModalOpen(false);
    };


    return (
        <div className={style.color}>
            <div className={style.line}></div>
            <div className={style.background}>
                <Sidebar onClick={handleSidebarButtonClick} title1="학생 찾기" title2="선생님 찾기"/>
                <div style={{flex: '1', marginTop:'40px', marginLeft:'150px', marginRight:'350px'}}>
                    <div className={style.background}>
                        <div className={style.head}>학생 목록</div>
                        <Searchbar onSearch={setSearchText} />
                    </div>
                    <div className={style.background} style={{marginTop:'80px', justifyContent:'space-between'}}>
                        {/* 필터 버튼에 클릭 이벤트 핸들러를 추가합니다. */}
                        <FilterButton name="과목" onClick={openModal} />
                        <FilterButton name="지역" onClick={openModal} />
                        <FilterButton name="성별" onClick={openModal} />
                        <FilterButton name="나이" onClick={openModal} />
                        <FilterButton name="과외방식" onClick={openModal} />
                        <FilterButton name="수업료" onClick={openModal} />
                    </div>
                    <div className={style.background} style={{ display: 'flex', flexWrap: 'wrap' }}>
                        {/* 프로필 목록을 렌더링합니다. */}
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
            <FilterModal isOpen={isModalOpen} closeModal={closeModal} />
        </div>
    );
}

export default MatchingMenteeList;
