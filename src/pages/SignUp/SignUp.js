import React, { useState, useEffect } from 'react';
import { useMediaQuery } from "react-responsive";
import { useNavigate } from "react-router-dom";
import style from "./SignUp.module.css";
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input } from 'antd';
import PWDCheckBox from "../../components/CheckBox/PWDCheckBox";
import { CiRead, CiUnread } from "react-icons/ci";
import LogoTitle_Login from '../../components/Group/LOGO/LogoTitle_Login';
import { RecoilRoot, atom, useRecoilState } from 'recoil';
import pageState from "../../recoil/atoms/login";
import { Select } from 'antd';
import { AutoComplete } from 'antd';
import { data_location } from '../../assets/data/location';
import { data_subject } from '../../assets/data/subject';
import { data_id } from '../../assets/data/id';

const SignInPage = () => {
  // 반응형 화면
  const isDesktopOrLaptop = useMediaQuery({ minWidth: 992 });
  const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 991 });
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const isNotMobile = useMediaQuery({ minWidth: 768 });

  // 페이지 이동
  const navigate = useNavigate();
  const { Option } = Select;
  
  const [showPassword, setShowPassword] = useState(false); // 비밀번호 보기 토글 상태
  
  const [selectedRole, setSelectedRole] = useState("student"); // 선택된 역할 상태 추가
  const [page, setPage] = useRecoilState(pageState); // Recoil로 페이지 상태 사용

  const possible = /^[a-zA-Z0-9!@]+$/;
  const [idErrorMessage, setIdErrorMessage] = useState(''); // 아이디 오류 메시지 상태
  const [passwordErrorMessage, setPasswordErrorMessage] = useState(''); // 비밀번호 오류 메시지 상태

  const [Id, setId] = useState('');
  const [Idduplication, setIdduplication] = useState(null);

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordMatch, setPasswordMatch] = useState(null);

  const [email, setEmail] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [selectedbutton, setSelectedButton] = useState(false);
  const [isCodeVerified, setIsCodeVerified] = useState(null);
  const [remainingTime, setRemainingTime] = useState(180);
  const [timerId, setTimerId] = useState(null);

  const [minAmount, setMinAmount] = useState('');
  const [maxAmount, setMaxAmount] = useState('');

  const handleIdChange = (e) => {
    const value = e.target.value;
    if (value === '' || possible.test(value)) { // 정규식에 맞는지 확인
      setId(value);
      setIdErrorMessage(''); // 오류 메시지 초기화
    } else {
      // 오류 메시지 설정
      setIdErrorMessage('아이디에는 영문자, 숫자, !, @만 입력 가능합니다.');
    }
  };

  const handleId = () => {
    const isDuplicate = data_id.includes(Id); // data_id 배열에 Id가 포함되어 있는지 확인
    setIdduplication(isDuplicate); // 중복 여부 상태 설정
  }

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    if (value === '' || possible.test(value)) { // 정규식에 맞는지 확인
      if (value.length >= 8) { // 최소 8글자 이상인지 확인
        setPassword(value);
        setPasswordErrorMessage(''); // 오류 메시지 초기화
      } else {
        // 오류 메시지 설정
        setPasswordErrorMessage('비밀번호는 최소 8글자 이상이어야 합니다.');
      }
    } else {
      // 오류 메시지 설정
      setPasswordErrorMessage('특수 기호는 !, @만 입력 가능합니다.');
    }
    
  };
  
  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  const handlePassword = () => {
    if (password === confirmPassword) {
      setPasswordMatch(true);
    } else {
      setPasswordMatch(false);
    }
  };
  
  const handleSendVerificationCode = async () => {
    setSelectedButton(true);
    setRemainingTime(180);
    try {
      // 여기에 이메일 전송 API 호출 등의 로직을 구현합니다.
      // 이메일을 서버로 전송하고 서버에서 인증 번호를 생성하여 이메일로 보내는 등의 작업을 수행합니다.
      // 서버로부터 인증 번호를 성공적으로 전송받으면 화면에 메시지를 표시하거나 다른 처리를 수행합니다.
    } catch (error) {
      console.error('인증 번호 전송 실패:', error);
      // 실패한 경우에 대한 처리를 여기에 추가합니다.
    }
  };

  useEffect(() => {
    if (selectedbutton) {
      // 1초마다 remainingTime을 감소시키는 타이머 설정
      const newTimerId = setInterval(() => {
        setRemainingTime(prevTime => prevTime - 1);
      }, 1000);
      setTimerId(newTimerId);
    }
    return () => clearInterval(timerId); // 컴포넌트가 unmount될 때 타이머 제거
  }, [selectedbutton]);

  useEffect(() => {
    // 남은 시간이 0이 되면 인증번호 입력 폼 숨김
    if (remainingTime === 0) {
      setSelectedButton(false);
    }
  }, [remainingTime]);

  const handleVerifyCode = () => {
    // 사용자가 입력한 인증 번호와 서버로부터 받은 인증 번호를 비교하여 일치 여부를 확인하는 로직을 구현합니다.
    // 일치할 경우에는 isCodeVerified 상태를 true로 업데이트합니다.
    setIsCodeVerified(true); // 임시로 true로 설정합니다. 실제 로직은 여기에 구현되어야 합니다.
    clearInterval(timerId);
  };

  // 쉼표를 포함하여 천 단위로 숫자 포맷팅하는 함수
  const formatNumberWithCommas = (number) => {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  };

  // 최소 금액 입력 필드 값이 변경될 때 실행되는 핸들러
  const handleMinAmountChange = (e) => {
    const inputValue = e.target.value.replace(/\D/g, ''); // 숫자가 아닌 문자 제거
    setMinAmount(formatNumberWithCommas(inputValue));
  };

  // 최대 금액 입력 필드 값이 변경될 때 실행되는 핸들러
  const handleMaxAmountChange = (e) => {
    const inputValue = e.target.value.replace(/\D/g, ''); // 숫자가 아닌 문자 제거
    setMaxAmount(formatNumberWithCommas(inputValue));
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleRoleSelection = (role) => {
    setSelectedRole(role);

    setId('');
    setIdduplication(null);
    setPassword('');
    setConfirmPassword('');
    setPasswordMatch(null);
    setEmail('');
    setVerificationCode('');
    setSelectedButton(false);
    setIsCodeVerified(null);
    setRemainingTime(180);
    clearInterval(timerId);
    setTimerId(null);
    setMinAmount('');
    setMaxAmount('');
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
      <div className={style.register}>
        <div>
          {/* <img src={LOGO} alt="logo" style={{ width: '200px', height: '200px', display:'flex', justifyContent:'center', marginLeft:'100px', marginBottom:'-30px' }}/> */}
          <div className={style.head}>
            회원가입
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
              >
                <div>아이디</div>
                  <div className={style.horizon}>
                    <Input placeholder="아이디" onChange={handleIdChange}/>
                    <Button type="primary" htmlType="submit" className={style.check_button} onClick={handleId}> 
                    아이디 중복 확인
                    </Button>
                  </div>
                  {idErrorMessage && <div style={{ color: 'red' }}>{idErrorMessage}</div>}
                  {Idduplication === true && <div style={{ color: 'red' }}>아이디 중복</div>}
                  {Idduplication === false && <div style={{ color: 'blue' }}>아이디 사용 가능</div>}
              </Form.Item>
              <Form.Item
                name="password"
              >
                <div>비밀번호</div>
                <Input type="password" placeholder="비밀번호" onChange={handlePasswordChange}/>
                {passwordErrorMessage && <div style={{ color: 'red' }}>{passwordErrorMessage}</div>}
              </Form.Item>
              <Form.Item
                name="confirmPassword"
                dependencies={['password']}
              >
                <div>비밀번호확인</div>
                  <div className={style.horizon}>
                    <Input type="password" placeholder="비밀번호 확인" onChange={handleConfirmPasswordChange}/>
                    <Button type="primary" htmlType="submit" className={style.check_button} onClick={handlePassword}> 
                    비밀번호 확인하기
                    </Button>
                  </div>
                  {passwordMatch === true && <div style={{ color: 'blue' }}>비밀번호 확인 완료</div>}
                  {passwordMatch === false && <div style={{ color: 'red' }}>비밀번호가 다릅니다.</div>}
              </Form.Item>
              <Form.Item
                name="email"
              >
                <div>이메일</div>
                <div className={style.horizon}>
                  <Input placeholder="이메일" value={email} onChange={(e) => setEmail(e.target.value)}/>
                  <Button type="primary" htmlType="submit" className={style.check_button} onClick={handleSendVerificationCode}> 
                      인증 번호 전송
                  </Button>
                </div>
                {isCodeVerified === true && <div style={{ color: 'blue' }}>인증 완료</div>}
              </Form.Item>
              <Form.Item
                name="verificationCode"
                style={{ display: selectedbutton === true && !isCodeVerified ? 'block' : 'none' }} // 인증번호가 확인되면 숨김 처리
              >
                <div>인증 번호</div>
                <div className={style.horizon}>
                  <Input placeholder="인증번호" value={verificationCode} onChange={(e) => setVerificationCode(e.target.value)}/>
                  <Button type="primary" htmlType="submit" className={style.check_button} onClick={handleVerifyCode}> 
                      인증 번호 확인
                  </Button>
                </div>
                {selectedbutton && !isCodeVerified && (
                  <div>남은 시간: {Math.floor(remainingTime / 60)}분 {remainingTime % 60}초</div>
                )}
                {isCodeVerified === false && <div style={{ color: 'red' }}>인증번호가 틀렸습니다</div>}
              </Form.Item>
              <Form.Item
                name="name"
              >
                <div className={style.flex}>
                  <div>
                    <div>이름</div>
                    <Input placeholder="이름"/>
                  </div>
                  <div>
                    <div>닉네임</div>
                    <Input placeholder="닉네임"/>
                  </div>
                </div>
              </Form.Item>
              <Form.Item
                name="gender"
              >
                <div className={style.flex}>
                  <div>
                    <div>성별</div>
                    <Select
                      style={{ width: 180 }}
                      placeholder="성별"
                      filterOption={(input, option) => (option?.label ?? '').includes(input)}
                      filterSort={(optionA, optionB) =>
                        (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                      }
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
                    />
                  </div>
                  <div>
                    <div>과외방식</div>
                    <Select
                      style={{ width: 180 }}
                      placeholder="과외 방식"
                      filterOption={(input, option) => (option?.label ?? '').includes(input)}
                      filterSort={(optionA, optionB) =>
                        (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                      }
                      options={[
                        {
                          value: '0',
                          label: '비대면',
                        },
                        {
                          value: '1',
                          label: '대면',
                        },
                        {
                          value: '2',
                          label: '블렌딩',
                        }
                      ]}
                    />
                  </div>
                </div>
              </Form.Item>
              <Form.Item
                name="location"
              >
                <div className={style.flex}>
                  <div>
                    <div>지역</div>
                    <Select
                        showSearch
                        style={{ width: 180 }}
                        placeholder="지역"
                        filterOption={(input, option) =>
                            (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                        }
                        filterSort={(optionA, optionB) =>
                            (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                        }
                    >
                        {data_location.map((location, index) => (
                            <Option key={index} value={index.toString()} label={location}>
                                {location}
                            </Option>
                        ))}
                    </Select>

                  </div>
                  <div>
                    <div>과목</div>
                    <Select
                        showSearch
                        style={{ width: 180 }}
                        placeholder="과목"
                        filterOption={(input, option) =>
                            (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                        }
                        filterSort={(optionA, optionB) =>
                            (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                        }
                    >
                        {data_subject.map((subject, index) => (
                            <Option key={index} value={index.toString()} label={subject}>
                                {subject}
                            </Option>
                        ))}
                    </Select>
                  </div>
                </div>
              </Form.Item>
              <Form.Item
                name="fee"
              >
                <div>과외비</div>
                <div className={style.horizon}>
                  <Input.Group compact>
                    <Input
                      style={{ width: 'calc(50% - 16px)' }}
                      type="text"
                      placeholder="최소 금액"
                      suffix="원"
                      value={minAmount}
                      onChange={handleMinAmountChange}
                    />
                    <Input
                      style={{ width: '32px', textAlign: 'center' }}
                      placeholder="~"
                      disabled
                    />
                    <Input
                      style={{ width: 'calc(50% - 16px)' }}
                      type="text"
                      placeholder="최대 금액"
                      suffix="원"
                      value={maxAmount}
                      onChange={handleMaxAmountChange}
                    />
                  </Input.Group>
                </div>
              </Form.Item>
              <Form.Item>
                <Button type="primary" htmlType="submit" className={style.form_button}>
                  가입하기
                </Button>
              </Form.Item>
            </Form>
          </div>    
        </div>
      </div>
    </div>
  );
};

export default SignInPage;
