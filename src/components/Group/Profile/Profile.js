import React, { useState, useEffect } from "react";
import style from "./Profile.module.css";
import MoreButton from "../../Button/MoreButton";
import ScrapButton from "../../Button/ScrapButton";
import { useMediaQuery } from "react-responsive";
import { useNavigate } from "react-router-dom";

const Profile = (props) => {
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const navigate = useNavigate();

  const handleMoreButtonClick = () => {
    const profileData = {
      id: props.id,
      nickname: props.nickname,
      gender: props.gender,
      age: props.age,
      subject1: props.subject1,
      subject2: props.subject2,
      subject3: props.subject3,
      subject4: props.subject4,
      subject5: props.subject5,
      location1: props.location1,
      location2: props.location2,
      location3: props.location3,
      method: props.method,
      fee: props.fee,
      img: props.imagepath,
      introduction: props.introduction,
      portfolio: props.portfolio,
      contents: props.contents,
      pr: props.pr,
      schedule: props.schedule,
    };

    console.log("Profile Data to Store:", profileData);

    // 프로필 데이터를 세션 스토리지에 저장
    sessionStorage.setItem('selectedProfile', JSON.stringify(profileData));

    const detailPagePath = props.role === '멘토' ? `/matching/mentor/${props.id}` : `/matching/mentee/${props.id}`;
  console.log("Navigating to:", detailPagePath);
  navigate(detailPagePath); // 프로필 상세 페이지로 이동
  };

  const [subjectText, setSubjectText] = useState("");
  const [locationText, setLocationText] = useState("");

  useEffect(() => {
    const subjects = [props.subject1, props.subject2, props.subject3, props.subject4, props.subject5].filter(Boolean).join(', ');
    const locations = [props.location1, props.location2, props.location3].filter(Boolean).join(', ');

    const truncateText = (text, maxWidth, font) => {
      const canvas = document.createElement("canvas");
      const context = canvas.getContext("2d");
      context.font = font;
      const ellipsis = " 외 ";
      const words = text.split(", ");
      let truncated = "";
      let truncatedWidth = 0;

      for (let i = 0; i < words.length; i++) {
        const word = words[i];
        const newTruncated = truncated ? `${truncated}, ${word}` : word;
        const newWidth = context.measureText(newTruncated + ellipsis + (words.length - i - 1) + "개").width;

        if (newWidth > maxWidth) {
          return truncated + ellipsis + (words.length - i) + "개";
        }

        truncated = newTruncated;
        truncatedWidth = newWidth;
      }

      return truncated;
    };

    const maxWidth = isMobile ? 150 : 180; // 원하는 최대 너비를 설정
    const font = isMobile ? "12px Arial" : "15px Arial";

    setSubjectText(truncateText(subjects, maxWidth, font));
    setLocationText(truncateText(locations, maxWidth, font));
  }, [props.subject1, props.subject2, props.subject3, props.subject4, props.subject5, props.location1, props.location2, props.location3, isMobile]);

  return (
    <div className={style.background} style={{ width: isMobile ? '176px' : '200px' }}>
      <div className={`${style.circle} ${style.circleImage}`}>
        <img src={props.imagepath} alt={props.imagetext} />
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginRight: '10px', marginLeft: '10px', marginTop: '25px' }}>
        <ScrapButton nickname={props.nickname} />
        <MoreButton onClick={handleMoreButtonClick} />
      </div>
      <div className={style.information}>
        <div style={{ fontWeight: '900' }}>{props.nickname}</div>
        <div className={style.subject} style={{ fontSize: isMobile ? '12px' : '15px' }}>{subjectText}</div>
        <div style={{ display: 'flex' }}>
          <div style={{ fontSize: isMobile ? '12px' : '15px' }}>{props.gender}</div>
          <div style={{ opacity: '0.3', marginLeft: '10px', marginRight: '10px' }}> | </div>
          <div style={{ fontSize: isMobile ? '12px' : '15px' }}>{props.age}세</div>
        </div>
        <div className={style.location} style={{ fontSize: isMobile ? '12px' : '15px' }}>{locationText}</div>
      </div>
    </div>
  );
};

export default Profile;
