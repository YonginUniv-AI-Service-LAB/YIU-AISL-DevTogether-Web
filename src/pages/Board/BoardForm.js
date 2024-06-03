import React, { useState, useEffect } from 'react';
import { useMediaQuery } from "react-responsive";
import { useNavigate, useLocation } from "react-router-dom";
import PageHeader from '../../components/Group/PageHeader/PageHeader';
import boardimg from '../../assets/images/PageHeaderImage/board.svg';
import Body from "../../components/Group/Body/Body";
import { Form, Select, Input, Button, message } from 'antd';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import style from "../Board/Board.module.css";
import { data_board } from '../../assets/data/board'; // data_board import

const BoardForm = ({ handleSidebarButtonClick }) => {
  // 반응형 화면
  const isDesktopOrLaptop = useMediaQuery({ minWidth: 992 });
  const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 991 });
  const isMobile = useMediaQuery({ maxWidth: 767 });

  // 페이지 이동
  const navigate = useNavigate();
  const location = useLocation();
  
  const [value, setValue] = useState('');
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [img, setImg] = useState('')
  const [showPlaceholder, setShowPlaceholder] = useState(true);

  useEffect(() => {
    // 전달된 게시글 데이터가 있는 경우, 해당 데이터로 상태를 설정
    if (location.state) {
      setTitle(location.state.title || '');
      setValue(location.state.contents || '');
      setCategory(location.state.category || '');
      setImg(location.state.img || '');
    } else {
      const tempPost = JSON.parse(localStorage.getItem('tempPost'));
      if (tempPost) {
        setTitle(tempPost.title);
        setValue(tempPost.contents);
        setCategory(tempPost.category);
        setImg(tempPost.img);
      }
    }
  }, [location.state]);

  const handleChange = (content, delta, source, editor) => {
    setValue(content);
    setShowPlaceholder(!editor.getText().trim());
  };

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleCategoryChange = (value) => {
    setCategory(value);
  };

  const handleTempSave = () => {
    const currentDate = new Date();
    const formattedDate = `${currentDate.getFullYear()}.${String(currentDate.getMonth() + 1).padStart(2, '0')}.${String(currentDate.getDate()).padStart(2, '0')}`;

    const post = {
      id: formattedDate,
      title,
      contents: value,
      category,
      createdAt: formattedDate,
      likes: 0,
      views: 0,
      comment: 0,
      img: '',
      nickname: '작성자',
      userImage: '/default_user_image.png',
      introduction: '작성자 소개',
      scraped: false,
    };

    localStorage.setItem('tempPost', JSON.stringify(post));
    message.success('임시 저장되었습니다.');
  };

  const handleComplete = () => {
    if (!title || !value || !category) {
      message.error('제목, 내용 및 카테고리를 입력해주세요.');
      return;
    }

    const currentDate = new Date();
    const formattedDate = `${currentDate.getFullYear()}.${String(currentDate.getMonth() + 1).padStart(2, '0')}.${String(currentDate.getDate()).padStart(2, '0')}`;

    const post = {
      id: formattedDate,
      title,
      contents: value,
      category,
      createdAt: formattedDate,
      likes: 0,
      views: 0,
      comment: 0,
      img: '',
      nickname: '작성자',
      userImage: '/default_user_image.png',
      introduction: '작성자 소개',
      scraped: false,
    };

    data_board.push(post);
    localStorage.removeItem('tempPost'); // 게시글 저장 후 임시 저장 데이터 삭제
    message.success('게시글이 저장되었습니다.');
    navigate('/board');
  };

  return (
    <div>
      {!isMobile && <div className={style.background2}>
                <div style={{paddingBottom:'200px'}}></div>
                <Body
                    sentence1="나와 같은 꿈을 가진 사람들과의 대화"
                    sentence2="일상적인 얘기부터 필요한 정보까지"
                    title="커뮤니티"
                    imageSrc={boardimg} // 이미지 경로를 전달합니다.
                />
            </div>}
            {isMobile && <div className={style.background2}>
                <div style={{paddingBottom:'100px'}}></div>
                <Body
                    sentence1="나와 같은 꿈을 가진 사람들과의 대화"
                    sentence2="일상적인 얘기부터 필요한 정보까지"
                    title="커뮤니티"
                />
            </div>}
      <div style={{
        marginLeft: isMobile ? '5%' : isTablet ? 30 : '12%',
        marginRight: isMobile ? '5%' : isTablet ? 30 : '12%',
      }}>
        <div className={style.line}></div>
        <div className={style.color}>
          <div className={style.background}>
            <div style={{ flex: '1', marginTop: '40px' }}>
              <div>
                <div className={style.fix_head}>
                  <div>
                    {!isMobile &&
                      <div className={style.neck}>
                        <div className={style.head} style={{ fontSize: '25px', marginLeft: '30px' }}>게시글 작성하기</div>
                        <div style={{ display: 'flex', marginRight: '35px' }}>
                          <div className={style.save} onClick={handleTempSave}>임시 저장</div>
                          <div className={style.save} onClick={handleComplete}>완료</div>
                        </div>
                      </div>}
                    {isMobile &&
                      <div className={style.neck}>
                        <div className={style.head} style={{ fontSize: '20px', marginLeft: '30px' }}>게시글 작성하기</div>
                        <div style={{ display: 'flex' }}>
                          <div className={style.mobilesave} style={{ fontSize: '10px' }} onClick={handleTempSave}>임시 저장</div>
                          <div className={style.mobilesave} style={{ fontSize: '10px' }} onClick={handleComplete}>완료</div>
                        </div>
                      </div>}

                    <div className={style.border}>
                      <Form.Item label="카테고리">
                        <Select style={{ width: '150px' }} placeholder="카테고리 선택" value={category} onChange={handleCategoryChange}>
                          <Select.Option value="free">자유</Select.Option>
                          <Select.Option value="news">뉴스</Select.Option>
                          <Select.Option value="question">질문 / 공부</Select.Option>
                          <Select.Option value="employment">취업 / 기술</Select.Option>
                          <Select.Option value="market">플리마켓</Select.Option>
                        </Select>
                      </Form.Item>
                      <Form.Item label="제목">
                        <Input placeholder="제목 입력" value={title} onChange={handleTitleChange} />
                      </Form.Item>
                      <div className={style.markdown}>
                        <ReactQuill style={{ height: '500px', borderRadius: '50px' }}
                          placeholder="본문 내용을 입력해주세요."
                          value={value}
                          onChange={handleChange}
                          theme="snow"
                          modules={{
                            toolbar: [
                              [{ 'header': '1' }, { 'header': '2' }, { 'font': [] }],
                              [{ size: [] }],
                              ['bold', 'italic', 'underline', 'strike', 'blockquote'],
                              [{ 'list': 'ordered' }, { 'list': 'bullet' },
                              { 'indent': '-1' }, { 'indent': '+1' }],
                              ['link', 'image', 'video'],
                              ['clean']
                            ]
                          }}
                        />
                      </div>
                    </div>
                    <div style={{ paddingBottom: "100px" }}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BoardForm;
