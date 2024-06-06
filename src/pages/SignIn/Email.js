import React, { useState, useEffect } from 'react';
import { useMediaQuery } from 'react-responsive';
import style from './SignIn.module.css';
import { Button, Form, Input, Modal, Select, message } from 'antd';
import { useRecoilState } from 'recoil';
import { CiRead, CiUnread } from "react-icons/ci";
import { passwordStateAtom, emailStateAtom } from '../../recoil/atoms/register';

const Email = () => {
    const isDesktopOrLaptop = useMediaQuery({ minWidth: 992 });
    const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 991 });
    const isMobile = useMediaQuery({ maxWidth: 767 });
    const isNotMobile = useMediaQuery({ minWidth: 768 });

    const possible = /^[a-zA-Z0-9!@]+$/;

    const [form] = Form.useForm();
    const [email, setEmail] = useRecoilState(emailStateAtom);
    const [emailId, setEmailId] = useState('');
    const [selectedDomain, setSelectedDomain] = useState('');
    const [selectedYear, setSelectedYear] = useState(undefined);
    const [selectedMonth, setSelectedMonth] = useState(undefined);
    const [selectedDay, setSelectedDay] = useState(undefined);
    const [question, setQuestion] = useState(undefined);
    const [answer, setAnswer] = useState('');
    const [name, setName] = useState('');
    const [findidOpen, setFindidOpen] = useState(false);
    const [findpasswordOpen, setFindpasswordOpen] = useState(false);
    const [domainInputDisabled, setDomainInputDisabled] = useState(false);
    const [selectedbutton, setSelectedbutton] = useState(false);
    const [isCodeVerified, setIsCodeVerified] = useState(null);
    const [verificationCode, setVerificationCode] = useState('');
    const [remainingTime, setRemainingTime] = useState(180);
    const [showPassword, setShowPassword] = useState(false); // 비밀번호 보기 토글 상태
    const [showconfirmPassword, setShowconfirmPassword] = useState(false); // 비밀번호 보기 토글 상태
    const [password, setPassword] = useState('');
    const [passwordErrorMessage, setPasswordErrorMessage] = useState('');
    const [confirmPassword, setConfirmPassword] = useRecoilState(passwordStateAtom);
    const [passwordMatch, setPasswordMatch] = useState(null);
    const [foundEmail, setFoundEmail] = useState(''); // Added state for storing the found email
    const [noMemberFound, setNoMemberFound] = useState(false); // 일치하는 회원이 없을 경우를 처리하기 위한 상태 변수

    const handleInputChange = (e) => {
        setEmailId(e.target.value);
        setEmail(`${e.target.value}@${selectedDomain}`);
    };

    const handleDomainInputChange = (e) => {
        setSelectedDomain(e.target.value);
        setEmail(`${emailId}@${e.target.value}`);
    };

    const handleDomainChange = (value) => {
        if (value === 'type') {
            setSelectedDomain('');
            setDomainInputDisabled(false);
        } else {
            setSelectedDomain(value);
            setDomainInputDisabled(true);
        }
        setEmail(`${emailId}@${value}`);
    };

    const handleSendVerificationCode = () => {
        setSelectedbutton(true);
        setRemainingTime(180);
        // Send the verification code logic here
    };

    const handleVerifyCode = () => {
        // Verification logic here
        setIsCodeVerified(true);
    };

    const handleNameChange = (e) => {
        setName(e.target.value);
    }

    const handleQuestionChange = (newValue) => {
        setQuestion(newValue);
    }

    const handleAnswerChange = (e) => {
        setAnswer(e.target.value);
    }

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

    const monthDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    const generateDayOptions = (selectedMonth) => {
        const daysInMonth = monthDays[selectedMonth - 1];
        return Array.from({ length: daysInMonth }, (_, index) => {
            const dayNumber = (index + 1).toString().padStart(2, '0');
            return { value: dayNumber, label: `${dayNumber}일` };
        });
    };

    const [dayOptions, setDayOptions] = useState(generateDayOptions(selectedMonth));

    const findId = () => {
        setFindidOpen(true);
    }

    const findPassword = () => {
        setFindpasswordOpen(true);
    }

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

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const toggleconfirmPasswordVisibility = () => {
        setShowconfirmPassword(!showconfirmPassword);
    };

    const handleOk = () => {
        if (findidOpen) {
            // 예시로 회원 정보가 일치하지 않는 경우를 처리합니다. 실제 로직에 맞게 수정 필요
            if (name !== '예상되는 이름' || selectedYear !== '예상되는 출생년도' || selectedMonth !== '예상되는 월' || selectedDay !== '예상되는 일' || question !== '예상되는 질문' || answer !== '예상되는 답변') {
                setFoundEmail('');
                setNoMemberFound(true); // 일치하는 회원이 없을 경우 상태 업데이트
            } else {
                setFoundEmail('example@example.com');
                setNoMemberFound(false); // 일치하는 회원이 있는 경우 상태 업데이트
            }
        }
        if (findpasswordOpen && isCodeVerified && password && confirmPassword && passwordMatch) {
            message.success('비밀번호가 변경되었습니다.');
            setFindpasswordOpen(false);
        }
    };

    const handleCancel = () => {
        setFindidOpen(false);
        setFindpasswordOpen(false);
    };

    // Reset form fields when modal is closed
    useEffect(() => {
        if (!findidOpen) {
            setName('');
            setSelectedYear(undefined);
            setSelectedMonth(undefined);
            setSelectedDay(undefined);
            setQuestion(undefined);
            setAnswer('');
            setFoundEmail('');
            setNoMemberFound(false); // 모달이 닫힐 때 상태 초기화
        }
    }, [findidOpen]);

    useEffect(() => {
        if (!findpasswordOpen) {
            setEmailId('');
            setSelectedDomain('');
            setDomainInputDisabled(false);
            setSelectedbutton(false);
            setIsCodeVerified(null);
            setVerificationCode('');
            setPassword('');
            setPasswordErrorMessage('');
            setConfirmPassword('');
            setPasswordMatch(null);
        }
    }, [findpasswordOpen]);

    return (
        <div>
            <div className={style.flex}>
                <div className={style.link} onClick={findId}>
                    아이디 찾기
                </div>
                <span style={{ opacity: '0.3' }}> | </span>
                <div className={style.link} onClick={findPassword}>
                    비밀번호 찾기
                </div>
            </div>

            <Modal
                title="아이디 찾기"
                open={findidOpen}
                onOk={handleOk}
                onCancel={handleCancel}
                okText="찾기"
                cancelText="취소"
            >
                <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                    <div style={{ marginTop: '20px', width: '100%' }}>이름</div>
                    <div className={style.horizon}>
                        <Input
                            placeholder="이름"
                            value={name}
                            spellCheck={false}
                            onChange={handleNameChange}
                            style={{ width: '470px', marginBottom: '25px' }}
                        />
                    </div>
                    <Form.Item name="birthdate" style={{ width: '100%' }}>
                        <div>생년월일</div>
                        <div className={style.horizon}>
                            <Select
                                style={{ width: '33%', marginRight: '10px' }}
                                placeholder="출생년도"
                                options={generateYearOptions()}
                                onChange={(value) => setSelectedYear(value)}
                                value={selectedYear}
                            />
                            <Select
                                style={{ width: '33%', marginRight: '10px' }}
                                placeholder="월"
                                options={generateMonthOptions()}
                                onChange={handleMonthChange}
                                value={selectedMonth}
                            />
                            <Select
                                style={{ width: '33%' }}
                                placeholder="일"
                                options={dayOptions}
                                onChange={(value) => setSelectedDay(value)}
                                value={selectedDay}
                            />
                        </div>
                    </Form.Item>

                    <Form.Item name="question" style={{ width: '100%' }}>
                        <div>아이디 찾기 질문</div>
                        <Select
                            style={{ width: '100%' }}
                            placeholder="질문"
                            options={[
                                { value: '0', label: '인생에서 제일 행복했던 순간은 언제인가요?' },
                                { value: '1', label: '태어난 곳은 어디인가요?' },
                                { value: '2', label: '제일 좋아하는 음식은 무엇인가요?' },
                                { value: '3', label: '출신 초등학교는 어디인가요?' },
                                { value: '4', label: '좋아하는 캐릭터는 무엇인가요?' },
                            ]}
                            onChange={handleQuestionChange}
                            value={question}
                        />
                    </Form.Item>

                    <Form.Item name="answer" style={{ width: '100%' }}>
                        <div>답변</div>
                        <Input
                            placeholder="답변"
                            style={{ width: '100%' }}
                            spellCheck={false}
                            onChange={handleAnswerChange}
                            value={answer}
                        />
                    </Form.Item>

                    {noMemberFound && (
                        <div style={{ color: 'red', marginTop: '20px'}}>
                           해당 정보와 일치하는 회원이 없습니다.
                        </div>
                    )}

                    {foundEmail && (
                        <div style={{ display: 'flex', marginTop: '20px'}}>
                           회원님의 이메일: <span style={{color:'#68568E', marginLeft:'10px'}}>{foundEmail}</span>
                        </div>
                    )}
                </div>
            </Modal>

            <Modal
                title="비밀번호 변경"
                open={findpasswordOpen}
                onOk={handleOk}
                onCancel={handleCancel}
                okText="변경"
                cancelText="취소"
            >
                <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                    <Form.Item name="email" style={{ width: '100%' }}>
                        <div style={{ marginTop: '20px' }}>이메일</div>
                        <div className={style.horizon}>
                            <Input.Group compact style={{ width: '100%' }}>
                                <Input
                                    placeholder="이메일"
                                    value={emailId}
                                    spellCheck={false}
                                    onChange={handleInputChange}
                                    style={{ width: '30%' }}
                                />
                                <Input
                                    style={{ width: '8%', textAlign: 'center' }}
                                    value="@"
                                    disabled
                                />
                                <Input
                                    style={{ width: '31%' }}
                                    placeholder={domainInputDisabled ? '' : '직접 입력'}
                                    value={selectedDomain || ''}
                                    disabled={domainInputDisabled}
                                    onChange={handleDomainInputChange}
                                />
                                <Select
                                    style={{ width: '31%' }}
                                    onChange={handleDomainChange}
                                    value={domainInputDisabled ? selectedDomain : 'type'}
                                >
                                    <Select.Option value="type">직접 입력</Select.Option>
                                    <Select.Option value="yiu.ac.kr">yiu.ac.kr</Select.Option>
                                    <Select.Option value="naver.com">naver.com</Select.Option>
                                    <Select.Option value="google.com">google.com</Select.Option>
                                    <Select.Option value="nate.com">nate.com</Select.Option>
                                    <Select.Option value="kakao.com">kakao.com</Select.Option>
                                </Select>
                            </Input.Group>
                        </div>
                        {!selectedbutton && (
                            <Button
                                type="primary"
                                htmlType="submit"
                                className={style.check_button}
                                style={{ marginTop: '10px', display: 'flex', justifyContent: 'flex-end' }}
                                onClick={handleSendVerificationCode}
                            >
                                인증 번호 전송
                            </Button>
                        )}
                        {isCodeVerified && <div style={{ color: 'blue', marginTop: '5px' }}>인증 완료</div>}
                    </Form.Item>

                    <Form.Item
                        name="verificationCode"
                        style={{ width: '100%', display: selectedbutton && !isCodeVerified ? 'block' : 'none' }}
                    >
                        <div>인증 번호</div>
                        <div className={style.horizon} style={{ display: 'flex', alignItems: 'center' }}>
                            <Input
                                placeholder="인증번호"
                                value={verificationCode}
                                style={{ maxWidth: '100px', maxHeight: '30px' }}
                                onChange={(e) => setVerificationCode(e.target.value)}
                            />
                            <Button
                                type="primary"
                                htmlType="submit"
                                className={style.check_button}
                                style={{ marginLeft: '15px' }}
                                onClick={verificationCode ? handleVerifyCode : handleSendVerificationCode}
                            >
                                {verificationCode ? '인증 번호 확인' : '인증 번호 재전송'}
                            </Button>
                        </div>
                        <div style={{ height: '10px' }}>
                            {isCodeVerified === false && <div style={{ color: 'red' }}>인증번호가 틀렸습니다</div>}
                        </div>
                    </Form.Item>

                    {isCodeVerified && (<div> <Form.Item name="password">
                        <div>새 비밀번호</div>
                        <Input type={showPassword ? "text" : "password"} placeholder="비밀번호" style={{ maxHeight: '32px', width: '470px' }}
                            suffix={ // 비밀번호 보이기/가리기 아이콘
                                <Button
                                    type="text"
                                    icon={showPassword ? <CiRead /> : <CiUnread />}
                                    onClick={togglePasswordVisibility}
                                />}
                            onChange={handlePasswordChange} />
                        <div style={{ height: '0px' }}>
                            {passwordErrorMessage && <div className={style.error}>{passwordErrorMessage}</div>}
                        </div>
                    </Form.Item>

                        <Form.Item name="confirmPassword" dependencies={['password']}>
                            <div>새 비밀번호 확인</div>
                            <div className={style.horizon}>
                                <Input type={showconfirmPassword ? "text" : "password"} placeholder="비밀번호 확인" style={{ maxHeight: '32px', width: '470px' }}
                                    suffix={ // 비밀번호 보이기/가리기 아이콘
                                        <Button
                                            type="text"
                                            icon={showconfirmPassword ? <CiRead /> : <CiUnread />}
                                            onClick={toggleconfirmPasswordVisibility}
                                        />} onChange={handleConfirmPasswordChange} disabled={password === '' || !password || passwordErrorMessage} />
                            </div>
                            <div style={{ height: '0px' }}>
                                {passwordMatch === true && <div className={style.complete}>비밀번호 확인 완료</div>}
                                {passwordMatch === false && <div className={style.error}>비밀번호가 다릅니다.</div>}
                            </div>
                        </Form.Item> </div>)}
                </div>
            </Modal>
        </div>
    );
};

export default Email;
