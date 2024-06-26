import React, { useState, useEffect } from "react";
import style from "./SignUp.module.css";
import { Button, Form, Input, Select, message, Checkbox } from "antd";
import { useRecoilState } from "recoil";
import {
  resetStateAtom,
  idStateAtom,
  passwordStateAtom,
  emailStateAtom,
  nameStateAtom,
  nicknameStateAtom,
  genderStateAtom,
  ageStateAtom,
  questionStateAtom,
  answerStateAtom,
  birthStateAtom,
  yearStateAtom,
  monthStateAtom,
  dayStateAtom,
  roleStateAtom,
  dualRoleStateAtom,
  emailVerifiedStateAtom,
  nicknameCheckedStateAtom,
  passwordMatchStateAtom,
} from "../../recoil/atoms/register";
import { CiRead, CiUnread } from "react-icons/ci";
import { defaultAPI } from "../../api";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";

const RegisterPage = ({ resetState }) => {
  const [reset, setReset] = useRecoilState(resetStateAtom);

  const possible = /^[a-zA-Z0-9!@]+$/;
  const [idErrorMessage, setIdErrorMessage] = useState("");
  const [passwordErrorMessage, setPasswordErrorMessage] = useState("");
  const [confirmPasswordErrorMessage, setConfirmPasswordErrorMessage] = useState("");

  const [id, setId] = useRecoilState(idStateAtom);
  const [idduplication, setIdduplication] = useState(null);
  const [idError, setIdError] = useState(false);

  const [showPassword, setShowPassword] = useState(false);
  const [showconfirmPassword, setShowconfirmPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useRecoilState(passwordStateAtom);
  const [passwordMatch, setPasswordMatch] = useRecoilState(passwordMatchStateAtom);

  const [email, setEmail] = useRecoilState(emailStateAtom);
  const [selectedDomain, setSelectedDomain] = useState("");
  const [domainInputDisabled, setDomainInputDisabled] = useState(false);
  const [verificationNumber, setVerificationNumber] = useState(null);
  const [verificationCode, setVerificationCode] = useState("");
  const [selectedbutton, setSelectedButton] = useState(false);
  const [isCodeVerified, setIsCodeVerified] = useRecoilState(emailVerifiedStateAtom);
  const [remainingTime, setRemainingTime] = useState(180);
  const [timerId, setTimerId] = useState(null);

  const [nameErrorMessage, setNameErrorMessage] = useState("");
  const [nicknameErrorMessage, setNicknameErrorMessage] = useState("");

  const [name, setName] = useRecoilState(nameStateAtom);
  const [nickname, setNickname] = useRecoilState(nicknameStateAtom);
  const [gender, setGender] = useRecoilState(genderStateAtom);
  const [phone, setPhone] = useState("");

  const [selectedYear, setSelectedYear] = useRecoilState(yearStateAtom);
  const [selectedMonth, setSelectedMonth] = useRecoilState(monthStateAtom);
  const [selectedDay, setSelectedDay] = useRecoilState(dayStateAtom);
  const [age, setAge] = useRecoilState(ageStateAtom);
  const [role, setRole] = useRecoilState(roleStateAtom);
  const [question, setQuestion] = useRecoilState(questionStateAtom);
  const [answer, setAnswer] = useRecoilState(answerStateAtom);
  const [birth, setBirth] = useRecoilState(birthStateAtom);

  const [isNicknameChecked, setIsNicknameChecked] = useRecoilState(nicknameCheckedStateAtom);
  const [dualRole, setDualRole] = useRecoilState(dualRoleStateAtom);

  useEffect(() => {
    if (resetState) {
      setId("");
      setIdErrorMessage("");
      setIdduplication(null);
      setIdError(false);
      setPassword("");
      setConfirmPassword("");
      setPasswordMatch(null);
      setPasswordErrorMessage("");
      setEmail("");
      setSelectedDomain("");
      setDomainInputDisabled(false);
      setVerificationCode("");
      setSelectedButton(false);
      setIsCodeVerified(null);
      setRemainingTime(180);
      setTimerId(null);
      setPhone("");
      setName("");
      setNickname("");
      setGender(null);
      setSelectedYear("");
      setSelectedMonth("");
      setSelectedDay("");
      setAge(null);
      setQuestion(null);
      setAnswer("");
      setBirth({ year: "", month: "", day: "" });
      setIsNicknameChecked(null);
      setDualRole(false);

      setReset(false);
    }
  }, [resetState]);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleconfirmPasswordVisibility = () => {
    setShowconfirmPassword(!showconfirmPassword);
  };

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setConfirmPassword("");

    if (value === "") {
      setPasswordErrorMessage("");
    } else if (!possible.test(value)) {
      setPassword("");
      setPasswordErrorMessage("특수 문자는 !, @만 입력 가능합니다.");
    } else if (value.length < 8) {
      setPassword("");
      setPasswordErrorMessage("비밀번호는 최소 8글자 이상이어야 합니다.");
    } else if (
      !/(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*()_+}{"':;?/>.<,])(?=.*[^\w\s]).{8,}/.test(
        value
      )
    ) {
      setPassword("");
      setPasswordErrorMessage(
        "최소 1개 이상의 영문자, 숫자, 특수문자가 포함되어야 합니다."
      );
    } else {
      setPassword(value);
      setPasswordErrorMessage("");
    }

    if (confirmPassword !== "") {
      setPasswordMatch(value === confirmPassword);
    }
  };

  const handleConfirmPasswordChange = (e) => {
    const value = e.target.value;

    if (password !== value) {
      setConfirmPassword("");
      setPasswordMatch(false);
    } else {
      setConfirmPassword(value);
      setPasswordMatch(true);
    }
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleNameChange = (e) => {
    const value = e.target.value;
    const koreanRegex = /^[가-힣]*$/;

    if (koreanRegex.test(value)) {
      setName(value);
      setNameErrorMessage("");
    } else {
      setNameErrorMessage("한글만 입력 가능합니다.");
      setName("");
    }
  };

  const handleNicknameChange = (e) => {
    const value = e.target.value;
    const nicknameRegex = /^[a-zA-Z0-9가-힣]*$/;

    if (nicknameRegex.test(value)) {
      if (value.length > 12) {
        setNicknameErrorMessage("최대 12글자 입니다.");
        setNickname("");
      } else {
        setNickname(value);
        setNicknameErrorMessage("");
        setIsNicknameChecked(null);
      }
    } else {
      setNicknameErrorMessage("한/영, 숫자만 입력 가능합니다.");
      setNickname("");
      setIsNicknameChecked(null);
    }
  };

  const handleGenderChange = (newValue) => {
    setGender(newValue);
  };

  const handlePhoneChange = (e) => {
    const value = e.target.value.replace(/[^\d]/g, "");

    let formattedPhone = "";
    if (value.length > 3 && value.length <= 7) {
      formattedPhone = `${value.slice(0, 3)}-${value.slice(3)}`;
    } else if (value.length > 7) {
      formattedPhone = `${value.slice(0, 3)}-${value.slice(3, 7)}-${value.slice(
        7,
        11
      )}`;
    } else {
      formattedPhone = value;
    }

    setPhone(formattedPhone);
  };

  const handleAgeChange = (e) => {
    setAge(e.target.value);
  };

  const handleQuestionChange = (newValue) => {
    setQuestion(newValue);
  };

  const handleAnswerChange = (e) => {
    setAnswer(e.target.value);
  };

  const handleMonthChange = (newValue) => {
    console.log("달", newValue);
    setSelectedMonth(newValue);
    setDayOptions(generateDayOptions(newValue));
  };

  const sendEmailVerificationCode = useMutation({
    mutationFn: async () => await defaultAPI.post("/register/email", { email }),
    onSuccess: (res) => {
      console.log("결과: ", res);
      setVerificationNumber(res.data);
      message.success("인증번호가 전송되었습니다.");
      setSelectedButton(true);
      setRemainingTime(180);
    },
    onError: (e) => {
      if (e.request.status == 400) message.error("이메일을 입력해주세요.");
      else if (e.request.status == 409)
        message.error("이미 존재하는 이메일입니다.");
    },
  });

  const verifyEmailCode = () => {
    if (parseInt(verificationCode) === parseInt(verificationNumber)) {
      message.success("이메일 인증에 성공했습니다.");
      setIsCodeVerified(true);
    } else {
      message.error("이메일 인증번호가 일치하지 않습니다.");
      setIsCodeVerified(false);
    }
  };

  const checkNicknameAvailability = useMutation({
    mutationFn: async (role) =>
      await defaultAPI.post(`/${role}/nickname`, { nickname }),
    onSuccess: (res) => {
      message.success("사용 가능한 닉네임입니다.");
      setIsNicknameChecked(true);
    },
    onError: (e) => {
      message.error("이미 사용 중인 닉네임입니다.");
      setIsNicknameChecked(false);
    },
  });

  useEffect(() => {
    if (selectedbutton) {
      const newTimerId = setInterval(() => {
        setRemainingTime((prevTime) => prevTime - 1);
      }, 1000);
      setTimerId(newTimerId);
    }
    return () => clearInterval(timerId);
  }, [selectedbutton]);

  useEffect(() => {
    if (remainingTime === 0) {
      setSelectedButton(false);
    }
  }, [remainingTime]);

  const generateYearOptions = () => {
    const currentYear = new Date().getFullYear();
    const startYear = 1940;
    const endYear = currentYear;

    const options = [];
    for (let year = endYear; year >= startYear; year--) {
      options.push({ value: year.toString(), label: `${year.toString()}년` });
    }

    return options;
  };

  const generateMonthOptions = () => {
    return Array.from({ length: 12 }, (_, index) => {
      const monthNumber = (index + 1).toString().padStart(2, "0");
      return { value: monthNumber, label: `${monthNumber}월` };
    });
  };

  const monthDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

  const generateDayOptions = (selectedMonth) => {
    const daysInMonth = monthDays[selectedMonth - 1];
    return Array.from({ length: daysInMonth }, (_, index) => {
      const dayNumber = (index + 1).toString().padStart(2, "0");
      return { value: dayNumber, label: `${dayNumber}일` };
    });
  };

  const [dayOptions, setDayOptions] = useState(generateDayOptions(selectedMonth));

  useEffect(() => {
    if (birth.year && birth.month && birth.day) {
      const today = new Date();
      let age = today.getFullYear() - birth.year + 1;
      setAge(age);
    }
  }, [birth]);

  const questionOptions = [
    { value: "0", label: "인생에서 제일 행복했던 순간은 언제인가요?" },
    { value: "1", label: "태어난 곳은 어디인가요?" },
    { value: "2", label: "제일 좋아하는 음식은 무엇인가요?" },
    { value: "3", label: "출신 초등학교는 어디인가요?" },
    { value: "4", label: "좋아하는 캐릭터는 무엇인가요?" },
  ];

  return (
    <div style={{ marginTop: "40px", width: "400px" }}>
      <Form name="register_main" initialValues={{ remember: true }}>
        <Form.Item name="email">
          <div>이메일</div>
          <div className={style.nicknameContainer}>
            <Input
              placeholder="이메일"
              value={email}
              spellCheck={false}
              onChange={handleEmailChange}
              style={{ width: 280 }}
            />
            {(!selectedbutton || isCodeVerified) && (
              <Button
                type="primary"
                htmlType="submit"
                className={style.check_button}
                style={{ marginLeft: "10px" }}
                onClick={() => sendEmailVerificationCode.mutate(email)}
              >
                인증 번호 전송
              </Button>
            )}
            {selectedbutton && !isCodeVerified && (
              <Button
                type="primary"
                htmlType="submit"
                className={style.check_button}
                style={{ marginLeft: "10px" }}
                onClick={() => sendEmailVerificationCode.mutate()}
              >
                인증 번호 재전송
              </Button>
            )}
          </div>
          <div style={{ height: "0px" }}>
            {isCodeVerified === true && (
              <div className={style.complete}>인증 완료</div>
            )}
          </div>
        </Form.Item>

        <Form.Item
          name="verificationCode"
          style={{
            display:
              selectedbutton === true && !isCodeVerified ? "block" : "none",
          }}
        >
          <div>인증 번호</div>
          <div
            className={style.horizon}
            style={{ display: "flex", alignItems: "center" }}
          >
            <Input
              placeholder="인증번호"
              value={verificationCode}
              style={{ maxWidth: "100px", maxHeight: "30px" }}
              onChange={(e) => setVerificationCode(e.target.value)}
            />
            <Button
              type="primary"
              htmlType="submit"
              className={style.check_button}
              style={{ marginLeft: "10px" }}
              onClick={() => verifyEmailCode()}
            >
              이메일 인증
            </Button>
          </div>
          <div style={{ height: "10px" }}>
                {isCodeVerified === false && (
                  <div className={style.error}>인증번호가 틀렸습니다</div>
                )}
              </div>
            </Form.Item>

            <Form.Item name="password">
              <div>비밀번호</div>
              <Input
                type={showPassword ? "text" : "password"}
                placeholder="비밀번호"
                style={{ maxHeight: "32px" }}
                suffix={
                  <Button
                    type="text"
                    icon={showPassword ? <CiRead /> : <CiUnread />}
                    onClick={togglePasswordVisibility}
                  />
                }
                onChange={handlePasswordChange}
              />
              <div style={{ height: "0px" }}>
                {passwordErrorMessage && (
                  <div className={style.error}>{passwordErrorMessage}</div>
                )}
              </div>
            </Form.Item>

            <Form.Item name="confirmPassword" dependencies={["password"]}>
              <div>비밀번호 확인</div>
              <Input
                type={showconfirmPassword ? "text" : "password"}
                placeholder="비밀번호 확인"
                style={{ maxHeight: "32px" }}
                suffix={
                  <Button
                    type="text"
                    icon={showconfirmPassword ? <CiRead /> : <CiUnread />}
                    onClick={toggleconfirmPasswordVisibility}
                  />
                }
                onChange={handleConfirmPasswordChange}
                disabled={password === "" || !password || passwordErrorMessage}
              />
              <div style={{ height: "0px" }}>
                {passwordMatch === true && (
                  <div className={style.complete}>비밀번호 확인 완료</div>
                )}
                {passwordMatch === false && (
                  <div className={style.error}>비밀번호가 다릅니다.</div>
                )}
              </div>
            </Form.Item>

            <div className={style.horizon}>
              <Form.Item name="name" style={{ marginRight: "10px" }}>
                <div>이름</div>
                <Input
                  placeholder="이름"
                  style={{ width: 195 }}
                  onChange={handleNameChange}
                />
                <div style={{ height: "0px" }}>
                  {nameErrorMessage && (
                    <div style={{ color: "red" }}>{nameErrorMessage}</div>
                  )}
                </div>
              </Form.Item>

              <Form.Item name="gender" style={{ marginRight: "10px" }}>
                <div>성별</div>
                <Select
                  style={{ width: "195px" }}
                  placeholder="성별"
                  options={[
                    { value: "0", label: "남자" },
                    { value: "1", label: "여자" },
                  ]}
                  onChange={handleGenderChange}
                />
              </Form.Item>
            </div>

            <div
              className={style.horizon}
              style={{ display: "flex", alignItems: "center" }}
            >
              <Form.Item name="nickname" style={{ width: "100%" }}>
                <div>닉네임</div>
                <div className={style.nicknameContainer}>
                  <Input
                    placeholder="닉네임"
                    maxLength={12}
                    spellCheck={false}
                    onChange={handleNicknameChange}
                  />
                  <Button
                    type="primary"
                    htmlType="submit"
                    className={style.check_button}
                    style={{ marginLeft: "10px" }}
                    onClick={() =>
                      checkNicknameAvailability.mutate(
                        role == 1 ? "mentor" : "mentee"
                      )
                    }
                  >
                    닉네임 중복 확인
                  </Button>
                </div>
                <div style={{ height: "0px" }}>
                  {nicknameErrorMessage && (
                    <div style={{ color: "red" }}>{nicknameErrorMessage}</div>
                  )}
                  {isNicknameChecked === true && (
                    <div className={style.complete}>사용 가능한 닉네임입니다.</div>
                  )}
                  {isNicknameChecked === false && (
                    <div className={style.error}>이미 사용 중인 닉네임입니다.</div>
                  )}
                </div>
              </Form.Item>
            </div>

            <Form.Item name="birth">
              <div>생년월일</div>
              <div className={style.horizon}>
                <Select
                  style={{ width: 100, marginRight: "10px" }}
                  placeholder="출생년도"
                  options={generateYearOptions()}
                  onChange={(value) => {
                    console.log("년도: ", value);
                    setSelectedYear(value);
                    setBirth((prevBirth) => ({ ...prevBirth, year: value }));
                  }}
                />
                <Select
                  style={{ width: 90, marginRight: "10px" }}
                  placeholder="월"
                  options={generateMonthOptions()}
                  onChange={(value) => {
                    handleMonthChange(value);
                    setBirth((prevBirth) => ({ ...prevBirth, month: value }));
                  }}
                />
                <Select
                  style={{ width: 90, marginRight: "10px" }}
                  placeholder="일"
                  options={dayOptions}
                  onChange={(value) => {
                    console.log("날: ", value);
                    setSelectedDay(value);
                    setBirth((prevBirth) => ({ ...prevBirth, day: value }));
                  }}
                />
                <Input value={age} disabled suffix="세" style={{ width: 90 }} />
              </div>
            </Form.Item>
            <Form.Item name="question">
              <div>아이디 찾기 질문</div>
              <Select
                style={{ width: "400px" }}
                placeholder="질문"
                options={questionOptions}
                onChange={handleQuestionChange}
              />
            </Form.Item>

            <Form.Item name="answer" style={{ marginRight: "10px" }}>
              <div>답변</div>
              <Input
                placeholder="답변"
                style={{ width: 400 }}
                spellCheck={false}
                onChange={handleAnswerChange}
              />
            </Form.Item>

            <Form.Item name="dualRole">
              <Checkbox
                checked={dualRole}
                onChange={(e) => setDualRole(e.target.checked)}
              >
                학생, 선생님 동시 가입하시겠습니까?
              </Checkbox>
            </Form.Item>
          </Form>
        </div>
      );
    };

    export default RegisterPage;
