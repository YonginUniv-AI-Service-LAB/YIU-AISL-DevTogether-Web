import React, { useState, useEffect } from "react";
import style from "./UserInfo.module.css";
import { useMediaQuery } from "react-responsive";
import { useNavigate } from "react-router-dom";
import { Tabs, Pagination } from 'antd';
import axios from 'axios';
import Profile from "../../components/Group/Profile/Profile";
import AltImage from "../../assets/images/devtogether_logo.png";
import Post from "../../components/Group/Post/Post";
import dayjs from "dayjs";

const Scraped = () => {
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const [currentProfilePage, setCurrentProfilePage] = useState(1);
  const [profilePerPage] = useState(30); // 한 페이지에 최대 30개의 프로필 표시
  const [currentProfile, setCurrentProfile] = useState([]);
  const [selectedTab, setSelectedTab] = useState('1'); // 현재 선택된 탭 상태
  const [scrapedPosts, setScrapedPosts] = useState([]); // 스크랩한 게시물 상태 추가
  const [sortedPosts, setSortedPosts] = useState([]);
  const role = parseInt(sessionStorage.getItem('role'), 10); // 세션 스토리지에서 role 가져오기

  const maxCombinedLength = isMobile ? 20 : 50;

  const navigate = useNavigate();

  useEffect(() => {
    const fetchScrappedProfiles = async () => {
      try {
        const response = await axios.get(`/user/scrap/${role === 1 ? 'mentee' : 'mentor'}`, {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem('accessToken')}`,
          },
        });
        console.log("Scrapped profiles response:", response.data);

        const scrappedProfileIds = response.data.map(profile => profile.userProfile);
        console.log("Fetched scrapped profile IDs:", scrappedProfileIds);

        let profileResponse;
        if (role === 2) { // 멘토
          profileResponse = await axios.get('/mentor', {
            headers: {
              Authorization: `Bearer ${sessionStorage.getItem('accessToken')}`,
            },
          });
        } else if (role === 1) { // 멘티
          profileResponse = await axios.get('/mentee', {
            headers: {
              Authorization: `Bearer ${sessionStorage.getItem('accessToken')}`,
            },
          });
        }
        console.log("Fetched profiles:", profileResponse.data);

        const filteredProfiles = profileResponse.data.filter(profile => scrappedProfileIds.includes(profile.userProfileId));
        console.log("Filtered profiles:", filteredProfiles);
        setCurrentProfile(filteredProfiles);
      } catch (error) {
        console.error("Failed to fetch scrapped profiles:", error);
      }
    };

    const fetchScrapedPosts = async () => {
      try {
        const response = await axios.get(`/user/scrap/board/${role === 2 ? 'mentee' : 'mentor'}`, {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem('accessToken')}`,
          },
        });
        console.log("Fetched scraped posts:", response.data);
        setScrapedPosts(response.data);
      } catch (error) {
        console.error("Failed to fetch scraped posts:", error);
      }
    };

    fetchScrappedProfiles();
    fetchScrapedPosts();
  }, [role]);

  useEffect(() => {
    // 게시물을 최신순으로 정렬하는 함수
    const sortLatest = (data) => {
      return data.slice().sort((a, b) => {
        return new Date(b.createdAt) - new Date(a.createdAt);
      });
    };

    // 초기 데이터 로드 및 정렬
    const sortedData = sortLatest(scrapedPosts);
    setSortedPosts(sortedData);
  }, [scrapedPosts]);

  const handlePage = (key) => {
    setSelectedTab(key); // 선택된 탭 변경
  };

  const handlePostClick = (postId) => {
    navigate(`/board/detail/${postId}`);
  };

  const indexOfLastProfile = currentProfilePage * profilePerPage;
  const indexOfFirstProfile = indexOfLastProfile - profilePerPage;
  const currentProfiles = currentProfile.slice(indexOfFirstProfile, indexOfLastProfile);

  return (
    <div style={{ marginLeft: !isMobile ? '30px' : '20px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <div style={{ fontSize: '25px', fontWeight: '600', marginTop: '20px' }}>스크랩</div>
      </div>
      <div>
        <Tabs
          tabPosition='top'
          type="card"
          style={{ marginTop: '40px' }}
          className={style.tab}
          onChange={handlePage}
        >
          <Tabs.TabPane tab="커뮤니티" key="1" />
          <Tabs.TabPane tab="매칭" key="2" />
        </Tabs>
        {selectedTab === '2' && (
          <div>
            <div style={{ marginTop: '40px', display: 'flex', flexWrap: 'wrap' }}>
              {currentProfiles.map((profile, index) => {
                const imagepath = profile.imgDto && profile.imgDto.fileData
                  ? `data:image/png;base64,${profile.imgDto.fileData}`
                  : AltImage; // 이미지 경로 설정

                return (
                  <Profile
                    key={profile.id}
                    id={profile.userProfileId}
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
                    imagepath={imagepath} // 이미지 경로 설정
                    introduction={profile.introduction}
                    portfolio={profile.portfolio}
                    contents={profile.contents}
                    schedule={profile.schedule}
                    pr={profile.pr}
                    scrap={profile.scrap} // 추가된 부분
                  />
                );
              })}
            </div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '20px' }}>
              <Pagination
                current={currentProfilePage}
                pageSize={profilePerPage}
                total={currentProfile.length}
                onChange={(page) => setCurrentProfilePage(page)}
              />
            </div>
          </div>
        )}
        {selectedTab === '1' && (
          <div style={{ marginTop: '40px' }}>
            {sortedPosts.map((post, index) => {
              // Base64 디코딩
              const userImage = post.userProfileId.filesResponseDto.fileData
                ? `data:image/png;base64,${post.userProfileId.filesResponseDto.fileData}`
                : AltImage;

              return (
                <Post
                  key={post.board}
                  id={post.board}
                  num={index + 1}
                  category={post.category}
                  title={post.title}
                  contents={post.contents.length > maxCombinedLength - post.title.length
                    ? post.contents.substring(0, maxCombinedLength - post.title.length) + '...'
                    : post.contents}
                  createdAt={dayjs(post.createdAt).format("YYYY.MM.DD")}
                  likes={post.likes}
                  views={post.views}
                  comment={post.countComment}
                  img={post.img}
                  nickname={post.userProfileId["nickname"]}
                  userImage={userImage}
                  introduction={post.userProfileId["introduction"]}
                  scraped={true}
                  onClick={() => handlePostClick(post.boardId)}
                  showBookmark={true}
                  showMenu={false}
                />
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default Scraped;
