import React, { useState } from "react";
import style from "./UserInfo.module.css";
import { useMediaQuery } from "react-responsive";
import { useNavigate } from "react-router-dom";
import { data_mentee } from '../../assets/data/mentee';
import Usersidebar from '../../components/Group/Sidebar/Usersidebar';
import { BiSolidEditAlt } from "react-icons/bi";
import FilterButton from "../../components/Button/FilterButton";
import { Select, Input } from 'antd';
import EditSelect from "../../components/Select/EditSelect";
import { data_location } from "../../assets/data/location";
import { data_subject } from "../../assets/data/subject";
import ImgUpload from "../../components/Upload/ImgUpload";

const UserInfo = () => {
  const isDesktopOrLaptop = useMediaQuery({ minWidth: 992 });
  const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 991 });
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const isNotMobile = useMediaQuery({ minWidth: 768 });

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(data_mentee[2]);
  const [page, setPage] = useState('');

  const [name, setName] = useState('');
  const [nicknameErrorMessage, setNicknameErrorMessage] = useState('');
  const [img, setImg] = useState('')
  const [introduction, setIntroduction] = useState('');

  const [selectedSubject, setSelectedSubject] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');
  const [selectedMethod, setSelectedMethod] = useState('');

  const [minAmount, setMinAmount] = useState('');
  const [maxAmount, setMaxAmount] = useState('');
 
  const navigate = useNavigate();

  const handleEditClick = () => {
    setName(formData.name);
    setImg(formData.img)
    setIntroduction(formData.introduction);
    setSelectedSubject(formData.subject);
    setSelectedLocation(formData.location1);
    setSelectedMethod(formData.method);
    setMinAmount(formatCurrency(formData.minfee));
    setMaxAmount(formatCurrency(formData.maxfee));
    setIsEditing(true); // 수정된 부분
  };

  const handleSaveClick = () => {
    setIsEditing(false);
  };
  
  const handleEditcancleClick = () => {
    setName(formData.name);
    setImg(formData.img)
    setIntroduction(formData.introduction);
    setSelectedSubject(formData.subject);
    setSelectedLocation(formData.location1);
    setSelectedMethod(formData.method);
    setMinAmount(formData.minfee);
    setMaxAmount(formData.maxfee);
    setFormData(prevState => ({
      ...prevState,
      img: formData.img
    }));
    setIsEditing(false);
  };

  const handleclick = (value) => {
    setPage(value);
  }

  const handleNameChange = (value) => {
    const NicknameRegex = /^[a-zA-Z0-9가-힣]*$/;

    if (NicknameRegex.test(value)) {
        if (value.length > 12) {
            setNicknameErrorMessage('최대 12글자 입니다.');
            setName('');
        } else {
            setName(value);
            setNicknameErrorMessage('');
        }
    } else {
        setNicknameErrorMessage('한/영, 숫자만 입력 가능합니다.');
        setName('');
    }
  };
  
  const handleImgChange = (imageFile) => {
    setFormData(prevState => ({
      ...prevState,
      img: imageFile
    }));
  };
  
  const handleIntroductionChange = (value) => {
    setIntroduction(value);
  };
  
  const handleSubjectChange = (value) => {
    if (value.length <= 5) {
      setSelectedSubject(value);
    }
  };
  
  const handleLocationChange = (value) => {
    setSelectedLocation(value);
  };
  
  // 최소 금액 입력 필드 값이 변경될 때 실행되는 핸들러
  const handleMinAmountChange = (e) => {
    const inputValue = e.target.value.replace(/\D/g, ''); // 숫자가 아닌 문자 제거
    setMinAmount(formatCurrency(inputValue));
  };

  // 최대 금액 입력 필드 값이 변경될 때 실행되는 핸들러
  const handleMaxAmountChange = (e) => {
    const inputValue = e.target.value.replace(/\D/g, ''); // 숫자가 아닌 문자 제거
    setMaxAmount(formatCurrency(inputValue));
  };
  
  const handleMethodChange = (value) => {
    setSelectedMethod(value);
  };
  
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('ko-KR').format(amount);
  };

  const user = formData;

  const handleCategoryClick = (category) => {
    switch (category) {
        case "회원정보 수정":
            navigate('/matching/menteelist');
            break;
        case "매칭 글":
            navigate('/matching/mentorlist');
            break;
        case "멘토멘티 관리":
            navigate('/matching/mentorlist');
            break;
        case "스크랩 매칭":
            navigate('/matching/mentorlist');
            break;
        case "내가 작성한 글":
            navigate('/matching/mentorlist');
            break;
        case "내가 작성한 댓글":
            navigate('/matching/mentorlist');
            break;
        case "좋아요 한 글":
            navigate('/matching/mentorlist');
            break;
        case "스크랩 한 글":
            navigate('/matching/mentorlist');
            break;
        case "좋아요 한 댓글":
            navigate('/matching/mentorlist');
            break;                   
        default:
            break;
    }
  };

  const editableItems = [
    {
      key: 'name',
      label: '닉네임',
      component: (
        <div>
          <Input 
            defaultValue={user.name} 
            className={style.inputField} 
            onChange={(e) => handleNameChange(e.target.value)}
            spellCheck={false}
          />
          <div style={{ height: '0px' }}>
            {nicknameErrorMessage && <div style={{ color: 'red' }}>{nicknameErrorMessage}</div>}
          </div>
        </div>
      )
    },
    { key: 'img', label: '프로필 이미지', component:<ImgUpload currentImage={formData.img} onImageChange={handleImgChange} isEditing={isEditing}/> },
    { key: 'introduction', label: '한 줄 소개', component: <Input defaultValue={user.introduction} className={style.inputField} maxLength={15} onChange={(e) => handleIntroductionChange(e.target.value)} /> },
    { key: 'subject', label: '과목', component: (
      <EditSelect
        value={formData.subject} 
        placeholder="과목 (최대 5개)"
        className={style.inputField}
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
        onChange={(value) => handleSubjectChange(value)} 
        maxTags={5}
      />
    )},
    { key: 'location1', label: '지역', component: (
      <EditSelect
        value={formData.location1}
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
    )},
    { key: 'method', label: '과외 방식', component: (
      <EditSelect
        value={formData.method == '0' ? '대면' : formData.method == '1' ? '비대면' : '블렌딩'} 
        placeholder="과외 방식"
        options={[
          { value: '0', label: '대면' },
          { value: '1', label: '비대면' },
          { value: '2', label: '블렌딩' }
        ]}
        onChange={(newValue) => handleMethodChange(newValue)}
      />
    )},
    {
      key: 'fee',
      label: '과외비',
      component: (
        <Input.Group compact>
          <Input
            className={style.feeField}
            type="text"
            placeholder="최소 금액"
            suffix="원"
            value={minAmount}
            onChange={handleMinAmountChange}
          />
          <Input
            style={{ width: '32px', textAlign: 'center', height:'44px' }}
            placeholder="~"
            disabled
          />
          <Input
            className={style.feeField}
            type="text"
            placeholder="최대 금액"
            suffix="원"
            value={maxAmount}
            onChange={handleMaxAmountChange}
          />
        </Input.Group>
      ),
      value: `${formatCurrency(user.minfee)}원 ~ ${formatCurrency(user.maxfee)}원`,
    },
  ];

  const nonEditableItems = [
    { key: 'email', label: '이메일', value: user.email },
    { key: 'realname', label: '이름', value: user.realname },
    { key: 'gender', label: '성별', value: user.gender === 0 ? '남자' : '여자' },
    { key: 'age', label: '나이', value: `${user.age}세` },
    { key: 'role', label: '권한', value: user.role === 1 ? '학생' : '선생님' }
  ];

  return (
    <div className={style.background}>
      <div className={style.user}>
        <div className={style.edit} onClick={handleEditClick}><BiSolidEditAlt size={45} /></div>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <div className={`${style.circle} ${style.circleImage}`}>
            <img src={user.img} alt={user.name} />
          </div>
          <div className={style.information}>
            <div style={{ fontWeight: '900', fontSize: '25px' }}>{user.name}</div>
            <span>{user.introduction}</span>
            <div>
              <span>{user.gender === 0 ? "남자" : "여자"}</span>
              <span style={{ opacity: '0.3' }}> | </span>
              <span>{user.age}세</span> <br />
            </div>
          </div>
        </div>
        <div className={style.side} style={{ marginTop: '30px' }}>
          <Usersidebar titles={["내 정보", "매칭 글", "멘토 관리", "내가 작성한 글", "내가 댓글단 글", "좋아요", "스크랩", "리뷰 보기"]} onCategoryClick={handleCategoryClick} />
        </div>
      </div>

      <div className={style.contents}>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <div style={{ fontSize: '25px', fontWeight: '600', marginLeft: '30px', marginTop: '20px' }}>내 정보</div>
          {isEditing ? (
            <div style={{ display: 'flex' }}>
              <div style={{ display: 'flex', marginTop: '20px', marginRight: '10px' }}>
                <FilterButton name="수정 취소하기" onClick={handleEditcancleClick} />
              </div>
              <div style={{ display: 'flex', marginTop: '20px', marginRight: '30px' }}>
                <FilterButton name="저장하기" onClick={handleSaveClick} />
              </div>
            </div>
          ) : (
            <div style={{ display: 'flex', marginTop: '20px', marginRight: '30px' }}>
              <FilterButton name="수정하기" onClick={handleEditClick} />
            </div>
          )}
        </div>

        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <div style={{ flex: '1', maxWidth: '800px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', marginTop: '50px', marginLeft: '30px', marginRight: '30px' }}>
              <div className={style.horizon}>
                <div className={`${style.mincircle} ${style.mincircleImage}`}>
                  <img src={user.img} alt="유저이미지" />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                  <div className={style.writer}>{user.name}</div>
                  <div className={style.introduction}>{user.introduction}</div>
                </div>
              </div>
              {editableItems.map((item, index) => (
                <div key={index}>
                  <div className={style.line}></div>
                  <div className={style.infoRow}>
                    <div className={style.label}>{item.label}</div>
                    {isEditing || item.key === 'img' ?  (
                      <div>{item.component}</div>
                    ) : (
                      <div className={style.value}>
                        {item.key === 'method' ? (
                          user[item.key] == '0' ? '대면' : user[item.key] == '1' ? '비대면' : '블렌딩'
                        ) : item.key === 'fee' ? (
                          `${formatCurrency(user.minfee)}원 ~ ${formatCurrency(user.maxfee)}원`
                        ) : (
                          user[item.key]
                        )}
                      </div>
                    )}
                  </div>
                </div>
              ))}
              {nonEditableItems.map((item, index) => (
                <div key={index}>
                  <div className={style.line}></div>
                  <div className={style.infoRow}>
                    <div className={style.label}>{item.label}</div>
                    <div className={style.value}>{item.value}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserInfo;
