import React from "react";
import { useMediaQuery } from "react-responsive";
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import { Carousel } from 'antd';
import ProfileMain from "../../components/Group/Profile/ProfileMain";
import { data_mentee } from '../../assets/data/mentee';
import { data_mentor } from '../../assets/data/mentor';
import { data_subject } from '../../assets/data/subject';
import style from "./Main.module.css";

// Custom arrow component
const CustomArrow = ({ direction, onClick }) => (
  <div
    className={`${style.customArrow} ${direction === 'left' ? style.customArrowLeft : style.customArrowRight}`}
    onClick={onClick}
  >
    {direction === 'left' ? <LeftOutlined /> : <RightOutlined />}
  </div>
);

const MainPage = () => {
  // 반응형 화면
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const breakpoints = {
    isMobile: useMediaQuery({ maxWidth: 480 }),
    isTablet: useMediaQuery({ minWidth: 481, maxWidth: 768 }),
    isLargeTablet: useMediaQuery({ minWidth: 769, maxWidth: 1240 }),
    isDesktop: useMediaQuery({ minWidth: 1241, maxWidth: 1800 }),
    isLargeDesktop: useMediaQuery({ minWidth: 1801 }),
  };

  const menteeProfiles = data_mentee.slice(0, 5);
  const mentorProfiles = data_mentor.slice(0, 5);
  const subjects = data_subject.slice(0, 5); // 인기 있는 5개 과목만 표시

  const slidesToShow = breakpoints.isMobile
    ? 1
    : breakpoints.isTablet
    ? 2
    : breakpoints.isLargeTablet
    ? 3
    : breakpoints.isDesktop
    ? 4
    : 5;

  const sliderSettings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow,
    slidesToScroll: 1,
    nextArrow: <CustomArrow direction="right" />,
    prevArrow: <CustomArrow direction="left" />,
    responsive: [
      { breakpoint: 1801, settings: { slidesToShow: 5, slidesToScroll: 1 } },
      { breakpoint: 1500, settings: { slidesToShow: 4, slidesToScroll: 1 } },
      { breakpoint: 1240, settings: { slidesToShow: 3, slidesToScroll: 1 } },
      { breakpoint: 768, settings: { slidesToShow: 2, slidesToScroll: 1 } },
      { breakpoint: 480, settings: { slidesToShow: 1, slidesToScroll: 1 } },
    ],
  };

  return (
    <div>
      {/* 광고성 영역 */}
      {!isMobile && (
        <div className={style.banner}>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <div style={{ color: 'white', alignContent: 'center', marginRight: '50px' }}>
              <div style={{ marginBottom: '80px' }}>
                <span style={{ fontSize: '2vw', fontWeight: '400' }}>멘토와 함께하는 맞춤형 코딩</span><br />
                <span style={{ fontSize: '2.5vw', fontWeight: '900' }}>코딩 과외 플랫폼</span><br />
              </div>
              <div>
                <span style={{ fontSize: '2.5vw', fontWeight: '900' }}>DevTogether</span>
              </div>
            </div>
            <img src='./main.png' alt="메인 이미지" style={{ width: '30vw', height: '30vw', marginTop: '' }} />
          </div>
        </div>
      )}

      {isMobile && (
        <div className={style.banner}>
          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div style={{ color: 'white', alignContent: 'center', marginBottom: '20px', marginTop: '20px' }}>
              <div style={{ marginBottom: '10px' }}>
                <span style={{ fontSize: '15px', fontWeight: '400' }}>멘토와 함께하는 맞춤형 코딩</span><br />
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <div style={{ fontSize: '18px', fontWeight: '900', marginRight: '10px' }}>코딩 과외 플랫폼</div>
                <div style={{ fontSize: '20px', fontWeight: '900' }}>DevTogether</div>
              </div>
            </div>
          </div>
        </div>
      )}

      <div style={{
        marginLeft: breakpoints.isMobile ? '5%' : breakpoints.isTablet ? 30 : breakpoints.isLargeTablet ? '10%' : '15%',
        marginRight: breakpoints.isMobile ? '5%' : breakpoints.isTablet ? 30 : breakpoints.isLargeTablet ? '10%' : '15%',
      }}>

        {/* 멘티 프로필 섹션 */}
        <div className={style.profileSection}>
          <div style={{fontSize:'25px', fontWeight:'bold'}}>학생 프로필 미리보기</div>
          <Carousel arrows infinite={false} {...sliderSettings}>
            {menteeProfiles.map((mentee) => (
              <div key={mentee.id} className={style.sliderItem}>
                <div className={style.sliderItemInner}>
                  <ProfileMain
                    id={mentee.id}
                    nickname={mentee.nickname}
                    subject={mentee.subject.join(", ")}
                    gender={mentee.gender === 0 ? "남자" : "여자"}
                    age={mentee.age}
                    location={mentee.location1}
                    imagepath={mentee.img}
                    role={mentee.role}
                  />
                </div>
              </div>
            ))}
          </Carousel>
        </div>

        {/* 멘토 프로필 섹션 */}
        <div style={{marginTop:'20px'}}>
          <div style={{fontSize:'25px', fontWeight:'bold'}}>선생님 프로필 미리보기</div>
          <Carousel arrows infinite={false} {...sliderSettings}>
            {mentorProfiles.map((mentor) => (
              <div key={mentor.id} className={style.sliderItem}>
                <div className={style.sliderItemInner}>
                  <ProfileMain
                    id={mentor.id}
                    nickname={mentor.nickname}
                    subject={mentor.subject.join(", ")}
                    gender={mentor.gender === 0 ? "남자" : "여자"}
                    age={mentor.age}
                    location={mentor.location1}
                    imagepath={mentor.img}
                    role={mentor.role}
                  />
                </div>
              </div>
            ))}
          </Carousel>
        </div>

        {/* 인기 있는 과목 섹션 */}
        <div style={{marginTop:'20px'}}>
          <div style={{marginBottom:'25px', fontSize:'25px', fontWeight:'bold'}}>인기 있는 과목</div>
          <Carousel arrows infinite={false} {...sliderSettings}>
            {subjects.map((subject, index) => (
              <div key={index} className={style.sliderItem}>
                <div className={style.sliderItemInner}>
                  <div className={style.subjectName}>{subject}</div>
                </div>
              </div>
            ))}
          </Carousel>
        </div>
      </div>
    </div>
  );
};

export default MainPage;