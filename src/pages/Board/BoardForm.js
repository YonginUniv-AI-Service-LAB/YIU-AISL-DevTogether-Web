import React, { useState, useEffect } from 'react';
import { useMediaQuery } from "react-responsive";
import { useNavigate } from "react-router-dom";
import { PlusOutlined } from '@ant-design/icons';
import { Form, Select, Input } from 'antd';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import Body from "../../components/Group/Body/Body";
import style from "../Board/Board.module.css";
import Sidebar from "../../components/Group/Sidebar/Sidebar";
import Searchbar from "../../components/Group/Searchbar/Searchbar";
import SortButton from '../../components/Button/SortButton';
import { data_board } from '../../assets/data/board'; // data_board import
import Post from '../../components/Group/Post/Post';
import PostFormPage from '../PostForm/PostForm';

const BoardForm = ({ handleSidebarButtonClick }) => {
  // 반응형 화면
  const isDesktopOrLaptop = useMediaQuery({ minWidth: 992 });
  const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 991 });
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const isNotMobile = useMediaQuery({ minWidth: 768 });

  // 페이지 이동
  const navigate = useNavigate();
  const [value, setValue] = useState('');
  const [showPlaceholder, setShowPlaceholder] = useState(true);

  const handleChange = (content, delta, source, editor) => {
    setValue(content);
    setShowPlaceholder(!editor.getText().trim());
  };


  return (
    <div className={style.background2}>
      <div style={{paddingBottom:'200px'}}></div>
      <div>
        <Body
          sentence1="나와 비슷한 비전을 가진 사람들과의 대화"
          sentence2="일상적인 이야기부터 필요한 다양한 정보까지"
          title="커뮤니티"
          imageSrc="/board.png" 
        />
        <div className={style.color}>
          <div className={style.background}>
            {/* <div>
              <div className={style.fix_left}>
                <div className={style.side}>무엇을 넣을까요</div>
                <div></div>
              </div>
            </div> */}
            <div style={{flex: '1', marginTop:'40px', marginLeft:'40px', marginRight:'80px'}}>
              <div>
                <div className={style.fix_head}>
                  <div className={style.line}></div>
                  <div>
                    <div className={style.neck}>
                      <div className={style.head}>게시글 작성하기</div>
                      <div style={{marginLeft:'770px'}}className={style.save}>임시 저장</div>
                      <div className={style.save}>완료</div>
                    </div>
                    <div className={style.border}>
                      <Form.Item label="카테고리">
                        <Select style={{ width: '150px' }} placeholder="카테고리 선택">
                          <Select.Option value="free">자유</Select.Option>
                          <Select.Option value="news">뉴스</Select.Option>
                          <Select.Option value="question">질문 / 공부</Select.Option>
                          <Select.Option value="employedment">취업 / 기술</Select.Option>
                          <Select.Option value="market">플리마켓</Select.Option>
                        </Select>
                      </Form.Item>
                      <Form.Item label="제목">
                        <Input placeholder="제목 입력"/>
                      </Form.Item>
                      <div className={style.markdown}>
                        <ReactQuill style={{height: '500px', borderRadius: '50px' }}
                          placeholder="본문 내용을 입력해주세요."
                          value={value}
                          onChange={handleChange}
                          theme="snow"
                          modules={{
                            toolbar: [
                              [{ 'header': '1'}, {'header': '2'}, { 'font': [] }],
                              [{size: []}],
                              ['bold', 'italic', 'underline', 'strike', 'blockquote'],
                              [{'list': 'ordered'}, {'list': 'bullet'}, 
                              {'indent': '-1'}, {'indent': '+1'}],
                              ['link', 'image', 'video'],
                              ['clean']
                            ]
                          }}
                        />
                      </div>
                    </div>
                    <div style={{paddingBottom:"100px"}}></div>
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
