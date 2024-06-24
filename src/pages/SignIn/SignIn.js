import React, { useState, useEffect } from "react";
import { useMediaQuery } from "react-responsive";
import { useNavigate } from "react-router-dom";
import style from "./SignIn.module.css";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Form, Input, message } from "antd";
import { CiRead, CiUnread } from "react-icons/ci";
import LogoTitle_Login from "../../components/Group/LOGO/LogoTitle_Login";
import { useRecoilState } from "recoil";
import { loginRoleStateAtom, pageState } from "../../recoil/atoms/login";
import LOGO from "../../assets/images/devtogether_logo.png";
import Email from "./Email";
import { useMutation } from "@tanstack/react-query";
import { defaultAPI } from "../../api";

const SignInPage = () => {
  // 반응형 화면
  const isDesktopOrLaptop = useMediaQuery({ minWidth: 992 });
  const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 991 });
  const isMobile = useMediaQuery({ maxWidth: 767 });

  // 페이지 이동
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [showPassword, setShowPassword] = useState(false); // 비밀번호 보기 토글 상태
  const [selectedRole, setSelectedRole] = useRecoilState(loginRoleStateAtom); // 선택된 역할 상태 추가
  const [page, setPage] = useRecoilState(pageState); // Recoil로 페이지 상태 사용
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");

  // 비밀번호 보기 토글
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

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
    const data = { email, pwd, role: selectedRole };
    console.log("로그인 데이터: ", data); // 로그인 데이터 콘솔에 출력
    login.mutate(data);
  };

  // 이메일 입력 핸들러
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  // 비밀번호 입력 핸들러
  const handlePwdChange = (e) => {
    setPwd(e.target.value);
  };

  // 로그인 API 호출
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
      const { email, user_profile_id, name, role, nickname, token } = res.data;
      sessionStorage.setItem("accessToken", token["accessToken"]);
      sessionStorage.setItem("refreshToken", token["refreshToken"]);
      sessionStorage.setItem("user_profile_id", user_profile_id);
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

  return (
    <div
      style={{
        marginTop: isMobile ? 50 : 100,
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
                ></div>
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
                ></div>
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
              onFinish={handleLogin}
            >
              <Form.Item
                name="email"
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
