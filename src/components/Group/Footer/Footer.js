import React from "react";
import { Button } from "antd";
import style from "./Footer.module.css";
import { colors } from "../../../assets/colors";
import { RiCodeView } from "react-icons/ri";
import styled from "styled-components";

const Footer = (props) => {
  return (
    <div
      style={{
        padding: 100,
        paddingTop: 70,
        paddingBottom: 70,
        backgroundColor: colors.footer_bg,
        color: colors.footer_text2,
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
        }}
      >
        <span>
          <RiCodeView size={50} />
        </span>
        <span
          style={{
            fontSize: 30,
            color: colors.footer_text1,
            fontWeight: "bold",
            marginLeft: 10,
          }}
        >
          DevTogether
        </span>
      </div>
      <div
        style={{
          width: "50%",
          display: "flex",
          justifyContent: "space-between",
          marginTop: 10,
          marginBottom: 30,
        }}
      >
        <LinkBtn>학생 찾기</LinkBtn>
        <LinkBtn>선생님 찾기</LinkBtn>
        <LinkBtn>커뮤니티</LinkBtn>
        <LinkBtn>공지사항</LinkBtn>
        <LinkBtn>자주묻는질문</LinkBtn>
        <LinkBtn>쪽지</LinkBtn>
        <LinkBtn>마이페이지</LinkBtn>
      </div>

      <div
        style={{
          width: "70%",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <div>
          <p style={{}}>
            (주) 데브투게더
            <br />
            사업자등록번호 : 123-34-67890 | 대표 : 변미현
            <br />
            주소 : 경기도 용인시 처인구 용인대학로134 보건복지과학대학1동 7203
            <br />
            이메일 : yiuaiservicelab@gmail.com
          </p>
        </div>
      </div>

      <div
        style={{
          width: "15%",
          display: "flex",
          justifyContent: "space-between",
          marginTop: 10,
          marginBottom: 30,
        }}
      >
        <LinkBtn>이용약관</LinkBtn>
        <LinkBtn>개인정보처리방침</LinkBtn>
      </div>
    </div>
  );
};
export default Footer;

const LinkBtn = styled.div`
  font-weight: bold;
  &:hover {
    cursor: pointer;
  }
`;
