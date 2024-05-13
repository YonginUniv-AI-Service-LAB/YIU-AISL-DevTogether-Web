import React, { useState } from 'react';
import { useMediaQuery } from "react-responsive";
import { useNavigate } from "react-router-dom";
import style from "./SignIn.module.css";
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input } from 'antd';
import PWDCheckBox from "../../components/CheckBox/PWDCheckBox";
import { CiRead, CiUnread } from "react-icons/ci";
import LogoTitle_Login from '../../components/Group/LOGO/LogoTitle_Login';
import { RecoilRoot, atom, useRecoilState } from 'recoil';
import pageState from "../../recoil/atoms/login";
import LOGO from "../../assets/images/devtogether_logo.png";

const SignInPage = () => {
  // 반응형 화면
  const isDesktopOrLaptop = useMediaQuery({ minWidth: 992 });
  const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 991 });
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const isNotMobile = useMediaQuery({ minWidth: 768 });

  // 페이지 이동
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false); // 비밀번호 보기 토글 상태
  const [selectedRole, setSelectedRole] = useState("student"); // 선택된 역할 상태 추가
  const [page, setPage] = useRecoilState(pageState); // Recoil로 페이지 상태 사용

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleRoleSelection = (role) => {
    setSelectedRole(role);
  };

  // 로그인 페이지로 이동하는 함수
  const goToLoginPage = () => {
    setPage("signin");
    navigate('/signin'); // '/login' 경로로 이동
  };

  // 회원가입 페이지로 이동하는 함수
  const goToSignUpPage = () => {
    setPage("signup");
    navigate('/signup'); // '/signup' 경로로 이동
  };

  return (
    <div className={style.dual}>
      <div className={style.background}>
        <div className={style.logo}><LogoTitle_Login/></div>
        <div className={style.body}> 
          <div className={`${style.side} ${page === 'signin' ? style.side_select : ''}`} onClick={goToLoginPage}>로그인</div>
          <div className={`${style.side} ${page === 'signup' ? style.side_select : ''}`} onClick={goToSignUpPage}>회원가입</div>
        </div>
      </div>
      <div className={style.login}>
        <div>
          {/* <img src={LOGO} alt="logo" style={{ width: '200px', height: '200px', display:'flex', justifyContent:'center', marginLeft:'100px', marginBottom:'-30px' }}/> */}
          <div className={style.head}>
            로그인
          </div>
          <div className={style.flex}>
            <div className={style.flex}>
              <div>
                <div 
                  className={selectedRole === "student" ? `${style.role} ${style.selected}` : style.role} 
                  onClick={() => handleRoleSelection("student")}
                >
                  학생
                </div>
                {selectedRole === "student" && <div className={style.line}></div>} {/* 선택된 역할에만 라인 표시 */}
              </div>
            </div> 
            <div className={style.flex}>
              <div>
                <div 
                  className={selectedRole === "teacher" ? `${style.role} ${style.selected}` : style.role} 
                  onClick={() => handleRoleSelection("teacher")}
                >
                  선생님
                </div>
                {selectedRole === "teacher" && <div className={style.line}></div>} {/* 선택된 역할에만 라인 표시 */}
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
                    message: '아이디를 입력해주세요',
                  },
                ]}
              >
                <Input prefix={<UserOutlined/>}
                className={style.input}
                placeholder="아이디" />
              </Form.Item>
              <Form.Item
                name="password"
                rules={[
                  {
                    required: true,
                    message: '비밀번호를 입력해주세요',
                  },
                ]}
              >
                <Input
                  prefix={<LockOutlined/>}
                  className={style.input}
                  type={showPassword ? "text" : "password"} // 비밀번호 보기 토글
                  placeholder="비밀번호"
                  suffix={ // 비밀번호 보이기/가리기 아이콘
                    <Button
                      type="text"
                      icon={showPassword ? <CiRead /> : <CiUnread />}
                      onClick={togglePasswordVisibility}
                    />
                  }
                />
              </Form.Item>
              <Form.Item>
                <Form.Item name="remember" valuePropName="checked">
                  <PWDCheckBox
                  label="비밀번호 기억하기"
                  />
                </Form.Item>
              </Form.Item>

              <Form.Item>
                <Button type="primary" htmlType="submit" className={style.form_button}>
                  로그인
                </Button>
              </Form.Item>

              <div className={style.flex}>
                <div className={style.link}>
                  아이디 찾기
                </div>
                <span style={{ opacity: '0.3'}}> | </span>
                <div className={style.link}>
                  비밀번호 찾기
                </div>
              </div>

            </Form>
          </div>    
        </div>
      </div>
    </div>
  );
};

export default SignInPage;
