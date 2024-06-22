import React, { useState } from 'react';
import { Button, Form, Input, Select, Modal } from 'antd';
import style from './Modal.module.css';
import RegisterSelect from '../../../components/Select/RegisterSelect';
import { data_subject } from '../../../assets/data/subject';
import { data_location } from '../../../assets/data/location';
import { selectedgenderStateAtom, selectedsubjectStateAtom, selectedlocationStateAtom, selectedminageStateAtom, selectedmaxageStateAtom, selectedminfeeStateAtom, selectedmaxfeeStateAtom, selectedmethodStateAtom } from '../../../recoil/atoms/matchingAtom'; 
import { RecoilRoot, useRecoilState, useRecoilValue } from 'recoil';

const EntireModal = ({ isOpen, handleCancel, closeModal, applyFilter }) => {
  const [form] = Form.useForm(); // Form 인스턴스 생성
  const [Subjects, setSubjects] = useRecoilState(selectedsubjectStateAtom); // 선택된 과목을 관리하는 상태
  const [Locations, setLocations] = useRecoilState(selectedlocationStateAtom);
  const [Gender, setGender] = useRecoilState(selectedgenderStateAtom);
  const [MinAge, setMinAge] = useRecoilState(selectedminageStateAtom);
  const [MaxAge, setMaxAge] = useRecoilState(selectedmaxageStateAtom);
  const [Methods, setMethods] = useRecoilState(selectedmethodStateAtom);
  const [MinAmount, setMinAmount] = useRecoilState(selectedminfeeStateAtom);
  const [MaxAmount, setMaxAmount] = useRecoilState(selectedmaxfeeStateAtom);

  // 과목 선택 함수
  const handleSubjectChange = (newValue) => {
    setSubjects(newValue);
  };

  // 지역 선택 함수
  const handleLocationChange = (newValue) => {
    setLocations(newValue);
  };

  // 성별 선택 함수
  const handleGenderChange = (newValue) => {
    setGender(newValue);
  };

  // 최소 나이 입력 함수
  const handleMinAgeChange = (e) => {
    setMinAge(e.target.value);
  };

  // 최대 나이 입력 함수a
  const handleMaxAgeChange = (e) => {
    setMaxAge(e.target.value);
  };

  // 과외 방식 선택 함수
  const handleMethodChange = (newValue) => {
    setMethods(newValue);
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

  const handleApplyFilter = () => {
    closeModal();
  };

  const resetFilter = () => {
    setSubjects([]);
    setLocations([]);
    setGender([]);
    setMinAge('');
    setMaxAge('');
    setMethods([]);
    setMinAmount('');
    setMaxAmount('');
    applyFilter({}); // 모든 필터를 초기화하여 모든 프로필을 보여줌
    form.resetFields(); // 폼 필드를 초기화
  };

  return (
    <Modal
      title="필터 설정"
      visible={isOpen}
      onCancel={handleCancel}
      footer={[
        <Button key="reset" onClick={resetFilter}>
          초기화
        </Button>,
        <Button key="apply" type="primary" onClick={handleApplyFilter}>
          적용
        </Button>,
      ]}
    >
      <div>
        <div style={{marginTop:'50px'}}>
          <Form form={form} name="register_main" initialValues={{ remember: true }}>
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

            <div className={style.horizon}>
              <Form.Item name="gender">
                <div>성별</div>
                <RegisterSelect
                  style={{ width: '100px', marginRight: '15px' }}
                  placeholder="성별"
                  options={[
                    {
                      value: '남자',
                      label: '남자',
                    },
                    {
                      value: '여자',
                      label: '여자',
                    },
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
                    { value: '2', label: '블렌딩' },
                  ]}
                  style={{ width: '300px' }}
                  onChange={(newValue) => handleMethodChange(newValue)}
                />
              </Form.Item>
            </div>

            <div className={style.horizon}>
              <Form.Item name="age">
                <div>나이</div>
                <div className={style.horizon}>
                  <Input.Group compact>
                    <Input
                      style={{ width: '100px' }}
                      type="text"
                      placeholder="최소"
                      suffix="세"
                      value={MinAge}
                      onChange={handleMinAgeChange}
                    />
                    <Input
                      style={{ width: '32px', textAlign: 'center' }}
                      placeholder="~"
                      disabled
                    />
                    <Input
                      style={{ width: '100px' }}
                      type="text"
                      placeholder="최대"
                      suffix="세"
                      value={MaxAge}
                      onChange={handleMaxAgeChange}
                    />
                  </Input.Group>
                </div>
              </Form.Item>

              <Form.Item name="fee">
                <div>과외비</div>
                <div className={style.horizon}>
                  <Input.Group compact>
                    <Input
                      style={{ width: '100px' }}
                      type="text"
                      placeholder="최소"
                      suffix="원"
                      value={MinAmount}
                      onChange={handleMinAmountChange}
                    />
                    <Input
                      style={{ width: '32px', textAlign: 'center' }}
                      placeholder="~"
                      disabled
                    />
                    <Input
                      style={{ width: '100px' }}
                      type="text"
                      placeholder="최대"
                      suffix="원"
                      value={MaxAmount}
                      onChange={handleMaxAmountChange}
                    />
                  </Input.Group>
                </div>
              </Form.Item>
            </div>
          </Form>
        </div>
      </div>
    </Modal>
  );
};

export default EntireModal;