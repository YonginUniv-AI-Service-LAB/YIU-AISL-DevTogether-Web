import React, { useState, useEffect } from "react";
import style from "./UserInfo.module.css";
import { useMediaQuery } from "react-responsive";
import { useNavigate } from "react-router-dom";
import Usersidebar from '../../components/Group/Sidebar/Usersidebar';
import { BiSolidEditAlt } from "react-icons/bi";
import { data_board } from "../../assets/data/board";
import { data_mentee } from "../../assets/data/mentee";
import { data_mentor } from "../../assets/data/mentor"; 
import { useRecoilState } from 'recoil';
import { Tabs, Pagination } from 'antd';
import ProfileManager from '../../components/Group/Profile/ProfileManager';

const Manager = () => {
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const [profiles, setProfiles] = useState(data_mentee); 
  const [currentPostPage, setCurrentPostPage] = useState(1);
  const [postPerPage] = useState(20); 
  const [currentProfilePage, setCurrentProfilePage] = useState(1);
  const [profilePerPage] = useState(30); 
  const [userScrappedPosts, setUserScrappedPosts] = useState([]);
  const [currentProfile, setCurrentProfile] = useState([]);
  const [selectedTab, setSelectedTab] = useState('1'); 
  const [tabPosition, setTabPosition] = useState('right');
  const navigate = useNavigate();
  const user = data_mentee[2]; 

  const [role, setRole] = useState(user.role == 1 ? '멘티' : '멘토'); 

  useEffect(() => {
    const userScrappedPostIds = user.scrappedPosts || [];
    const filteredPosts = data_board.filter(post => userScrappedPostIds.includes(post.id));
    setUserScrappedPosts(filteredPosts);

    const fetchScrappedProfiles = () => {
      const profiles = data_mentee.filter(mentee => user.scrappedProfile.includes(mentee.nickname));
      setCurrentProfile(profiles);
    };
    fetchScrappedProfiles();
  }, [user]);

  useEffect(() => {
    const fetchConnectedProfiles = () => {
      const connectedProfiles = role === '멘티' ? data_mentor.filter(mentor => user.connectMentor.includes(mentor.nickname)) : data_mentee.filter(mentee => user.connectMentor.includes(mentee.nickname));
      setProfiles(connectedProfiles);
    };
    fetchConnectedProfiles();
  }, [role, user]);

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
  const currentProfiles = profiles.slice(indexOfFirstProfile, indexOfLastProfile);

  return (
      <div style={{  marginLeft: !isMobile ? '30px' : '20px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <div style={{ fontSize: '25px', fontWeight: '600', marginTop: '20px' }}>나의 멘토</div>
        </div>
        <div style={{ marginTop: '40px', display: 'flex', flexWrap: 'wrap' }}>
          {currentProfiles.map(profile => (
            <ProfileManager
              key={profile.nickname}
              nickname={profile.nickname}
              subject={profile.subject.join(", ")}
              gender={profile.gender === 0 ? "남자" : "여자"}
              age={profile.age}
              location={profile.location1}
              fee={profile.fee}
              method={profile.method === 0 ? "대면" : profile.method === 1 ? "비대면" : "블렌딩"}
              imagepath={profile.img}
              imagetext="프로필 이미지"
              startDate="2024-05-01"
              endDate="2024-06-01"
              status={profile.status}
              onStatusChange={handleStatusChange}
            />
          ))}
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
