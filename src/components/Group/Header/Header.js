import React, { useState, useContext } from "react";
import { useMediaQuery } from "react-responsive";
import { useNavigate } from "react-router-dom";
import { RecoilRoot, atom, useRecoilState } from "recoil";
import { pageState } from "../../../recoil/atoms/login";
import {
  Button,
  Dropdown,
  Space,
  ConfigProvider,
  Col,
  Row,
  Drawer,
  theme,
  Menu,
} from "antd";
import styles from "./Header.module.css";
import {
  MenuOutlined,
  AppstoreOutlined,
  MailOutlined,
  NotificationOutlined,
  CustomerServiceOutlined,
  QuestionCircleOutlined,
  SignatureOutlined,
  ReadOutlined,
  CommentOutlined,
} from "@ant-design/icons";

import HeaderNavBtn from "./HeaderNavBtn";
import LogoTitle from "../LOGO/LogoTitle";
import LogoTitle_Drawer from "../LOGO/LogoTitle_Drawer";
import { colors } from "../../../assets/colors";

const DropdownItemStyle = {
  padding: 10,
};

const Header = (props) => {
  const isDesktopOrLaptop = useMediaQuery({ minWidth: 992 });
  const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 991 });
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const isNotMobile = useMediaQuery({ minWidth: 768 });

  const navigate = useNavigate();

  const [page, setPage] = useRecoilState(pageState);

  const goToLoginPage = () => {
    setPage("signin");
    navigate("/signin");
  };

  const goToSignUpPage = () => {
    setPage("signup");
    navigate("/signup");
  };

  const goToMyPage = () => {
    setPage("user");
    navigate("/user");
  };

  const { token } = theme.useToken();

  // Drawer 오픈 여부
  const [open, setOpen] = useState(false);
  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };

  // Drawer 메뉴 클릭
  const onClick = (e) => {
    onClose();
    navigate(e.key);
  };

  const Logout = () => {
    sessionStorage.removeItem("accessToken");
    sessionStorage.removeItem("refreshToken");
    sessionStorage.removeItem("user_profile_id");
    sessionStorage.removeItem("email");
    sessionStorage.removeItem("name");
    sessionStorage.removeItem("nickname");
    sessionStorage.removeItem("role");
    navigate("/", { replace: true });
  };

  // 네비게이션 메뉴 - 고객센터
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

  const DrawerMenuItems = [
    {
      key: "/matching/:mentee",
      icon: <ReadOutlined />,
      label: "학생 찾기",
    },
    {
      key: "/matching/:mento",
      icon: <SignatureOutlined />,
      label: "선생님 찾기",
    },
    {
      key: "/board",
      icon: <AppstoreOutlined />,
      label: "커뮤니티",
    },
    {
      key: "/notice",
      icon: <NotificationOutlined />,
      label: "공지사항",
    },
    {
      key: "cs",
      label: "고객센터",
      icon: <CustomerServiceOutlined />,
      children: [
        {
          key: "/faq",
          label: "자주 묻는 질문",
          icon: <QuestionCircleOutlined />,
        },
        {
          key: "/inquiry",
          label: "문의하기",
          icon: <MailOutlined />,
        },
      ],
    },
    {
      key: "/message",
      icon: <CommentOutlined />,
      label: "쪽지",
    },
  ];

  return (
    <div
      style={{
        marginTop: isMobile ? 10 : isTablet ? 25 : 50,
        marginBottom: isMobile ? 10 : isTablet ? 25 : 50,
        marginLeft: isMobile ? 15 : isTablet ? 30 : 225,
        marginRight: isMobile ? 15 : isTablet ? 30 : 225,
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {/* 로고 */}
        <LogoTitle
          fontSize={isMobile || isTablet ? 20 : 30}
          logoWidth={isMobile || isTablet ? 50 : 70}
        />

        {isMobile ? (
          <>
            <MenuOutlined onClick={showDrawer} style={{ cursor: "pointer" }} />
            <Drawer
              title={<LogoTitle_Drawer onClick={onClose} />}
              onClose={onClose}
              open={open}
              closable={false}
              width={"50%"}
            >
              <ConfigProvider
                theme={{
                  token: {
                    colorPrimary: colors.sub,
                  },
                }}
              >
                <Menu
                  onClick={onClick}
                  // defaultSelectedKeys={["1"]}
                  mode="inline"
                  items={DrawerMenuItems}
                  style={{
                    border: "none",
                    width: "100%",
                  }}
                  autoFocus={false}
                />
              </ConfigProvider>
            </Drawer>
          </>
        ) : (
          <div>
            <HeaderNavBtn
              type={"text"}
              text={sessionStorage.getItem("name") ? "마이페이지" : "로그인"}
              onClick={
                sessionStorage.getItem("name") ? goToMyPage : goToLoginPage
              }
            />
            <HeaderNavBtn
              type={"text"}
              text={sessionStorage.getItem("name") ? "로그아웃" : "회원가입"}
              onClick={sessionStorage.getItem("name") ? Logout : goToSignUpPage}
            />
          </div>
        )}
      </div>

      <div>
        <HeaderNavBtn type={"text"} text="학생 찾기" href="/matching/:mentee" />
        <HeaderNavBtn
          type={"text"}
          text="선생님 찾기"
          href="/matching/:mento"
        />
        <HeaderNavBtn type={"text"} text="커뮤니티" href="/board" />
        <HeaderNavBtn type={"text"} text="공지사항" href="/notice" />
        {isMobile ? null : (
          <>
            <ConfigProvider
              theme={{
                token: {
                  borderRadius: 8,
                  fontSize: 16,
                },
              }}
            >
              <Dropdown menu={{ items }} placement="bottom">
                <Button
                  type="text"
                  size={"large"}
                  onClick={() => navigate("/faq")}
                >
                  고객센터
                </Button>
              </Dropdown>
            </ConfigProvider>
            {sessionStorage.getItem("name") &&
            sessionStorage.getItem("role") != 0 ? (
              <HeaderNavBtn type={"text"} text="쪽지" href="/message" />
            ) : null}
          </>
        )}
      </div>
    </div>
  );
};
export default Header;
