import React, { useState, useEffect } from 'react';
import style from "./SignUp.module.css";
import { Button, Form, Input, Select } from 'antd';
import { useRecoilState } from 'recoil';
import { resetStateAtom, idStateAtom, passwordStateAtom, emailStateAtom, 
    nameStateAtom, nicknameStateAtom, genderStateAtom, ageStateAtom, questionStateAtom, answerStateAtom } from '../../recoil/atoms/register';
import { CiRead, CiUnread } from "react-icons/ci";
import axios from 'axios';

const SignUpMain = ({ resetState }) => {
  const [reset, setReset] = useRecoilState(resetStateAtom);

  const possible = /^[a-zA-Z0-9!@]+$/;
  const [idErrorMessage, setIdErrorMessage] = useState('');
  const [passwordErrorMessage, setPasswordErrorMessage] = useState('');
  const [confirmPasswordErrorMessage, setConfirmPasswordErrorMessage] = useState('');

  const [id, setId] = useRecoilState(idStateAtom);
  const [idduplication, setIdduplication] = useState(null);
  const [idError, setIdError] = useState(false);

  const [showPassword, setShowPassword] = useState(false); // 비밀번호 보기 토글 상태
  const [showconfirmPassword, setShowconfirmPassword] = useState(false); // 비밀번호 보기 토글 상태
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useRecoilState(passwordStateAtom);
  const [passwordMatch, setPasswordMatch] = useState(null);

  const [email, setEmail] = useRecoilState(emailStateAtom);
  const [emailId, setEmailId] = useState('');
  const [selectedDomain, setSelectedDomain] = useState('');
  const [domainInputDisabled, setDomainInputDisabled] = useState(false);

  const [verificationCode, setVerificationCode] = useState('');
  const [selectedbutton, setSelectedButton] = useState(false);
  const [isCodeVerified, setIsCodeVerified] = useState(null);
  const [remainingTime, setRemainingTime] = useState(180);
  const [timerId, setTimerId] = useState(null);

  const [nameErrorMessage, setNameErrorMessage] = useState('');
  const [nicknameErrorMessage, setNicknameErrorMessage] = useState('');

  const [name, setName] = useRecoilState(nameStateAtom);
  const [nickname, setNickname] = useRecoilState(nicknameStateAtom);
  const [gender, setGender] = useRecoilState(genderStateAtom);
  const [phone, setPhone] = useState('');

  const [selectedYear, setSelectedYear] = useState('');
  const [selectedMonth, setSelectedMonth] = useState('');
  const [selectedDay, setSelectedDay] = useState('');
  const [age, setAge] = useRecoilState(ageStateAtom);
  const [question, setQuestion] = useRecoilState(questionStateAtom);
  const [answer, setAnswer] = useRecoilState(answerStateAtom);
  
  const [isNicknameChecked, setIsNicknameChecked] = useState(null);

  useEffect(() => {
    if (resetState) {
      setId('');
      setIdErrorMessage('');
      setIdduplication(null);
      setIdError(false);
      setPassword('');
      setConfirmPassword('');
      setPasswordMatch(null);
      setPasswordErrorMessage('');
      setEmail('');
      setEmailId('');
      setSelectedDomain('');
      setDomainInputDisabled(false);
      setVerificationCode('');
      setSelectedButton(false);
      setIsCodeVerified(null);
      setRemainingTime(180);
      setTimerId(null);
      setPhone('');
      setName('');
      setNickname('');
      setGender(null);
      setSelectedYear('');
      setSelectedMonth('');
      setSelectedDay('');
      setAge(null);
      setQuestion(null);
      setAnswer('');
      setIsNicknameChecked(null);

      setReset(false); // 초기화 후 resetState를 다시 false로 설정
    }
  }, [resetState]);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleconfirmPasswordVisibility = () => {
    setShowconfirmPassword(!showconfirmPassword);
  };

  // 비밀번호 입력
  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setConfirmPassword('');

    if (value === '') {
      setPasswordErrorMessage('');
    } else if (!possible.test(value)) {
      setPassword('');
      setPasswordErrorMessage('특수 문자는 !, @만 입력 가능합니다.');
    } else if (value.length < 8) {
      setPassword('');
      setPasswordErrorMessage('비밀번호는 최소 8글자 이상이어야 합니다.');
    } else if (!/(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*()_+}{"':;?/>.<,])(?=.*[^\w\s]).{8,}/.test(value)) {
      setPassword('');
      setPasswordErrorMessage('최소 1개 이상의 영문자, 숫자, 특수문자가 포함되어야 합니다.');
    } else {
      setPassword(value);
      setPasswordErrorMessage('');
    }

    if (confirmPassword !== '') {
      setPasswordMatch(value === confirmPassword);
    } 
  };

  const handleConfirmPasswordChange = (e) => {
    const value = e.target.value;

    if (password !== value) {
      setConfirmPassword('');
      setPasswordMatch(false);
    } else {
      setConfirmPassword(value);
      setPasswordMatch(true); // 비밀번호 확인 여부 판단
    }
  };

  const handleInputChange = (e) => {
    setEmailId(e.target.value);
    setEmail(`${e.target.value}@${selectedDomain}`);
  };

  const handleDomainChange = (value) => {
    if (value === 'type') {
      setSelectedDomain('');
      setDomainInputDisabled(false);
    } else {
      setDomainInputDisabled(true);
      setSelectedDomain(value);
      setEmail(`${emailId}@${value}`);
    }
  };
  
  const handleDomainInputChange = (e) => {
    const value = e.target.value;
    setSelectedDomain(value);
    setEmail(`${emailId}@${value}`);
  };

  const handleSendVerificationCode = async () => {
    setSelectedButton(true);
    setRemainingTime(180);
    try {
      // 서버로부터의 응답 처리
      console.log('인증 번호 전송 성공');
    } catch (error) {
      // 오류 처리
      console.error('인증 번호 전송 실패:', error);
    }
  };

  useEffect(() => {
    if (selectedbutton) {
      const newTimerId = setInterval(() => {
        setRemainingTime(prevTime => prevTime - 1);
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

  // 이메일 인증번호 확인 로직
  const handleVerifyCode = () => {
    setIsCodeVerified(true); // 임시로 true로 설정합니다. 실제 로직은 여기에 구현되어야 합니다.
    // clearInterval(timerId);
  };

  const handleNicknameCheck = async () => {
    // 서버와 연결된 실제 API 호출 대신, 닉네임 중복 확인이 성공했다고 가정합니다.
    setIsNicknameChecked(true);
  };

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
      const monthNumber = (index + 1).toString().padStart(2, '0');
      return { value: monthNumber, label: `${monthNumber}월` };
    });
  };

  const handleMonthChange = (newValue) => {
    setSelectedMonth(newValue);
    setDayOptions(generateDayOptions(newValue));
  };

  const monthDays = [ 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31 ];
  
  const generateDayOptions = (selectedMonth) => {
    const daysInMonth = monthDays[selectedMonth - 1]; 
    return Array.from({ length: daysInMonth }, (_, index) => {
      const dayNumber = (index + 1).toString().padStart(2, '0');
      return { value: dayNumber, label: `${dayNumber}일` };
    });
  };

  const [dayOptions, setDayOptions] = useState(generateDayOptions(selectedMonth));

  useEffect(() => {
    if (selectedYear && selectedMonth && selectedDay) {
      const today = new Date();
      const birthYear = parseInt(selectedYear);
      let age = today.getFullYear() - birthYear + 1;
      setAge(age);
    }
  }, [selectedYear, selectedMonth, selectedDay]);

  // 이름 변경 함수
  // 이름 입력 (한글만 허용)
  const handleNameChange = (e) => {
    const value = e.target.value;
    const koreanRegex = /^[가-힣]*$/;

    if (koreanRegex.test(value)) {
      setName(value);
      setNameErrorMessage('');
    } else {
      setNameErrorMessage('한글만 입력 가능합니다.');
      setName('');
    }
  };

  // 닉네임 변경 함수
  const handleNicknameChange = (e) => {
    const value = e.target.value;
    const nicknameRegex = /^[a-zA-Z0-9가-힣]*$/;

    if (nicknameRegex.test(value)) {
        if (value.length > 12) {
            setNicknameErrorMessage('최대 12글자 입니다.');
            setNickname('');
        } else {
            setNickname(value);
            setNicknameErrorMessage('');
            setIsNicknameChecked(null); // Reset the nickname check status
        }
    } else {
        setNicknameErrorMessage('한/영, 숫자만 입력 가능합니다.');
        setNickname('');
        setIsNicknameChecked(null); // Reset the nickname check status
    }
  };

  // 성별 선택 함수
  const handleGenderChange = (newValue) => {
    setGender(newValue);
  };

  const handlePhoneChange = (e) => {
    const value = e.target.value.replace(/[^\d]/g, ''); // 숫자 이외의 문자 제거
  
    let formattedPhone = '';
    if (value.length > 3 && value.length <= 7) {
      formattedPhone = `${value.slice(0, 3)}-${value.slice(3)}`;
    } else if (value.length > 7) {
      formattedPhone = `${value.slice(0, 3)}-${value.slice(3, 7)}-${value.slice(7, 11)}`;
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

  return (
    <div style={{ marginTop: '40px', width:'400px' }}>
      <Form name="register_main" initialValues={{ remember: true }}>
        <Form.Item name="email">
          <div>이메일</div>
          <div className={style.nicknameContainer}>
            <Input
                placeholder="이메일"
                value={emailId}
                spellCheck={false}
                onChange={handleInputChange}
                style={{ width: 280 }}
            />
            {(!selectedbutton || isCodeVerified) &&
            <Button
            type="primary"
            htmlType="submit"
            className={style.check_button}
            style={{marginLeft:'10px'}}
            onClick={handleSendVerificationCode}
            >
              인증 번호 전송
            </Button>}
            {(selectedbutton && !isCodeVerified) &&
            <Button
            type="primary"
            htmlType="submit"
            className={style.check_button}
            style={{marginLeft:'10px'}}
            onClick={handleSendVerificationCode}
            >
              인증 번호 재전송
            </Button>}
          </div>
          <div style={{ height: '0px' }}>
          {isCodeVerified === true && <div className={style.complete}>인증 완료</div>}
          </div>
        </Form.Item>

        <Form.Item
          name="verificationCode"
          style={{ display: selectedbutton === true && !isCodeVerified ? 'block' : 'none' }} // 인증번호가 확인되면 숨김 처리
        >
          <div>인증 번호</div>
          <div className={style.horizon} style={{display:'flex', alignItems:'center' }}>
            <Input placeholder="인증번호" value={verificationCode} style={{maxWidth: '100px', maxHeight: '30px'}} onChange={(e) => setVerificationCode(e.target.value)} />
            <Button type="primary" htmlType="submit" className={style.check_button} style={{marginLeft:'10px'}} onClick={handleVerifyCode}>
              이메일 인증
            </Button>
          </div>
          <div style={{height:'10px'}}>
          {isCodeVerified === false && <div className={style.error}>인증번호가 틀렸습니다</div>}
          </div>
        </Form.Item>

        <Form.Item name="password">
          <div>비밀번호</div>
          <Input type={showPassword ? "text" : "password"} placeholder="비밀번호" style={{maxHeight:'32px'}}
          suffix={ // 비밀번호 보이기/가리기 아이콘
                    <Button
                      type="text"
                      icon={showPassword ? <CiRead /> : <CiUnread />}
                      onClick={togglePasswordVisibility}
                    /> }
                    onChange={handlePasswordChange} />
          <div style={{ height: '0px' }}>
            {passwordErrorMessage && <div className={style.error}>{passwordErrorMessage}</div>}
          </div>
        </Form.Item>

        <Form.Item name="confirmPassword" dependencies={['password']}>
          <div>비밀번호 확인</div>
          <Input type={showconfirmPassword ? "text" : "password"} placeholder="비밀번호 확인" style={{maxHeight:'32px'}}
            suffix={ // 비밀번호 보이기/가리기 아이콘
                    <Button
                      type="text"
                      icon={showconfirmPassword ? <CiRead /> : <CiUnread />}
                      onClick={toggleconfirmPasswordVisibility}
                    /> }onChange={handleConfirmPasswordChange} disabled={password === '' || !password || passwordErrorMessage}/>
          <div style={{ height: '0px' }}>
            {passwordMatch === true && <div className={style.complete}>비밀번호 확인 완료</div>}
            {passwordMatch === false && <div className={style.error}>비밀번호가 다릅니다.</div>}
          </div>
        </Form.Item>

        <div className={style.horizon}>
            <Form.Item name="name" style={{marginRight:'10px'}}>
                <div>이름</div>
                <Input placeholder="이름" style={{ width: 195}} onChange={handleNameChange}/>
                <div style={{ height: '0px' }}>
                  {nameErrorMessage && <div style={{ color: 'red' }}>{nameErrorMessage}</div>}
                </div>
            </Form.Item>

            <Form.Item name="gender" style={{marginRight:'10px'}}>
                <div>성별</div>
                <Select
                    style={{ width: '195px'}}
                    placeholder="성별"
                    options={[
                        {
                        value: '0',
                        label: '남자',
                        },
                        {
                        value: '1',
                        label: '여자',
                        }
                    ]}
                    onChange={handleGenderChange}
                />
            </Form.Item>
        </div>

        <div className={style.horizon} style={{ display: 'flex', alignItems: 'center' }}>
            <Form.Item name="nickname" style={{ width: '100%' }} >
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
                  style={{marginLeft:'10px'}}
                  onClick={handleNicknameCheck}
                  >
                    닉네임 중복 확인
                  </Button>
                </div>
                <div style={{ height: '0px' }}>
                  {nicknameErrorMessage && <div style={{ color: 'red' }}>{nicknameErrorMessage}</div>}
                  {isNicknameChecked === true && <div className={style.complete}>사용 가능한 닉네임입니다.</div>}
                  {isNicknameChecked === false && <div className={style.error}>이미 사용 중인 닉네임입니다.</div>}
                </div>
            </Form.Item>
        </div>

        <Form.Item name="age">
            <div>생년월일</div>
            <div className={style.horizon}>
                <Select
                    style={{ width: 100, marginRight:'10px' }}
                    placeholder="출생년도"
                    options={generateYearOptions()}
                    onChange={(value) => setSelectedYear(value)}
                />
                <Select
                    style={{ width: 90, marginRight:'10px' }}
                    placeholder="월"
                    options={generateMonthOptions()}
                    onChange={handleMonthChange}
                />
                <Select
                    style={{ width: 90, marginRight:'10px' }}
                    placeholder="일"
                    options={dayOptions}
                    onChange={(value) => setSelectedDay(value)}
                />
                <Input
                  value={age}
                  disabled
                  suffix="세"
                  style={{ width: 90 }}
                />
            </div>
        </Form.Item>
        <Form.Item name="question">
                <div>아이디 찾기 질문</div>
                <Select
                    style={{ width: '400px'}}
                    placeholder="질문"
                    options={[
                      { value: '0', label: '인생에서 제일 행복했던 순간은 언제인가요?' },
                      { value: '1', label: '태어난 곳은 어디인가요?' },
                      { value: '2', label: '제일 좋아하는 음식은 무엇인가요?' },
                      { value: '3', label: '출신 초등학교는 어디인가요?' },
                      { value: '4', label: '좋아하는 캐릭터는 무엇인가요?' },
                    ]}
                    onChange={handleQuestionChange}
                />
            </Form.Item>

        <Form.Item name="answer" style={{ marginRight:'10px'}} >
                <div>답변</div>
                <Input 
                placeholder="답변"
                style={{width: 400}}
                spellCheck={false}
                onChange={handleAnswerChange}
                />
        </Form.Item>

      </Form>
    </div>  
  );
};

export default SignUpMain;
