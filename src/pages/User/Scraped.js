import React, { useState, useEffect } from "react";
import style from "./UserInfo.module.css";
import { useMediaQuery } from "react-responsive";
import { useNavigate } from "react-router-dom";
import Usersidebar from '../../components/Group/Sidebar/Usersidebar';
import { BiSolidEditAlt } from "react-icons/bi";
import Post from "../../components/Group/Post/Post";
import Profile from "../../components/Group/Profile/Profile";
import { data_board } from "../../assets/data/board";
import { data_mentee } from "../../assets/data/mentee";
import { useRecoilState } from 'recoil';
import { posterScrapIdState } from "../../recoil/atoms/scrap";
import { Tabs, Pagination } from 'antd';

const Scraped = () => {
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const [currentPostPage, setCurrentPostPage] = useState(1);
  const [postPerPage] = useState(20); // 한 페이지에 최대 20개의 포스트 표시
  const [currentProfilePage, setCurrentProfilePage] = useState(1);
  const [profilePerPage] = useState(30); // 한 페이지에 최대 30개의 프로필 표시
  const [userScrappedPosts, setUserScrappedPosts] = useState([]);
  const [currentProfile, setCurrentProfile] = useState([]);
  const [selectedTab, setSelectedTab] = useState('1'); // 현재 선택된 탭 상태
  const [tabPosition, setTabPosition] = useState('right');
  const navigate = useNavigate();
  const [userScrappedPostIds] = useRecoilState(posterScrapIdState);
  const user = data_mentee[2]; // 임시 사용자 데이터

  useEffect(() => {
    const userScrappedPostIds = user.scrappedPosts || []; // 해당 멘티가 스크랩한 포스트의 ID 배열
    const filteredPosts = data_board.filter(post => userScrappedPostIds.includes(post.id));
    setUserScrappedPosts(filteredPosts);

    // 스크랩한 프로필 정보를 불러오기
    const fetchScrappedProfiles = () => {
      const profiles = data_mentee.filter(mentee => user.scrappedProfile.includes(mentee.nickname));
      setCurrentProfile(profiles);
    };
    fetchScrappedProfiles();
  }, [user]);

  const maxCombinedLength = isMobile ? 20 : 50;

  const handleCategoryClick = (category) => {
    switch (category) {
      case "회원정보 수정":
        navigate('/matching/menteelist');
        break;
      // 다른 카테고리에 대한 처리 추가
      default:
        break;
    }
  };

  const handlePage = (key) => {
    setSelectedTab(key); // 선택된 탭 변경
  };

  const handlePostClick = (postId) => {
    navigate(`/board/detail/${postId}`);
  };

  const indexOfLastPost = currentPostPage * postPerPage;
  const indexOfFirstPost = indexOfLastPost - postPerPage;
  const currentPosts = userScrappedPosts.slice(indexOfFirstPost, indexOfLastPost);

  const indexOfLastProfile = currentProfilePage * profilePerPage;
  const indexOfFirstProfile = indexOfLastProfile - profilePerPage;
  const currentProfiles = currentProfile.slice(indexOfFirstProfile, indexOfLastProfile);

  return (
      <div style={{  marginLeft: !isMobile ? '30px' : '20px' }}>
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
            {new Array(2).fill(null).map((_, i) => {
              const id = String(i + 1);
              const tabLabel = id === '1' ? '커뮤니티' : '매칭';
              return (
                <Tabs.TabPane
                  tab={tabLabel}
                  key={id}
                />
              );
            })}
          </Tabs>
          {selectedTab === '1' ? (
            <div style={{ marginTop: '40px' }}>
              {currentPosts.map((post, index) => (
                <Post
                  key={post.id}
                  id={post.id}
                  num={index + 1}
                  category={post.category}
                  title={post.title}
                  contents={post.contents.length > maxCombinedLength - post.title.length
                    ? post.contents.substring(0, maxCombinedLength - post.title.length) + '...'
                    : post.contents}
                  createdAt={post.createdAt}
                  likes={post.likes}
                  views={post.views}
                  comment={post.comment}
                  img={post.img}
                  nickname={post.nickname}
                  userImage={post.userImage}
                  introduction={post.introduction}
                  scraped={post.scraped}
                  onClick={() => handlePostClick(post.id)}
                  showBookmark={false}
                  showMenu={false}
                />
              ))}
              {/* <div style={{display:'flex', alignItems:'center', justifyContent:'center'}}>
                <Pagination
                  current={currentPostPage}
                  pageSize={postPerPage}
                  total={userScrappedPosts.length}
                  onChange={(page) => setCurrentPostPage(page)}
                  style={{ marginTop: '20px' }}
                />
              </div>  */}
            </div>
          ) : (
            <div>
            <div style={{ marginTop: '40px', display: 'flex', flexWrap: 'wrap' }}>
              {currentProfiles.map((profile, index) => (
                <Profile
                  key={profile.nickname}
                  name={profile.name}
                  id={profile.id}
                  nickname={profile.nickname}
                  subject={profile.subject.join(", ")}
                  gender={profile.gender === 0 ? "남자" : "여자"}
                  age={profile.age}
                  location={profile.location1}
                  fee={profile.fee}
                  method={profile.method === 0 ? "대면" : profile.method === 1 ? "비대면" : "블렌딩"}
                  imagepath={profile.img}
                  imagetext="프로필 이미지"
                />
              ))}
            </div>
            {/* <div style={{display:'flex', alignItems:'center', justifyContent:'center'}}>
            <Pagination
              current={currentProfilePage}
              pageSize={profilePerPage}
              total={currentProfile.length}
              onChange={(page) => setCurrentProfilePage(page)}
              style={{ marginTop: '20px' }}
            />
          </div>  */}
          </div>
          )}
        </div>
        {selectedTab === '1' ? ( 
        <div style={{display:'flex', alignItems:'center', justifyContent:'center'}}>
                <Pagination
                  current={currentPostPage}
                  pageSize={postPerPage}
                  total={userScrappedPosts.length}
                  onChange={(page) => setCurrentPostPage(page)}
                  style={{ marginTop: '20px' }}
                />
          </div> 
        ):(
          <div style={{display:'flex', alignItems:'center', justifyContent:'center'}}>
            <Pagination
              current={currentProfilePage}
              pageSize={profilePerPage}
              total={currentProfile.length}
              onChange={(page) => setCurrentProfilePage(page)}
              style={{ marginTop: '20px' }}
            />
          </div> 
         ) }
      </div>
  );
};

export default Scraped;
