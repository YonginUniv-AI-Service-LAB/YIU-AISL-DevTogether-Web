import React, { useState, useEffect } from "react";
import { useMediaQuery } from "react-responsive";
import { useNavigate } from "react-router-dom";
import style from "./SignUp.module.css";
import { Button, Checkbox, Form, Input, message } from "antd";
import LogoTitle_Login from "../../components/Group/LOGO/LogoTitle_Login";
import { RecoilRoot, atom, useRecoilState, useRecoilValue } from "recoil";
import pageState from "../../recoil/atoms/login";
import {
  resetStateAtom,
  passwordStateAtom,
  emailStateAtom,
  nameStateAtom,
  nicknameStateAtom,
  genderStateAtom,
  ageStateAtom,
  roleStateAtom,
  questionStateAtom,
  answerStateAtom,
} from "../../recoil/atoms/register";
import SignUpMain from "./SignUpMain";
import SignUpSub from "./SignUpSub";
import RegisterPage from "./Register";
import { useMutation } from "@tanstack/react-query";
import { defaultAPI } from "../../api";

const SignUpPage = () => {
  // 반응형 화면
  const isDesktopOrLaptop = useMediaQuery({ minWidth: 992 });
  const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 991 });
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const isNotMobile = useMediaQuery({ minWidth: 768 });

  // 페이지 이동
  const navigate = useNavigate();

  const [page, setPage] = useRecoilState(pageState); // Recoil로 페이지 상태 사용
  const password = useRecoilValue(passwordStateAtom);
  const email = useRecoilValue(emailStateAtom);
  const name = useRecoilValue(nameStateAtom);
  const nickname = useRecoilValue(nicknameStateAtom);
  const gender = useRecoilValue(genderStateAtom);
  const age = useRecoilValue(ageStateAtom);
  const role = useRecoilValue(roleStateAtom);
  const question = useRecoilValue(questionStateAtom);
  const answer = useRecoilValue(answerStateAtom);

  const [selectedRole, setSelectedRole] = useRecoilState(roleStateAtom); // 선택된 역할 상태 추가
  const [resetState, setResetState] = useRecoilState(resetStateAtom);

  const [registercheck, setRegistercheck] = useState(null);

  const handleRoleSelection = (role) => {
    setSelectedRole(role);
    setResetState(true);
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

  const handleRegister = () => {
    // 필수 입력 필드가 모두 채워졌는지 확인
    if (
      email &&
      password &&
      name &&
      nickname &&
      gender &&
      age &&
      role &&
      question &&
      answer
    ) {
      // 모든 필드가 채워졌을 때 실행할 함수 호출
      console.log("모든 필드가 채워졌습니다. 회원가입을 진행합니다...");
      console.log(
        password,
        email,
        name,
        nickname,
        gender,
        age,
        role,
        question,
        answer
      );
      setRegistercheck(true);
      회원가입.mutate();
      // 예를 들어, 다른 함수를 호출
      // anotherFunction();
    } else {
      console.log("모든 필드를 채워주세요.");
    }
  };

  const 회원가입 = useMutation({
    mutationFn: async (data) =>
      await defaultAPI.post("/register", {
        email: email,
        pwd: password,
        name: name,
        nickname: nickname,
        role: 1,
        gender: gender,
        age: age,
        birth: "011105",
        question: question,
        answer: answer,
      }),
    onSuccess: () => {
      // 회원가입 성공 후 1) 회원가입 성공 메세지 => 로그인 화면 OR 2) 회원가입 성공 화면
      message.success("성공");
    },
    onError: (e) => {
      console.log("실패: ", e.request);
      message.error("회원가입에 실패했습니다. 입력한 값을 확인해주세요.");
      // 400: 데이터 미입력
      // 409: 데이터 중복(nickname) // 예외
      // 409: 데이터 중복(email)
    },
  });

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
        className={style.register}
        style={{ marginLeft: isMobile ? 0 : isTablet ? 100 : 100 }}
      >
        <div style={{ maxWidth: "400px" }}>
          <div className={style.head}>회원가입</div>
          <div className={style.flex}>
            <div className={style.flex}>
              <div>
                <div
                  className={
                    selectedRole === "student"
                      ? `${style.role} ${style.selected}`
                      : style.role
                  }
                  onClick={() => handleRoleSelection("student")}
                >
                  학생
                </div>
                <div
                  className={
                    selectedRole === "student" ? style.selectedline : style.line
                  }
                ></div>{" "}
                {/* 선택된 역할에만 라인 표시 */}
              </div>
            </div>
            <div className={style.flex}>
              <div>
                <div
                  className={
                    selectedRole === "teacher"
                      ? `${style.role} ${style.selected}`
                      : style.role
                  }
                  onClick={() => handleRoleSelection("teacher")}
                >
                  선생님
                </div>
                <div
                  className={
                    selectedRole === "teacher" ? style.selectedline : style.line
                  }
                ></div>{" "}
                {/* 선택된 역할에만 라인 표시 */}
              </div>
            </div>
          </div>
          <div>
            {/* <SignUpMain resetState={resetState}/>
            <SignUpSub resetState={resetState}/> */}
            <RegisterPage />
            <Button
              type="primary"
              htmlType="submit"
              className={style.form_button}
              onClick={handleRegister}
            >
              가입하기
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
