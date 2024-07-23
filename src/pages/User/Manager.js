import React, { useState, useEffect } from "react";
import style from "./UserInfo.module.css";
import { useMediaQuery } from "react-responsive";
import { useNavigate } from "react-router-dom";
import { Tabs, Pagination } from 'antd';
import axios from 'axios';
import ProfileManager from '../../components/Group/Profile/ProfileManager';
import AltImage from "../../assets/images/devtogether_logo.png";

const Manager = () => {
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const [profiles, setProfiles] = useState([]);
  const [currentPostPage, setCurrentPostPage] = useState(1);
  const [postPerPage] = useState(20); 
  const [currentProfilePage, setCurrentProfilePage] = useState(1);
  const [profilePerPage] = useState(30); 
  const [userScrappedPosts, setUserScrappedPosts] = useState([]);
  const [currentProfile, setCurrentProfile] = useState([]);
  const [selectedTab, setSelectedTab] = useState('1'); 
  const [tabPosition, setTabPosition] = useState('right');
  const navigate = useNavigate();
  const userId = parseInt(sessionStorage.getItem('user_profile_id'), 10); // 세션 스토리지에서 user_profile_id 가져오기
  const role = parseInt(sessionStorage.getItem('role'), 10); // 세션 스토리지에서 role 가져오기
  const [roleType, setRoleType] = useState(role == 1 ? '멘티' : '멘토'); 

  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        const url = roleType === '멘티' ? '/user/matching/mentee' : '/user/matching/mentor';
        const response = await axios.get(url, {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem('accessToken')}`,
          },
        });
        console.log("관리 프로필:", response.data);
        // 거절된 프로필을 제외하고 상태가 거절되지 않은 프로필만 설정
        const filteredProfiles = response.data.filter(profile => profile.status !== "거절");
        setProfiles(filteredProfiles);
      } catch (error) {
        console.error("Failed to fetch profiles:", error);
      }
    };

    fetchProfiles();
  }, [roleType]);

  const handleStatusChange = (nickname, newStatus) => {
    if (newStatus === "종료됨") {
      setProfiles((prevProfiles) =>
        prevProfiles.map((profile) =>
          profile.nickname === nickname ? { ...profile, status: newStatus } : profile
        )
      );
    } else {
      setProfiles(profiles.filter(profile => profile.nickname !== nickname));
    }
  };

  const maxCombinedLength = isMobile ? 20 : 50;

  const indexOfLastPost = currentPostPage * postPerPage;
  const indexOfFirstPost = indexOfLastPost - postPerPage;
  const currentPosts = userScrappedPosts.slice(indexOfFirstPost, indexOfLastPost);

  const indexOfLastProfile = currentProfilePage * profilePerPage;
  const indexOfFirstProfile = indexOfLastProfile - profilePerPage;
  const currentProfiles = profiles.slice(indexOfFirstProfile, indexOfFirstProfile + profilePerPage);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    if (isNaN(date)) {
      console.error("Invalid date:", dateString);
      return "Invalid Date";
    }
    const year = date.getFullYear().toString().slice(-2); // 년도 뒤 두자리
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // 월 (1월은 0이므로 +1)
    const day = date.getDate().toString().padStart(2, '0'); // 일
    return `${year}.${month}.${day}`;
  };

  return (
      <div style={{  marginLeft: !isMobile ? '30px' : '20px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <div style={{ fontSize: '25px', fontWeight: '600', marginTop: '20px' }}>{`나의 ${roleType}`}</div>
        </div>
        <div style={{ marginTop: '40px', display: 'flex', flexWrap: 'wrap' }}>
          {currentProfiles.map(profile => {
            const subjects = [profile.subject1, profile.subject2, profile.subject3, profile.subject4, profile.subject5].filter(Boolean);
            const imagepath = profile.imgDto && profile.imgDto.fileData ? `data:image/png;base64,${profile.imgDto.fileData}` : AltImage;
            return (
              <ProfileManager
                key={profile.matchingId} // key를 matchingId로 설정
                matchingId={profile.matchingId}
                nickname={profile.nickname}
                subject={subjects.length ? subjects.join(", ") : "과목 정보 없음"}
                gender={profile.gender === 0 ? "남자" : "여자"}
                age={profile.age}
                location={profile.location1}
                fee={profile.fee}
                method={profile.method === 0 ? "대면" : profile.method === 1 ? "비대면" : "블렌딩"}
                imagepath={imagepath}
                imagetext="프로필 이미지"
                startDate={formatDate(profile.createAt)}
                endDate={formatDate(profile.endedAt)}
                status={profile.status}
                onStatusChange={handleStatusChange}
                check={profile.checkReview}
              />
            );
          })}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '20px' }}>
          <Pagination
            current={currentProfilePage}
            pageSize={profilePerPage}
            total={profiles.length}
            onChange={(page) => setCurrentProfilePage(page)}
          />
        </div>
      </div>
  );
};

export default Manager;
