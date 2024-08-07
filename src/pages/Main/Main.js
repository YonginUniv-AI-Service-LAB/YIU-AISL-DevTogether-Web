import React from "react";
import { useEffect } from "react";
import { useMediaQuery } from "react-responsive";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import { Carousel } from "antd";
import ProfileMain from "../../components/Group/Profile/ProfileMain";
import styles from "./Main.module.css";
import { useQuery } from "@tanstack/react-query";
import { defaultAPI } from "../../api";
import LoadingSpin from "../../components/Spin/LoadingSpin";
import GetDataErrorView from "../../components/Result/GetDataError";
import AltImage from "../../assets/images/devtogether_logo.png";

// Custom arrow component
const CustomArrow = ({ direction, onClick }) => (
  <div
    className={`${styles.customArrow} ${
      direction === "left" ? styles.customArrowLeft : styles.customArrowRight
    }`}
    onClick={onClick}
  >
    {direction === "left" ? <LeftOutlined /> : <RightOutlined />}
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

  // 등록된 queryClient를 가져옴
  const {
    data: main,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["main"],
    queryFn: async () => {
      const res = await defaultAPI.get("/main");
      return res.data;
    },
  });

  useEffect(() => {
    if (main) {
      console.log("API로부터 가져온 데이터:", main);
    }
  }, [main]);

  if (isLoading) return <LoadingSpin />;
  if (error || !main) return <GetDataErrorView />;

  const menteeProfiles = (main.mentees || []).filter(mentee => mentee !== null);
  const mentorProfiles = (main.mentors || []).filter(mentor => mentor !== null);
  const subjects = (main.subjects || []).slice(0, 5); // 인기 있는 5개 과목만 표시

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

  const mergeSubjects = (profile) => {
    return [profile.subject1, profile.subject2, profile.subject3, profile.subject4, profile.subject5].filter(Boolean).join(", ");
  };

  const mergeLocations = (profile) => {
    return [profile.location1, profile.location2, profile.location3].filter(Boolean).join(", ");
  };

  return (
    <div>
      {!isMobile && (
        <div className={styles.banner}>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div
              style={{
                color: "white",
                alignContent: "center",
                marginRight: "50px",
              }}
            >
              <div style={{ marginBottom: "80px" }}>
                <span style={{ fontSize: "2vw", fontWeight: "400" }}>
                  멘토와 함께하는 맞춤형 코딩
                </span>
                <br />
                <span style={{ fontSize: "2.5vw", fontWeight: "900" }}>
                  코딩 과외 플랫폼
                </span>
                <br />
              </div>
              <div>
                <span style={{ fontSize: "2.5vw", fontWeight: "900" }}>
                  DevTogether
                </span>
              </div>
            </div>
            <img
              src="./main.png"
              alt="메인 이미지"
              style={{ width: "30vw", height: "30vw", marginTop: "" }}
            />
          </div>
        </div>
      )}

      {isMobile && (
        <div className={styles.banner}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <div
              style={{
                color: "white",
                alignContent: "center",
                marginBottom: "20px",
                marginTop: "20px",
              }}
            >
              <div style={{ marginBottom: "10px" }}>
                <span style={{ fontSize: "15px", fontWeight: "400" }}>
                  멘토와 함께하는 맞춤형 코딩
                </span>
                <br />
              </div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <div
                  style={{
                    fontSize: "18px",
                    fontWeight: "900",
                    marginRight: "10px",
                  }}
                >
                  코딩 과외 플랫폼
                </div>
                <div style={{ fontSize: "20px", fontWeight: "900" }}>
                  DevTogether
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <div
        style={{
          marginLeft: breakpoints.isMobile
            ? "5%"
            : breakpoints.isTablet
            ? 30
            : breakpoints.isLargeTablet
            ? "10%"
            : "15%",
          marginRight: breakpoints.isMobile
            ? "5%"
            : breakpoints.isTablet
            ? 30
            : breakpoints.isLargeTablet
            ? "10%"
            : "15%",
        }}
      >
        {/* 멘티 프로필 섹션 */}
        <div className={styles.profileSection}>
          <div style={{ fontSize: "25px", fontWeight: "bold" }}>
            학생 프로필 미리보기
          </div>
          <Carousel arrows infinite={false} {...sliderSettings}>
            {menteeProfiles.map((mentee) => (
              <div key={mentee.id} className={styles.sliderItem}>
                <div className={styles.sliderItemInner}>
                  <ProfileMain
                    id={mentee.id}
                    nickname={mentee.nickname}
                    subject={mergeSubjects(mentee)}
                    gender={mentee.gender == "남" ? "남자" : "여자"}
                    age={mentee.age}
                    location={mergeLocations(mentee)}
                    imagepath={mentee.img ? `data:image/png;base64,${mentee.img}` : AltImage}
                    role={mentee.role}
                  />
                </div>
              </div>
            ))}
          </Carousel>
        </div>

        {/* 멘토 프로필 섹션 */}
        <div style={{ marginTop: "20px" }}>
          <div style={{ fontSize: "25px", fontWeight: "bold" }}>
            선생님 프로필 미리보기
          </div>
          <Carousel arrows infinite={false} {...sliderSettings}>
            {mentorProfiles.map((mentor) => (
              <div key={mentor.id} className={styles.sliderItem}>
                <div className={styles.sliderItemInner}>
                  <ProfileMain
                    id={mentor.id}
                    nickname={mentor.nickname}
                    subject={mergeSubjects(mentor)}
                    gender={mentor.gender === "남" ? "남자" : "여자"}
                    age={mentor.age}
                    location={mergeLocations(mentor)}
                    imagepath={mentor.img ? `data:image/png;base64,${mentor.img}` : AltImage}
                    role={mentor.role}
                  />
                </div>
              </div>
            ))}
          </Carousel>
        </div>

        {/* 인기 있는 과목 섹션 */}
        <div style={{ marginTop: "20px" }}>
          <div
            style={{
              marginBottom: "25px",
              fontSize: "25px",
              fontWeight: "bold",
            }}
          >
            인기 있는 과목
          </div>
          <Carousel arrows infinite={false} {...sliderSettings}>
            {subjects.map((subject, index) => (
              <div key={index} className={styles.sliderItem}>
                <div className={styles.sliderItemInner}>
                  <div className={styles.subjectName}>{subject}</div>
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
