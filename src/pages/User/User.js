import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import style from "./UserInfo.module.css";
import { useMediaQuery } from "react-responsive";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Usersidebar from '../../components/Group/Sidebar/Usersidebar';
import { FaBell } from "react-icons/fa";
import { Avatar, Badge, Select, message, Button } from 'antd';
import Write from "./Write";
import Commented from "./Commented";
import Scraped from "./Scraped";
import Manager from "./Manager";
import Detail from "./UserDetail/Detail";
import Push from "./Push";
import Body from "../../components/Group/Body/Body";
import Userimg from '../../assets/images/PageHeaderImage/user.svg';
import AltImage from "../../assets/images/devtogether_logo.png";
import RoleButton from "../../components/Button/RoleButton";

const { Option } = Select;

const UserPage = () => {
  const isDesktopOrLaptop = useMediaQuery({ minWidth: 992 });
  const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 991 });
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const isNotMobile = useMediaQuery({ minWidth: 768 });

  const navigate = useNavigate();
  const location = useLocation();
  const [formData, setFormData] = useState(null); // 초기 상태를 null로 설정
  const [selectedCategory, setSelectedCategory] = useState(location.state?.selectedCategory || "내 정보");
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [role, setRole] = useState(null);
  const [userrole, setUserRole] = useState(null); // userrole 상태 추가

  const fetchNotifications = async () => {
    try {
      const response = await axios.get('/user/push', {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem('accessToken')}`,
        },
      });
      console.log('가져온 알림 데이터:', response.data); // 콘솔에 응답 데이터를 출력합니다.
      setNotifications(response.data);
      setUnreadCount(response.data.filter(notification => notification.checks === 1).length);
    } catch (error) {
      console.error('알림 데이터를 가져오는 데 실패했습니다.', error);
      message.error('알림 데이터를 가져오는 데 실패했습니다.');
    }
  };

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get('/user', {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem('accessToken')}`, // 토큰을 헤더에 추가
          },
        });
        const userData = response.data;
        const roleValue = parseInt(sessionStorage.getItem('role'), 10); // 세션 스토리지에서 role 값을 가져옴
        console.log('roleValue:', roleValue); // roleValue 값을 콘솔에 출력
        setRole(roleValue);
        setUserRole(userData.role); // userrole 값을 설정

        console.log('사용자 기본 정보:', userData);
        console.log('userrole:', userData.role); // userrole 값을 콘솔에 출력

        let profileResponse;
        if (roleValue === 1) { // 멘토
          profileResponse = await axios.get('/user/mentor', {
            headers: {
              Authorization: `Bearer ${sessionStorage.getItem('accessToken')}`, // 토큰을 헤더에 추가
            },
          });
        } else if (roleValue === 2) { // 멘티
          profileResponse = await axios.get('/user/mentee', {
            headers: {
              Authorization: `Bearer ${sessionStorage.getItem('accessToken')}`, // 토큰을 헤더에 추가
            },
          });
        } else {
          throw new Error('Invalid role');
        }

        console.log('역할별 추가 정보:', profileResponse.data);

        const profileData = profileResponse.data[0]; // 역할에 맞는 데이터를 가져오기

        // 기본 정보와 역할별 데이터를 병합하여 formData 설정
        const mergedData = { ...userData, ...profileData };
        console.log("API로부터 가져온 병합된 데이터:", mergedData); // 콘솔 로그 추가

        setFormData(mergedData);
      } catch (error) {
        console.error('사용자 정보를 가져오는 데 실패했습니다:', error);
        message.error('사용자 정보를 가져오는 데 실패했습니다.');
      }
    };

    fetchUserProfile();
  }, []);

  useEffect(() => {
    fetchNotifications();
  }, [selectedCategory]);

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  const handleBellClick = () => {
    handleCategoryClick("알림");
  };

  const handleNotificationClick = (notification) => {
    setNotifications((prevNotifications) =>
      prevNotifications.map((item) =>
        item.pushId === notification.pushId ? { ...item, checks: 0 } : item
      )
    );
    setUnreadCount(prevCount => Math.max(prevCount - 1, 0));
  };

  const handleRoleChange = async () => {
    const accessToken = sessionStorage.getItem('accessToken');
    const refreshToken = sessionStorage.getItem('refreshToken');
    const currentRole = sessionStorage.getItem('role');
    const newRole = currentRole === '1' ? '2' : '1'; // 현재 역할에 따라 변경할 역할 설정

    try {
      const response = await axios.post(
        '/token/change',
        new URLSearchParams({
          accessToken,
          refreshToken,
          role: newRole,
        }),
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        }
      );

      const { accessToken: newAccessToken, refreshToken: newRefreshToken } = response.data;

      sessionStorage.setItem('accessToken', newAccessToken);
      sessionStorage.setItem('refreshToken', newRefreshToken);
      sessionStorage.setItem('role', newRole);

      window.location.reload(); // 페이지를 새로고침하여 변경된 역할이 반영되도록 함
    } catch (error) {
      console.error('역할 변경에 실패했습니다:', error);
      message.error('역할 변경에 실패했습니다.');
    }
  };

  const handleRoleAdd = async () => {
    const accessToken = sessionStorage.getItem('accessToken');

    try {
      const response = await axios.put(
        '/role',
        {},
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      if (response.status === 200) {
        message.success('역할이 성공적으로 추가되었습니다.');
        // 필요하다면 상태나 UI 업데이트 추가
      }
    } catch (error) {
      console.error('역할 추가에 실패했습니다:', error);
      message.error('역할 추가에 실패했습니다.');
    }
  };

  const renderContent = () => {
    switch (selectedCategory) {
      case "회원정보 수정":
        return <Detail />;
      case "내 정보":
        return <Detail />;
      case "멘토 관리":
        return <Manager />;
      case "멘티 관리":
        return <Manager />;
      case "나의 글":
        return <Write />;
      case "나의 댓글":
        return <Commented />;
      case "스크랩":
        return <Scraped />;
      case "알림":
        return <Push notifications={notifications} onNotificationClick={handleNotificationClick} />;
      default:
        return <Detail />;
    }
  };

  if (!formData) {
    return <div>Loading...</div>; // 데이터를 불러오기 전 로딩 상태 표시
  }

  const user = formData;
  const sidebarTitles = ["내 정보", role === 2 ? "멘토 관리" : "멘티 관리", "나의 글", "나의 댓글", "스크랩", "알림"];

  // base64 이미지 URL 생성
  const userImage = user.imgDto && user.imgDto.fileData ? `data:image/png;base64,${user.imgDto.fileData}` : AltImage;

  return (
    <div> 
      {!isMobile && <div className={style.background2}>
                <div style={{paddingBottom:'200px'}}></div>
                <Body
                    sentence1 ="나의 프로필과 정보를 한 눈에"
                    sentence2="마이페이지에서 나의 기록과 성과를 확인"
                    title="마이페이지"
                    imageSrc={Userimg} // 이미지 경로를 전달합니다.
                />
            </div>}
      {isMobile && <div className={style.background2}>
                <div style={{paddingBottom:'100px'}}></div>
                <Body
                    sentence1 ="나의 프로필과 정보를 한 눈에"
                    sentence2="마이페이지에서 나의 기록과 성과를 확인해보세요"
                    title="마이페이지"
                />
            </div>}
          
      <div style={{
      // marginTop: isMobile ? 50 : 100,
      // marginBottom: isMobile ? 50 : 200,
      marginLeft: isMobile ? '1%' : isTablet ? 30 : '12%',
      marginRight: isMobile ? '1%' : isTablet ? 20 : '12%',
    }} >
        <div className={style.line}></div>
        <div className={style.contents} style={{flex:'1'}}>
          {!isMobile && (
          <div className={style.user} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div style={{display:'flex', justifyContent:'space-between'}}>
              <div className={style.bell} onClick={handleBellClick} style={{ marginBottom: "10px" }}>
                {unreadCount > 0 ? (
                  <Badge count={unreadCount}>
                    <FaBell size={35} />
                  </Badge>
                ) : (
                  <FaBell size={35} />
                )}
              </div>
              <div className={style.rolebutton}>
                <RoleButton name={userrole === '멘토' || userrole === '멘티' ? '역할 추가' : '역할 변경'}  onClick={userrole === '멘토' || userrole === '멘티' ? handleRoleAdd : handleRoleChange} />
              </div>
            </div>  
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <div className={`${style.circle} ${style.circleImage}`}>
                <img src={userImage} alt={user.name} />
              </div>
              <div className={style.information}>
                <div style={{ fontWeight: '900', fontSize: '25px' }}>{user.nickname}</div>
                <span>{user.introduction}</span>
                <div>
                  <span>{user.gender === '남' ? "남자" : "여자"}</span>
                  <span style={{ opacity: '0.3' }}> | </span>
                  <span>{user.age}세</span> <br />
                </div>
              </div>
            </div>
            <div style={{ marginTop: '20px', width: '100%' }}>
              <Usersidebar titles={sidebarTitles} onCategoryClick={handleCategoryClick} />
            </div>
          </div>
          )}
          <div style={{ flex: '3'}}>
          {isMobile && (
            <div className={style.mobuser} style={{ backgroundColor: '#f0f0f0', padding: '10px 20px', marginBottom: '20px', borderRadius: '30px', display:'flex' }}>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <div className={style.mobcircle} style={{ marginRight: '10px' }}>
                  <img src={userImage} alt={user.name} />
                </div>
                <div className={style.information} style={{ textAlign: 'left' }}>
                  <div style={{ fontWeight: '900', fontSize: '20px' }}>{user.nickname}</div>
                  <span>{user.introduction}</span>
                  <div>
                    <span>{user.gender === 0 ? "남자" : "여자"}</span>
                    <span style={{ opacity: '0.3' }}> | </span>
                    <span>{user.age}세 {role === 1 ? "(선생)" : "(학생)"}</span>
                  </div>
                </div>
              </div>
              <div className={style.bell} onClick={handleBellClick}>
                {unreadCount > 0 ? (
                  <Badge count={unreadCount}>
                    <FaBell size={25} />
                  </Badge>
                ) : (
                  <FaBell size={25} />
                )}
              </div>
            </div>
          )}
          {isMobile && (
            <div style={{ marginBottom: '20px', marginLeft: '20px' }}>
              <Select
                defaultValue="내 정보"
                style={{ width: '100%' }}
                onChange={handleCategoryClick}
              >
                <Option value="내 정보">내 정보</Option>
                <Option value={role === 2 ? "멘토 관리" : "멘티 관리"}>{role === 2 ? "멘토 관리" : "멘티 관리"}</Option>
                <Option value="나의 글">나의 글</Option>
                <Option value="나의 댓글">나의 댓글</Option>
                <Option value="스크랩">스크랩</Option>
                <Option value="알림">알림</Option>
              </Select>
            </div>
          )}
            {renderContent()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserPage;
