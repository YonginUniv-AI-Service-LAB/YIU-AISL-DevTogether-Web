import React, { useState, useEffect } from 'react';
import style from "./SignUp.module.css";
import { Button, Form, Input, Select } from 'antd';
import { useRecoilState } from 'recoil';
import { resetStateAtom, idStateAtom, passwordStateAtom, emailStateAtom } from '../../recoil/atoms/register';
import { data_id } from '../../assets/data/id';
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

      setReset(false); // 초기화 후 resetState를 다시 false로 설정
    }
  }, [resetState]);

  // 아이디 입력
  const handleIdChange = async (e) => {
    const value = e.target.value;
    
    if (value === '' || /^[a-zA-Z0-9]+$/.test(value)) {
      setId(value);
      setIdErrorMessage('');
      setIdError(false);

      if (value !== '') {
        if (value.length < 5 || value.length > 15) {
          setId('');
          setIdErrorMessage('아이디는 5글자 이상, 15글자 이하로 입력해주세요.');
          setIdError(true);
        } else if (!/[a-zA-Z]/.test(value) || !/\d/.test(value)) {
          setId('');
          setIdErrorMessage('아이디에는 최소 1개의 영문자와 숫자가 포함되어야 합니다.');
          setIdError(true);
        } else {
          const isDuplicate = data_id.includes(value);
          setIdduplication(isDuplicate);
          if (isDuplicate) {
            setId('');
            setIdErrorMessage('아이디 중복');
            setIdError(true);
          } else {
            setIdErrorMessage('');
          }
        }
      } else {
        setIdduplication(null);
      }
    } else {
      setId('')
      setIdErrorMessage('아이디에는 영문자, 숫자만 입력 가능합니다.');
      setIdError(true);
      setIdduplication(null);
    }
  };

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
      const response = await axios.post('https://api.example.com/send_verification_code', {
        email: email,
      });
      // 서버로부터의 응답 처리
      console.log('인증 번호 전송 성공:', response.data);
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

  const handleVerifyCode = () => {
    setIsCodeVerified(false); // 임시로 true로 설정합니다. 실제 로직은 여기에 구현되어야 합니다.
    // clearInterval(timerId);
  };

  return (
    <div style={{ marginTop: '40px' }}>
      <Form name="register_main" initialValues={{ remember: true }}>
      <Form.Item name="id">
          <div>아이디</div>
          <div className={style.horizon}>
            <Input type="ID" placeholder="아이디" spellCheck={false} onChange={handleIdChange}/>
          </div>
          <div style={{ height: '0px' }}>
            {idErrorMessage && <div style={{ color: 'red' }}>{idErrorMessage}</div>}
            {idError === false && idduplication === false && <div style={{ color: 'blue' }}>아이디 사용 가능</div>}
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
            {passwordErrorMessage && <div style={{ color: 'red' }}>{passwordErrorMessage}</div>}
          </div>
        </Form.Item>

        <Form.Item name="confirmPassword" dependencies={['password']}>
          <div>비밀번호 확인</div>
          <div className={style.horizon}>
            <Input type={showconfirmPassword ? "text" : "password"} placeholder="비밀번호 확인" style={{maxHeight:'32px'}}
            suffix={ // 비밀번호 보이기/가리기 아이콘
                    <Button
                      type="text"
                      icon={showconfirmPassword ? <CiRead /> : <CiUnread />}
                      onClick={toggleconfirmPasswordVisibility}
                    /> }onChange={handleConfirmPasswordChange} disabled={password === '' || !password || passwordErrorMessage}/>
          </div>
          <div style={{ height: '0px' }}>
            {passwordMatch === true && <div style={{ color: 'blue' }}>비밀번호 확인 완료</div>}
            {passwordMatch === false && <div style={{ color: 'red' }}>비밀번호가 다릅니다.</div>}
          </div>
        </Form.Item>

        <Form.Item name="email">
          <div>이메일</div>
          <div className={style.horizon}>
            <Input.Group compact>
              <Input
                placeholder="이메일"
                value={emailId}
                spellCheck={false}
                onChange={handleInputChange}
                style={{ width: 130 }}
              />
              <Input
                style={{ width: '40px', textAlign: 'center' }}
                value="@"
                disabled
              />
              <Input
                style={{ width: '100px' }}
                placeholder={selectedDomain ? '' : '직접 입력'}
                value={selectedDomain || ''}
                disabled={domainInputDisabled}
                onChange={handleDomainInputChange}
              />
            </Input.Group>
            <Select
              style={{ width: 'auto' }}
              onChange={handleDomainChange}
              defaultValue="type"
            >
              <Select.Option value="type">직접 입력</Select.Option>
              <Select.Option value="yiu.ac.kr">yiu.ac.kr</Select.Option>
              <Select.Option value="naver.com">naver.com</Select.Option>
              <Select.Option value="google.com">google.com</Select.Option>
              <Select.Option value="nate.com">nate.com</Select.Option>
              <Select.Option value="kakao.com">kakao.com</Select.Option>
            </Select>
          </div>
          {!selectedbutton &&
            <Button
            type="primary"
            htmlType="submit"
            className={style.check_button}
            style={{marginTop:'10px'}}
            onClick={handleSendVerificationCode}
            >
              인증 번호 전송
            </Button>}
          {isCodeVerified === true && <div style={{ color: 'blue', marginTop: '5px' }}>인증 완료</div>}
        </Form.Item>

        <Form.Item
          name="verificationCode"
          style={{ display: selectedbutton === true && !isCodeVerified ? 'block' : 'none' }} // 인증번호가 확인되면 숨김 처리
        >
          <div>인증 번호</div>
          <div className={style.horizon} style={{display:'flex', alignItems:'center' }}>
            <Input placeholder="인증번호" value={verificationCode} style={{maxWidth: '100px', maxHeight: '30px'}} onChange={(e) => setVerificationCode(e.target.value)} />
            <Button type="primary" htmlType="submit" className={style.check_button} style={{marginLeft:'15px'}} onClick={verificationCode ? handleVerifyCode : handleSendVerificationCode}>
              {verificationCode ? '인증 번호 확인' : '인증 번호 재전송'}
            </Button>
          </div>
          {selectedbutton && !isCodeVerified && (
            <div> {Math.floor(remainingTime / 60)}분 {remainingTime % 60}초</div>
          )}
          <div style={{height:'10px'}}>
          {isCodeVerified === false && <div style={{ color: 'red' }}>인증번호가 틀렸습니다</div>}
          </div>
        </Form.Item>
      </Form>
    </div>  
  );
};

export default SignUpMain;
