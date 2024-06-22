import React, { useState, useEffect } from "react";
import style from "./UserInfo.module.css";
import { useMediaQuery } from "react-responsive";
import { useNavigate } from "react-router-dom";
import Usersidebar from '../../components/Group/Sidebar/Usersidebar';
import { BiSolidEditAlt } from "react-icons/bi";
import Post from "../../components/Group/Post/Post";
import { data_board } from "../../assets/data/board";
import { data_mentee } from "../../assets/data/mentee";
import { data_comment } from "../../assets/data/comment"; // 댓글 데이터 추가
import { useRecoilState, useSetRecoilState, useRecoilValue } from 'recoil';
import { posterScrapIdState } from "../../recoil/atoms/scrap";
import { Radio, Space, Tabs } from 'antd';
import Profile from "../../components/Group/Profile/Profile";
import { scrappedProfilesState } from "../../recoil/atoms/scrap";

const ScrapedPro = () => {
    const isMobile = useMediaQuery({ maxWidth: 767 });
    const [currentProfile, setCurrentProfile] = useState([]);
  
    const navigate = useNavigate();
  
    const user = data_mentee[2]; // 임시 사용자 데이터
    const [tabPosition, setTabPosition] = useState('right');
  
    useEffect(() => {
      // 스크랩한 프로필 정보를 불러오기
      const fetchScrappedProfiles = () => {
        // user.scrappedProfile 배열에 있는 각 닉네임에 해당하는 프로필을 필터링하여 가져옵니다.
        const profiles = data_mentee.filter((mentee) => user.scrappedProfile.includes(mentee.nickname));
        setCurrentProfile(profiles);
        console.log(profiles);
      };
      fetchScrappedProfiles(); // 컴포넌트가 렌더링될 때마다 스크랩한 프로필 정보를 가져옴
    }, [user.scrappedProfile]); // 한 번만 실행되어야 함
  
    const handleCategoryClick = (category) => {
      // 카테고리 클릭 처리
      switch (category) {
        case "회원정보 수정":
          navigate('/matching/menteelist');
          break;
        // 다른 카테고리에 대한 처리 추가
        default:
          break;
      }
    };
  
    const changeTabPosition = (e) => {
      setTabPosition(e.target.value);
    };

  return (
    <div className={style.background}>
      <div className={style.user}>
        <div className={style.edit}><BiSolidEditAlt size={45} /></div>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <div className={`${style.circle} ${style.circleImage}`}>
            <img src={user.img} alt={user.name} />
          </div>
          <div className={style.information}>
            <div style={{ fontWeight: '900', fontSize: '25px' }}>{user.name}</div>
            <span>{user.introduction}</span>
            <div>
              <span>{user.gender === 0 ? "남자" : "여자"}</span>
              <span style={{ opacity: '0.3' }}> | </span>
              <span>{user.age}세</span> <br />
            </div>
          </div>
        </div>
        <div className={style.side} style={{ marginTop: '30px' }}>
          <Usersidebar titles={["내 정보", "매칭 글", "멘토 관리", "내가 작성한 글", "내가 댓글단 글", "스크랩", "리뷰 보기"]} onCategoryClick={handleCategoryClick} />
        </div>
      </div>

      <div className={style.contents}>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <div style={{ fontSize: '25px', fontWeight: '600', marginLeft: '30px', marginTop: '20px' }}>스크랩</div>
        </div>
        <div style={{display:'flex'}}>
          <div style={{marginLeft: '30px', marginTop: '40px', display:'flex', flexWrap:'wrap'}}>
          {currentProfile.map((profile, index) => (
            <Profile
                key={profile.nickname} // 이 부분에서 profile.nickname을 사용합니다.
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
          <Tabs
            tabPosition={tabPosition}
            style={{ marginTop: '40px' }}
            className={style.tab}
          >
            {new Array(2).fill(null).map((_, i) => {
              const id = String(i + 1);
              const tabLabel = id === '1' ? '커뮤니티' : '매칭'; // 탭 이름 설정
              return (
                <Tabs.TabPane
                  tab={tabLabel} // 탭 이름 설정
                  key={id}
                />
              );
            })}
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default ScrapedPro;
