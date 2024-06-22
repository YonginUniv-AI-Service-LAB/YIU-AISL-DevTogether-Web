import React, { useState, useEffect } from 'react';
import style from "./SignUp.module.css";
import { Button, Form, Input } from 'antd';
import { RecoilRoot, atom, useRecoilState } from 'recoil';
import { resetStateAtom, nameStateAtom, nicknameStateAtom, genderStateAtom, methodStateAtom, ageStateAtom, 
  locationStateAtom, subjectStateAtom, minfeeStateAtom, maxfeeStateAtom } from '../../recoil/atoms/register';
import { Select, Tag } from 'antd';
import RegisterSelect from '../../components/Select/RegisterSelect';
import { AutoComplete } from 'antd';
import { data_location } from '../../assets/data/location';
import { data_subject } from '../../assets/data/subject';


const SignUpSub = ({ resetState }) => {

  const [reset, setReset] = useRecoilState(resetStateAtom);
  const [nameErrorMessage, setNameErrorMessage] = useState('');
  const [nicknameErrorMessage, setNicknameErrorMessage] = useState('');

  const [name, setName] = useRecoilState(nameStateAtom);
  const [nickname, setNickname] = useRecoilState(nicknameStateAtom);
  const [gender, setGender] = useRecoilState(genderStateAtom);

  const [selectedYear, setSelectedYear] = useState('');
  const [selectedMonth, setSelectedMonth] = useState('');
  const [selectedDay, setSelectedDay] = useState('');
  const [age, setAge] = useRecoilState(ageStateAtom);

  const [selectedSubject, setSelectedSubject] = useRecoilState(subjectStateAtom);
  const [selectedLocation, setSelectedLocation] = useRecoilState(locationStateAtom);
  const [selectedMethod, setSelectedMethod] = useRecoilState(methodStateAtom);

  const [minAmount, setMinAmount] = useRecoilState(minfeeStateAtom);
  const [maxAmount, setMaxAmount] = useRecoilState(maxfeeStateAtom);

  useEffect(() => {
    if (resetState) {
      setNameErrorMessage('');
      setNicknameErrorMessage('');
      setSelectedYear('');
      setSelectedMonth('');
      setSelectedDay('');
      setSelectedSubject(null);
      setSelectedLocation(null);
      setSelectedMethod(null);
      setMinAmount('');
      setMaxAmount('');

      setReset(false); // 초기화 후 resetState를 다시 false로 설정
    }
  }, [resetState]);

  // 생년월일 출생년도
  const generateYearOptions = () => {
    const currentYear = new Date().getFullYear();
    const startYear = 1940;
    const endYear = currentYear - 0; 
  
    const options = [];
    for (let year = endYear; year >= startYear; year--) {
      options.push({ value: year.toString(), label: `${year.toString()}년` });
    }
  
    return options;
  };

  // 생년월일 월
  const generateMonthOptions = () => {
    return Array.from({ length: 12 }, (_, index) => {
      const monthNumber = (index + 1).toString().padStart(2, '0');
      return { value: monthNumber, label: `${monthNumber}월` };
    });
  };

  const handleMonthChange = (newValue) => {
    setSelectedMonth(newValue);
    // 선택된 월에 따라 일수 옵션 업데이트
    setDayOptions(generateDayOptions(newValue));
  };
  

  // 생년월일 일
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
      // 생일이 지났는지 체크
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
        }
    } else {
        setNicknameErrorMessage('한/영, 숫자만 입력 가능합니다.');
        setNickname('');
    }
};

  // 성별 선택 함수
  const handleGenderChange = (newValue) => {
    setGender(newValue);
  }

  // 과목 선택 함수
  const handleSubjectChange = (newValue) => {
    setSelectedSubject(newValue);
  }

  // 지역 선택 함수
  const handleLocationChange = (newValue) => {
    setSelectedLocation(newValue);
  }

  // 과외 방식 선택 함수
  const handleMethodChange = (newValue) => {
    setSelectedMethod(newValue);
  }

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

  


  return (
    <Form
        name="register_sub"
        initialValues={{
          remember: true,
        }}
    >
        <div className={style.horizon}>
            <Form.Item name="name" style={{marginRight:'15px'}}>
                <div>이름</div>
                <Input placeholder="이름" style={{ width: 150}} onChange={handleNameChange}/>
                <div style={{ height: '0px' }}>
                  {nameErrorMessage && <div style={{ color: 'red' }}>{nameErrorMessage}</div>}
                </div>
            </Form.Item>

            <Form.Item name="nickname" style={{ marginRight:'15px'}} >
                <div>닉네임</div>
                <Input 
                placeholder="닉네임"
                maxLength={12}
                style={{width: 210}}
                spellCheck={false}
                onChange={handleNicknameChange}
                />
                <div style={{ height: '0px' }}>
                  {nicknameErrorMessage && <div style={{ color: 'red' }}>{nicknameErrorMessage}</div>}
                </div>
            </Form.Item>
        </div>

        <div className={style.horizon}>
          <Form.Item name="gender">
                <div>성별</div>
                <Select
                    style={{ width: '100px', marginRight: '15px' }}
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
            <Form.Item name="method">
                <div>과외 방식</div>
                <RegisterSelect
                    placeholder="과외 방식"
                    options={[
                        { value: '0', label: '대면' },
                        { value: '1', label: '비대면' },
                        { value: '2', label: '블렌딩' }
                    ]}
                    onChange={(newValue) => handleMethodChange(newValue)}
                />
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
                    style={{ width: 80, marginRight:'10px' }}
                    placeholder="월"
                    options={generateMonthOptions()}
                    onChange={handleMonthChange}
                />
                <Select
                    style={{ width: 80, marginRight:'10px' }}
                    placeholder="일"
                    options={dayOptions}
                    onChange={(value) => setSelectedDay(value)}
                />
                <Input
                  value={age}
                  disabled
                  suffix="세"
                  style={{ width: 60 }}
                />
            </div>
        </Form.Item>

        <Form.Item name="location">
            <div>지역</div>
            <RegisterSelect
              placeholder="지역 (최대 3개)"
              filterOption={(input, option) =>
                (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
              }
              filterSort={(optionA, optionB) =>
                (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
              }
              options={data_location.map((location) => ({
                value: location, 
                label: location,
              }))}
              onChange={(newValue) => handleLocationChange(newValue)}
              maxTags={3}
            />
        </Form.Item>

        <Form.Item name="subject">
            <div>과목</div>
            <RegisterSelect
              placeholder="과목 (최대 5개)"
              filterOption={(input, option) =>
                (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
              }
              filterSort={(optionA, optionB) =>
                (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
              }
              options={data_subject.map((subject, index) => ({
                value: subject, 
                label: subject,
              }))}
              onChange={(newValue) => handleSubjectChange(newValue)}
              maxTags={5}
            />
        </Form.Item>

        <Form.Item name="fee">
            <div>과외비</div>
            <div className={style.horizon}>
                <Input.Group compact>
                    <Input
                    style={{ width: '130px' }}
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
                    style={{ width: '130px' }}
                    type="text"
                    placeholder="최대 금액"
                    suffix="원"
                    value={maxAmount}
                    onChange={handleMaxAmountChange}
                    />
                 </Input.Group>
              </div> 
        </Form.Item>
    </Form>         
  );
};

export default SignUpSub;
