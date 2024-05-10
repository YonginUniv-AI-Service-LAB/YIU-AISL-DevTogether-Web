import React, { useState, useContext } from "react";
import { useMediaQuery } from "react-responsive";
import { useNavigate } from "react-router-dom";

import {
  Button,
  Dropdown,
  Space,
  ConfigProvider,
  Col,
  Row,
  MenuProps,
  Drawer,
  theme,
  Image,
  Avatar,
} from "antd";
import styles from "./Header.module.css";
import { colors } from "../../../assets/colors";
import LOGO from "../../../assets/images/devtogether_logo.png";

import HeaderNavBtn from "./HeaderNavBtn";

const DropdownItemStyle = {
  padding: 10,
};

const Header = (props) => {
  const isDesktopOrLaptop = useMediaQuery({ minWidth: 992 });
  const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 991 });
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const isNotMobile = useMediaQuery({ minWidth: 768 });

  const navigate = useNavigate();

  const { token } = theme.useToken();
  const [open, setOpen] = useState(false);
  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };

  const containerStyle = {
    position: "relative",
    height: 100,
    padding: 48,
    overflow: "hidden",
    textAlign: "center",
    background: token.colorFillAlter,
    border: `1px solid ${token.colorBorderSecondary}`,
    borderRadius: token.borderRadiusLG,
  };

  const items = [
    {
      key: "1",
      label: "자주 묻는 질문",
      style: DropdownItemStyle,
      onClick: () => {
        // setMembers("professors");
        navigate("/faq");
      },
    },
    {
      key: "2",
      label: "문의하기",
      style: DropdownItemStyle,
      onClick: () => {
        // setMembers("professors");
        navigate("/inquiry");
      },
    },
  ];

  // const funcLogout = () => {
  //   dispatch(logout());
  //   sessionStorage.removeItem("accessToken");
  //   sessionStorage.removeItem("userid");
  //   sessionStorage.removeItem("name");
  //   sessionStorage.removeItem("email");
  //   sessionStorage.removeItem("master");
  //   navigate("/", { replace: true });
  // };

  return (
    <div style={{ margin: 300, marginTop: 50, marginBottom: 50 }}>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {/* 랩실 로고 */}
        <div>
          <a
            href="/"
            style={{
              textDecoration: "none",
              fontWeight: "bold",
              fontSize: 30,
              color: colors.main,
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <span style={{ marginRight: 10 }}>
              <Image width={70} src={LOGO} preview={false} />
            </span>
            <span style={{}}>DevTogether</span>
          </a>
        </div>

        {/* 메인 네비 */}
        {/* 로그인&회원가입 */}
        <div>
          <Space>
            <HeaderNavBtn type={"text"} text="로그인" href="/signin" />
            <HeaderNavBtn type={"text"} text="회원가입" href="/signup" />
          </Space>
        </div>
      </div>

      <Row align={"middle"} justify={"start"}>
        <Col>
          <Space wrap>
            <HeaderNavBtn
              type={"text"}
              text="학생 찾기"
              href="/matching/:mentee"
            />
            <HeaderNavBtn
              type={"text"}
              text="선생님 찾기"
              href="/matching/:mento"
            />
            <HeaderNavBtn type={"text"} text="커뮤니티" href="/board" />
            <HeaderNavBtn type={"text"} text="공지사항" href="/notice" />
            <ConfigProvider
              theme={{
                token: {
                  borderRadius: 8,
                  fontSize: isMobile ? 11 : 16,
                },
              }}
            >
              <Dropdown menu={{ items }} placement="bottom">
                <Button
                  type="text"
                  size={isMobile ? "small" : "large"}
                  onClick={() => navigate("/faq")}
                >
                  고객센터
                </Button>
              </Dropdown>
            </ConfigProvider>
            <HeaderNavBtn type={"text"} text="쪽지" href="/message" />
            {/* <HeaderNavBtn type={"text"} text="Community" href="/community" /> */}
          </Space>
        </Col>
      </Row>
    </div>
  );
};
export default Header;
