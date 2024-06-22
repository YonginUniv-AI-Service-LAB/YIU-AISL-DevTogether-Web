import React, { useState, useEffect } from "react";
import style from "./UserInfo.module.css";
import { useMediaQuery } from "react-responsive";
import { useNavigate } from "react-router-dom";
import Usersidebar from '../../components/Group/Sidebar/Usersidebar';
import { data_mentee } from '../../assets/data/mentee';
import { FaBell } from "react-icons/fa";
import { Avatar, Badge, Select } from 'antd';
import Write from "./Write";
import Commented from "./Commented";
import Scraped from "./Scraped";
import Manager from "./Manager";
import Detail from "./UserDetail/Detail";
import Push from "./Push";
import { data_push } from "../../assets/data/push"; // 알림 데이터
import Body from "../../components/Group/Body/Body";
import Userimg from '../../assets/images/PageHeaderImage/user.svg';

const { Option } = Select;

const UserPage = () => {
  const isDesktopOrLaptop = useMediaQuery({ minWidth: 992 });
  const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 991 });
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const isNotMobile = useMediaQuery({ minWidth: 768 });

  const navigate = useNavigate();
  const [formData, setFormData] = useState(data_mentee[2]);
  const [selectedCategory, setSelectedCategory] = useState("내 정보");
  const [notifications, setNotifications] = useState(data_push);
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    // 알림 수를 초기화
    setUnreadCount(notifications.filter(notification => !notification.read).length);
  }, [notifications]);

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  const handleBellClick = () => {
    handleCategoryClick("알림");
  };

  const handleNotificationClick = (notification) => {
    setNotifications((prevNotifications) =>
      prevNotifications.map((item) =>
        item.id === notification.id ? { ...item, read: true } : item
      )
    );
  };

  const renderContent = () => {
    switch (selectedCategory) {
      case "회원정보 수정":
        return <Detail />;
      case "내 정보":
        return <Detail />;
      case "멘토 관리":
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

  const user = formData;

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
            <div className={style.bell} onClick={handleBellClick}>
              <Badge count={unreadCount}>
                <FaBell size={35} />
              </Badge>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <div className={`${style.circle} ${style.circleImage}`}>
                <img src={user.img} alt={user.name} />
              </div>
              <div className={style.information}>
                <div style={{ fontWeight: '900', fontSize: '25px' }}>{user.nickname}</div>
                <span>{user.introduction}</span>
                <div>
                  <span>{user.gender === 0 ? "남자" : "여자"}</span>
                  <span style={{ opacity: '0.3' }}> | </span>
                  <span>{user.age}세</span> <br />
                </div>
              </div>
            </div>
            <div className={style.side} style={{ marginTop: '30px', width: '100%' }}>
              <Usersidebar titles={["내 정보", "멘토 관리", "나의 글", "나의 댓글", "스크랩", "알림"]} onCategoryClick={handleCategoryClick} />
            </div>
          </div>
          )}
          <div style={{ flex: '3'}}>
          {isMobile && (
            <div className={style.mobuser} style={{ backgroundColor: '#f0f0f0', padding: '10px 20px', marginBottom: '20px', borderRadius: '30px', display:'flex' }}>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <div className={style.mobcircle} style={{ marginRight: '10px' }}>
                  <img src={user.img} alt={user.name} />
                </div>
                <div className={style.information} style={{ textAlign: 'left' }}>
                  <div style={{ fontWeight: '900', fontSize: '20px' }}>{user.nickname}</div>
                  <span>{user.introduction}</span>
                  <div>
                    <span>{user.gender === 0 ? "남자" : "여자"}</span>
                    <span style={{ opacity: '0.3' }}> | </span>
                    <span>{user.age}세</span>
                  </div>
                </div>
              </div>
              <div className={style.bell} onClick={handleBellClick}>
                <Badge count={unreadCount}>
                  <FaBell size={25} />
                </Badge>
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
                <Option value="멘토 관리">멘토 관리</Option>
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
