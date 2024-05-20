import React, { useState, useEffect  } from 'react';
import { useMediaQuery } from "react-responsive";
import style from "./SignIn.module.css";
import { Button, Checkbox, Form, Input, Modal, Select } from 'antd';
import { RecoilRoot, atom, useRecoilState } from 'recoil';
import { emailStateAtom } from '../../recoil/atoms/register';


const Email = () => {
    // 반응형 화면
    const isDesktopOrLaptop = useMediaQuery({ minWidth: 992 });
    const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 991 });
    const isMobile = useMediaQuery({ maxWidth: 767 });
    const isNotMobile = useMediaQuery({ minWidth: 768 });
  
    // 페이지 이동
    const [form] = Form.useForm();
    const [email, setEmail] = useRecoilState(emailStateAtom);
    const [emailId, setEmailId] = useState('');
    const [selectedDomain, setSelectedDomain] = useState('');
    const [domainInputDisabled, setDomainInputDisabled] = useState(false);

    const [findidopen, setFindidOpen] = useState(false);
  const [findpasswordopen, setFindpasswordOpen] = useState(false);
  
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
  
    const findId = () => {
      setFindidOpen(true)
    }
  
    const findPassword = () => {
      setFindpasswordOpen(true)
    }
  
    const handleOk = (e) => {
      console.log(e);
      setFindidOpen(false);
    };
    const handleCancel = (e) => {
      console.log(e);
      setFindidOpen(false);
    };
  
  
    return (
           <div>
                <div className={style.flex}>
                  <div className={style.link} onClick={findId}>
                    아이디 찾기
                  </div>
                  <span style={{ opacity: '0.3'}}> | </span>
                  <div className={style.link} onClick={findPassword}>
                    비밀번호 찾기
                  </div>
                </div>
  
                <Modal
                  title="아이디 찾기"
                  open={findidopen}
                  onOk={handleOk}
                  onCancel={handleCancel}
                  okButtonProps={{
                    disabled: true,
                  }}
                  cancelButtonProps={{
                    disabled: true,
                  }}
                >
                  <div>
                    <div>회원정보에 등록하신 이메일로 인증</div>
                    <div></div>
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
                  </div>
                </Modal>
            </div>    
    );
  };
  
  export default Email;