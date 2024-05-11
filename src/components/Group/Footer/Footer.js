import React from "react";
import { useMediaQuery } from "react-responsive";
import { Button } from "antd";
import style from "./Footer.module.css";
import { colors } from "../../../assets/colors";
import { RiCodeView } from "react-icons/ri";
import styled from "styled-components";
import LogoTitle_Footer from "../LOGO/LogoTitle_Footer";
import { useNavigate } from "react-router-dom";
import FooterNavBtn from "./FooterNavBtn";

const Footer = (props) => {
  const isDesktopOrLaptop = useMediaQuery({ minWidth: 992 });
  const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 991 });
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const isNotMobile = useMediaQuery({ minWidth: 768 });

  const navigate = useNavigate();

  return (
    <div
      style={{
        paddingTop: isMobile ? 30 : 60,
        paddingBottom: isMobile ? 30 : 60,
        paddingLeft: isMobile ? 30 : 120,
        paddingRight: isMobile ? 30 : 120,
        backgroundColor: colors.footer_bg,
        color: colors.footer_text2,
      }}
    >
      <LogoTitle_Footer />
      <div
        style={{
          // width: isMobile || isTablet ? "90%" : "50%",
          display: "flex",
          justifyContent: "flex-start",
          gap: isMobile ? 10 : 30,
          marginTop: 10,
          marginBottom: 30,
        }}
      >

        <FooterNavBtn
          text={"학생 찾기"}
          onClick={() => navigate("/matching:mentee")}
        />
        <FooterNavBtn
          text={"선생님 찾기"}
          onClick={() => navigate("/matching:mento")}
        />
        <FooterNavBtn text={"커뮤니티"} onClick={() => navigate("/board")} />
        <FooterNavBtn text={"공지사항"} onClick={() => navigate("/notice")} />
        <FooterNavBtn
          text={"자주 묻는 질문"}
          onClick={() => navigate("/faq")}
        />
      </div>

      <div>
        <p style={{ fontSize: isMobile ? 14 : 15 }}>
          (주) 데브투게더
          <br />
          사업자등록번호 : 123-34-67890 | 대표 : 변미현
          <br />
          주소 : 경기도 용인시 처인구 용인대학로134 보건복지과학대학1동 7203
          <br />
          이메일 : yiuaiservicelab@gmail.com
        </p>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "flex-start",
          gap: 30,
          marginTop: 10,
        }}
      >
        <FooterNavBtn
          text={"이용약관"}
          onClick={() => navigate("/devtogether/term-of-service")}
        />
        <FooterNavBtn
          text={"개인정보처리방침"}
          onClick={() => navigate("/devtogether/privacy-policy")}
        />
      </div>
    </div>
  );
};
export default Footer;
