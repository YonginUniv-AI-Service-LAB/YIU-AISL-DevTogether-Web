import React, { useEffect, useState } from "react";
import style from "./Profile.module.css";
import { useMediaQuery } from "react-responsive";
import { useNavigate } from "react-router-dom";

const ProfileMain = (props) => {
  // 반응형 화면
  const isDesktopOrLaptop = useMediaQuery({ minWidth: 992 });
  const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 991 });
  const isMobile = useMediaQuery({ maxWidth: 767 });

  const navigate = useNavigate();

  const handleMoreButtonClick = () => {
    console.log("Profile props:", props.role);
    const detailPagePath =
      props.role === 2
        ? `/matching/mentor/${props.id}`
        : `/matching/mentee/${props.id}`;
    navigate(detailPagePath); // 프로필 상세 페이지로 이동
  };

  const [subjectText, setSubjectText] = useState(props.subject);
  const [locationText, setLocationText] = useState(props.location);

  useEffect(() => {
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
        const newWidth = context.measureText(
          newTruncated + ellipsis + (words.length - i - 1) + "개"
        ).width;

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

    setSubjectText(truncateText(props.subject, maxWidth, font));
    setLocationText(truncateText(props.location, maxWidth, font));
  }, [props.subject, props.location, isMobile]);

  return (
    <div
      className={style.background}
      style={{ width: isMobile ? "176px" : "200px" }}
    >
      <div className={`${style.circle} ${style.circleImage}`}>
        <img src={props.imagepath} alt={props.imagetext} />
      </div>
      <div className={style.information} style={{ marginTop: "60px" }}>
        <div style={{ fontWeight: "900" }}>{props.nickname}</div>
        <div
          className={style.subject}
          style={{ fontSize: isMobile ? "12px" : "15px" }}
        >
          {subjectText}
        </div>
        <div style={{ display: "flex" }}>
          <div style={{ fontSize: isMobile ? "12px" : "15px" }}>
            {props.gender}
          </div>
          <div
            style={{ opacity: "0.3", marginLeft: "10px", marginRight: "10px" }}
          >
            {" "}
            |{" "}
          </div>
          <div style={{ fontSize: isMobile ? "12px" : "15px" }}>
            {props.age}세
          </div>
        </div>
        <div
          className={style.location}
          style={{ fontSize: isMobile ? "12px" : "15px" }}
        >
          {locationText}
        </div>
      </div>
    </div>
  );
};

export default ProfileMain;
