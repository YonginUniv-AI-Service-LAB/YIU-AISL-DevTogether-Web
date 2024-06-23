import React, { useState, useEffect } from "react";
import { useMediaQuery } from "react-responsive";
import { useNavigate } from "react-router-dom";
import style from "./SignIn.module.css";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Checkbox, Form, Input, Modal, Select, message } from "antd";
import PWDCheckBox from "../../components/CheckBox/PWDCheckBox";
import { CiRead, CiUnread } from "react-icons/ci";
import LogoTitle_Login from "../../components/Group/LOGO/LogoTitle_Login";
import { RecoilRoot, atom, useRecoilState } from "recoil";
import { loginRoleStateAtom, pageState } from "../../recoil/atoms/login";
import { emailStateAtom } from "../../recoil/atoms/register";
import LOGO from "../../assets/images/devtogether_logo.png";
import Email from "./Email";
import { useMutation } from "@tanstack/react-query";
import { defaultAPI } from "../../api";

const SignInPage = () => {
  // 반응형 화면
  const isDesktopOrLaptop = useMediaQuery({ minWidth: 992 });
  const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 991 });
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const isNotMobile = useMediaQuery({ minWidth: 768 });

  // 페이지 이동
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [showPassword, setShowPassword] = useState(false); // 비밀번호 보기 토글 상태
  const [selectedRole, setSelectedRole] = useRecoilState(loginRoleStateAtom); // 선택된 역할 상태 추가
  const [page, setPage] = useRecoilState(pageState); // Recoil로 페이지 상태 사용
  const [findidopen, setFindidOpen] = useState(false);
  const [findpasswordopen, setFindpasswordOpen] = useState(false);

  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  const [emailId, setEmailId] = useState("");
  const [selectedDomain, setSelectedDomain] = useState("");
  const [domainInputDisabled, setDomainInputDisabled] = useState(false);

  // const handleInputChange = (e) => {
  //   setEmailId(e.target.value);
  //   setEmail(`${e.target.value}@${selectedDomain}`);
  // };

  // const handleDomainChange = (value) => {
  //   if (value === "type") {
  //     setSelectedDomain("");
  //     setDomainInputDisabled(false);
  //   } else {
  //     setDomainInputDisabled(true);
  //     setSelectedDomain(value);
  //     setEmail(`${emailId}@${value}`);
  //   }
  // };

  // const handleDomainInputChange = (e) => {
  //   const value = e.target.value;
  //   setSelectedDomain(value);
  //   setEmail(`${emailId}@${value}`);
  // };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // const handleRoleSelection = (role) => {
  //   setSelectedRole(role);
  // };

  // 로그인 페이지로 이동하는 함수
  const goToLoginPage = () => {
    setPage("signin");
    navigate("/signin"); // '/login' 경로로 이동
  };

  // 회원가입 페이지로 이동하는 함수
  const goToSignUpPage = () => {
    setPage("signup");
    navigate("/signup"); // '/signup' 경로로 이동
  };

  // 로그인 버튼 클릭 핸들러
  const handleLogin = (values) => {
    // 여기서 실제 로그인 로직 수행
  };

  const findId = () => {
    setFindidOpen(true);
  };

  const findPassword = () => {
    setFindpasswordOpen(true);
  };

  const handleOk = (e) => {
    console.log(e);
    setFindidOpen(false);
  };
  const handleCancel = (e) => {
    console.log(e);
    setFindidOpen(false);
  };

  const login = useMutation({
    mutationFn: async () =>
      await defaultAPI.post("/login", {
        email: email,
        pwd: pwd,
        role: selectedRole,
      }),
    onSuccess: (res) => {
      // 로그인 후 필요한 정보 저장
      console.log("res.data: ", res.data);
      const { email, name, role, nickname, token } = res.data;
      sessionStorage.setItem("accessToken", token["accessToken"]);
      sessionStorage.setItem("refreshToken", token["refreshToken"]);
      sessionStorage.setItem("email", email);
      sessionStorage.setItem("name", name);
      sessionStorage.setItem("nickname", nickname);
      sessionStorage.setItem("role", role);

      // 메인 화면으로 이동
      navigate("/");
    },
    onError: (e) => {
      if (e.request.status == 400) message.error("미입력된 정보가 있습니다.");
      else if (e.request.status == 401)
        message.error("이메일 또는 비밀번호가 올바르지 않습니다.");
      else if (e.request.status == 404)
        message.error("존재하지 않는 회원입니다.");
    },
  });

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePwdChange = (e) => {
    setPwd(e.target.value);
  };

  return (
    <div
      style={{
        marginTop: isMobile ? 50 : 100,
        // marginBottom: isMobile ? 50 : 200,
        marginLeft: isMobile ? "5%" : isTablet ? 30 : "20%",
        marginRight: isMobile ? "5%" : isTablet ? 30 : "20%",
        display: isMobile ? null : "flex",
        justifyContent: "center",
      }}
    >
      {!isMobile && (
        <div className={style.background}>
          <div className={style.logo}>
            <LogoTitle_Login />
          </div>
          <div className={style.body}>
            <div
              className={`${style.side} ${
                page === "signin" ? style.side_select : ""
              }`}
              onClick={goToLoginPage}
            >
              로그인
            </div>
            <div style={{ marginTop: "15px", marginBottom: "15px" }}></div>
            <div
              className={`${style.side} ${
                page === "signup" ? style.side_select : ""
              }`}
              style={{ marginBottom: "50px" }}
              onClick={goToSignUpPage}
            >
              회원가입
            </div>
          </div>
        </div>
      )}
      <div
        className={style.login}
        style={{ marginLeft: isMobile ? 0 : isTablet ? 100 : 100 }}
      >
        <div>
          {/* <img src={LOGO} alt="logo" style={{ width: '200px', height: '200px', display:'flex', justifyContent:'center', marginLeft:'100px', marginBottom:'-30px' }}/> */}
          <div className={style.head}>로그인</div>
          <div className={style.flex}>
            <div className={style.flex}>
              <div>
                <div
                  className={
                    selectedRole === 2
                      ? `${style.role} ${style.selected}`
                      : style.role
                  }
                  onClick={() => setSelectedRole(2)}
                >
                  학생
                </div>
                <div
                  className={
                    selectedRole === 2 ? style.selectedline : style.line
                  }
                ></div>{" "}
                {/* 선택된 역할에만 라인 표시 */}
              </div>
            </div>
            <div className={style.flex}>
              <div>
                <div
                  className={
                    selectedRole === 1
                      ? `${style.role} ${style.selected}`
                      : style.role
                  }
                  onClick={() => setSelectedRole(1)}
                >
                  선생님
                </div>
                <div
                  className={
                    selectedRole === 1 ? style.selectedline : style.line
                  }
                ></div>{" "}
                {/* 선택된 역할에만 라인 표시 */}
              </div>
            </div>
          </div>
          <div className={style.form}>
            <Form
              name="normal_login"
              className="login-form"
              initialValues={{
                remember: true,
              }}
              SignInPage={SignInPage}
            >
              <Form.Item
                name="ID"
                rules={[
                  {
                    required: true,
                    message: "아이디를 입력해주세요",
                  },
                ]}
              >
                <Input
                  prefix={<UserOutlined />}
                  className={style.input}
                  placeholder="아이디"
                  value={email}
                  onChange={handleEmailChange}
                />
              </Form.Item>
              <Form.Item
                name="password"
                rules={[
                  {
                    required: true,
                    message: "비밀번호를 입력해주세요",
                  },
                ]}
              >
                <Input
                  prefix={<LockOutlined />}
                  className={style.input}
                  type={showPassword ? "text" : "password"} // 비밀번호 보기 토글
                  placeholder="비밀번호"
                  value={pwd}
                  onChange={handlePwdChange}
                  suffix={
                    // 비밀번호 보이기/가리기 아이콘
                    <Button
                      type="text"
                      icon={showPassword ? <CiRead /> : <CiUnread />}
                      onClick={togglePasswordVisibility}
                    />
                  }
                />
              </Form.Item>

              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  className={style.form_button}
                  onClick={() => login.mutate()}
                >
                  로그인
                </Button>
              </Form.Item>
              <Email />
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignInPage;
