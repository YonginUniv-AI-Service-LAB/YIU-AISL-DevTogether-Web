import React from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import style from './MatchingDetail.module.css';
import Body from '../../components/Group/Body/Body';
import Sidebar from '../../components/Group/Sidebar/Sidebar';
import { data_mentor } from '../../assets/data/mentor';
import Intro from './intro';
import FilterButton from '../../components/Button/FilterButton';
import { Dropdown, Menu, Button, message } from 'antd';
import { IoMdMore } from "react-icons/io";
import NavigateSelect from '../../components/Select/NavigateSelect';
import ListButton from '../../components/Button/ListButton';

const MenteeDetailPage = () => {

  const isDesktopOrLaptop = useMediaQuery({ minWidth: 992 });
  const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 991 });
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const isNotMobile = useMediaQuery({ minWidth: 768 });

  
  const { id } = useParams();
  const profile = data_mentor.find(profile => profile.id === parseInt(id));

  const navigate = useNavigate();

  const menu = (
    <Menu>
      <Menu.Item key="1" style={{ borderBottom: "none" }}>
          신고
      </Menu.Item>
    </Menu>
  );

  if (!profile) {
    return <div>프로필을 찾을 수 없습니다.</div>;
  }

  const handleCategoryClick = (category) => {
    switch (category) {
        case "학생 찾기":
            navigate('/matching/mentorlist');
            break;
        case "선생님 찾기":
            navigate('/matching/mentorlist');
            break;
        default:
            break;
    }
};

const handleListback = () => {
  navigate(-1); // 이전 페이지로 이동
};

  return (
    <div>
      <div className={style.background2}>
        <div style={{ paddingBottom: '200px' }}></div>
        <Body
          sentence1="보다 쉬운 코딩 과외 매칭을 위해"
          sentence2="DevTogether에서 더 나은 매칭 선택"
          title="학생 찾기"
          imageSrc='/matching2.png'
        />
      </div>
      <div style={{
                marginLeft: isMobile ? '5%' : isTablet ? 30 : '12%',
                marginRight: isMobile ? '5%' : isTablet ? 30 : '12%',
            }}>
        <div className={style.line}></div>
        <div className={style.color}>
          <div className={style.background}>
          {!isMobile &&  <div style={{marginTop:'30px'}}>
              <div className={style.fix_left}>
                <ListButton name="목록으로" onClick={handleListback}/>
                <Sidebar titles={["학생 찾기", "선생님 찾기"]} onCategoryClick={handleCategoryClick} />
              </div>
            </div> }
            <div style={{ flex: '1',marginTop:'10px', marginLeft: '10px' }}>
              <div>
                {isMobile && ( <div style={{display:'flex', justifyContent:'space-between', alignContent:'center', alignItems:'center' }}>
                  <NavigateSelect
                    placeholder="목록"
                    style={{marginTop:'10px'}}
                    options={[
                        { value: '학생 찾기', label: '학생' },
                        { value: '선생님 찾기', label: '선생님' },
                            ]}
                    onChange={(newValue) => handleCategoryClick(newValue)}
                  />
                  <FilterButton name="목록으로"/>
                </div>)}
                <Intro profile={profile} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MenteeDetailPage;
