import React, { useState, useEffect } from 'react';
import { useMediaQuery } from "react-responsive";
import { useNavigate, useParams } from "react-router-dom";
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

const BoardDetail = ({ handleSidebarButtonClick }) => {
  // 반응형 화면
  const isDesktopOrLaptop = useMediaQuery({ minWidth: 992 });
  const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 991 });
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const isNotMobile = useMediaQuery({ minWidth: 768 });

  // 페이지 이동
  const navigate = useNavigate();
  const [value, setValue] = useState('');
  const [showPlaceholder, setShowPlaceholder] = useState(true);
  const { id } = useParams(); // URL에서 게시글 ID 가져오기
  const post = data_board.find(item => item.id === parseInt(id)); // 해당 ID의 게시글 찾기

  if (!post) {
    return <div>게시글을 찾을 수 없습니다.</div>;
  }

  const handleChange = (content, delta, source, editor) => {
    setValue(content);
    setShowPlaceholder(!editor.getText().trim());
  };

  // 클릭된 카테고리에 따라 페이지 이동을 처리합니다.
  const handleCategoryClick = (category) => {
    switch (category) {
      case "전체":
        navigate("/board");
        break;
      case "자유":
        navigate("/board/free");
        break;
      case "뉴스":
        navigate("/board/news");
        break;
      case "질문 / 공부":
        navigate("/board/question");
        break;
      case "취업 / 기술":
        navigate("/board/employedment");
        break;
      case "플리마켓":
        navigate("/board/market");
        break;
      default:
        break;
    }
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
            <div>
              <div className={style.fix_left}>
                <Sidebar onCategoryClick={handleCategoryClick} titles={["전체", "자유", "뉴스", "질문 / 공부", "취업 / 기술", "플리마켓"]} />
                <div></div>
              </div>
            </div>
            <div style={{flex: '1', marginTop:'40px', marginLeft:'40px', marginRight:'80px'}}>
              <div>
                <div className={style.fix_head}>
                  <div className={style.line}></div>
                  <div>
                    <div className={style.neck}>
                      <div className={style.head}>{post.title}</div>
                    </div>
                    <div className={style.neck}> 
                      <div className={style.horizon}>
                        <div className= {`${style.circle} ${style.circleImage}`}>
                          <img src={post.userImage} alt="유저이미지" />
                        </div>
                        <div className={style.nickname}>{post.nickname}</div>
                      </div>
                      {/* <div style={{marginLeft:'50px'}}>조회수:{post.views}</div>
                      <div>좋아요:{post.likes}</div>
                      <div>댓글:{post.comment}</div> */}
                      <div>{post.createdAt}</div>
                    </div>
                    <div className={style.line}></div>
                    <div className={style.contents}>
                      {post.contents}
                    </div>
                    <div style={{paddingBottom:"200px"}}></div>
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

export default BoardDetail;
