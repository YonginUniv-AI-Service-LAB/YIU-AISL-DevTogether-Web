import React, { useState } from "react";
import { useMediaQuery } from "react-responsive";
import { useNavigate } from "react-router-dom";
import style from "./SignUp.module.css";
import { Button, message } from "antd";
import LogoTitle_Login from "../../components/Group/LOGO/LogoTitle_Login";
import { useRecoilState, useRecoilValue } from "recoil";
import { pageState } from "../../recoil/atoms/login";
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
  yearStateAtom,
  monthStateAtom,
  dayStateAtom,
  dualRoleStateAtom,
  nicknameCheckedStateAtom,
  passwordMatchStateAtom,
  emailVerifiedStateAtom,
} from "../../recoil/atoms/register";
import RegisterPage from "./Register";
import { useMutation } from "@tanstack/react-query";
import { defaultAPI } from "../../api";

const SignUpPage = () => {
  // 반응형 화면
  const isDesktopOrLaptop = useMediaQuery({ minWidth: 992 });
  const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 991 });
  const isMobile = useMediaQuery({ maxWidth: 767 });

  // 페이지 이동
  const navigate = useNavigate();

  // Recoil 상태
  const [page, setPage] = useRecoilState(pageState);
  const password = useRecoilValue(passwordStateAtom);
  const email = useRecoilValue(emailStateAtom);
  const name = useRecoilValue(nameStateAtom);
  const nickname = useRecoilValue(nicknameStateAtom);
  const gender = useRecoilValue(genderStateAtom);
  const age = useRecoilValue(ageStateAtom);
  const role = useRecoilValue(roleStateAtom);
  const year = useRecoilValue(yearStateAtom);
  const month = useRecoilValue(monthStateAtom);
  const day = useRecoilValue(dayStateAtom);
  const dualRole = useRecoilValue(dualRoleStateAtom);
  const question = useRecoilValue(questionStateAtom);
  const answer = useRecoilValue(answerStateAtom);
  const birth = year + month + day;
  const [resetState, setResetState] = useRecoilState(resetStateAtom);

  // 추가된 Recoil 상태
  const [selectedRole, setSelectedRole] = useRecoilState(roleStateAtom);
  const [nicknameChecked, setNicknameChecked] = useRecoilState(nicknameCheckedStateAtom);
  const [passwordMatch, setPasswordMatch] = useRecoilState(passwordMatchStateAtom);
  const [emailVerified, setEmailVerified] = useRecoilState(emailVerifiedStateAtom);
  const [setRegistercheck, setSetRegistercheck] = useState(null);

  // 선택된 역할 처리 함수
  const handleRoleSelection = (role) => {
    setSelectedRole(role);
    setResetState(true);
  };

  // 로그인 페이지로 이동 함수
  const goToLoginPage = () => {
    setPage("signin");
    navigate("/signin");
  };

  // 회원가입 페이지로 이동 함수
  const goToSignUpPage = () => {
    setPage("signup");
    navigate("/signup");
  };

  // 회원가입 처리 함수
  const handleRegister = () => {
    const birth = year + month + day;
    
    // 필수 입력 필드 확인
    if (email && password && name && nickname && gender && age && birth && role && question && answer) {
      // 추가적인 상태 확인
      if (nicknameChecked && passwordMatch && emailVerified) {
        console.log("모든 필드가 채워졌습니다. 회원가입을 진행합니다...");
        setSetRegistercheck(true);
        register.mutate();
      } else {
        message.error("닉네임 확인, 비밀번호 일치, 이메일 인증을 완료하세요.");
      }
    } else {
      message.error("모든 필드를 채워주세요.");
    }
  };

  // 회원가입 Mutation
  const register = useMutation({
    mutationFn: async () => {
      await defaultAPI.post("/register", {
        email,
        pwd: password,
        name,
        nickname,
        role: dualRole ? 3 : selectedRole,
        gender,
        age: Number(age), 
        birth,
        question: Number(question),
        answer,
      });
    },
    onSuccess: () => {
      message.success("회원가입에 성공했습니다.");
      navigate("/complete");
    },
    onError: (error) => {
      if (error.response && error.response.status === 400) {
        message.error("미입력된 정보가 있습니다.");
      } else if (error.response && error.response.status === 409) {
        message.error("이미 존재하는 닉네임입니다. 다른 닉네임을 사용해주세요.");
      } else if (error.response && error.response.status === 409) {
        message.error("이미 존재하는 이메일입니다. 다른 이메일을 사용해주세요.");
      } else {
        message.error("회원가입 중 오류가 발생했습니다.");
      }
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
                    selectedRole === 2
                      ? `${style.role} ${style.selected}`
                      : style.role
                  }
                  onClick={() => handleRoleSelection(2)}
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
                  onClick={() => handleRoleSelection(1)}
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
