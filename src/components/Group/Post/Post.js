// Post.js

import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import style from "./Post.module.css"
import { CiRead } from "react-icons/ci";
import { GoComment } from "react-icons/go";
import { BiLike } from "react-icons/bi";
import { FaBookmark } from "react-icons/fa";
import { FaRegBookmark } from "react-icons/fa";
import { useRecoilState, useSetRecoilState, useRecoilValue } from 'recoil';
import { posterScrapState } from '../../../recoil/atoms/scrap';
import { postLikesState } from '../../../recoil/atoms/likes';
import { postCommentsState, postViewsState, postViewState } from '../../../recoil/atoms/post'; 
import NormalButton from "../../Button/NormalButton";
import { FontSizeOutlined } from "@ant-design/icons";
import { IoMdMore } from "react-icons/io";
import { Dropdown, Menu, Button, message } from 'antd';
import CheckModal from "../../Modal/CheckModal";

const Post = (props) => {
  // 반응형 화면
  const isDesktopOrLaptop = useMediaQuery({ minWidth: 992 });
  const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 991 });
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const isNotMobile = useMediaQuery({ minWidth: 768 });

  const navigate = useNavigate();

  const [scraped, setScraped] = useRecoilState(posterScrapState(props.id));
  const likes = useRecoilValue(postLikesState(props.id));
  const [views, setViews] = useRecoilState(postViewsState(props.id)); // 변경된 부분
  const view = useRecoilValue(postViewState(props.id));
  const setView = useSetRecoilState(postViewState(props.id)); // 조회 상태 변경 함수 추가
  const [comments, setComments] = useRecoilState(postCommentsState(props.id));
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [modalOpened, setModalOpened] = useState(false);
  

  // 게시글 클릭 시 해당 게시글의 상세 페이지로 이동하는 함수
  const handlePostClick = () => {
    if (!showDeleteModal && !modalOpened) { // 모달이 열려있지 않은 경우에만 실행
      // 예시 URL 경로: `/board/detail/${props.id}`
      // id를 포함하여 해당 경로로 이동
      navigate(`/board/detail/${props.id}`);
      if (view === false) {
        setView(true);
        setViews(prevViews => prevViews + 1); // 변경된 부분
      }
    }
  };

  const handleEdit = () => {
    console.log("Image URL:", props.img);
    navigate(`/board/form/${props.id}`, { 
      state: { 
        title: props.title, 
        contents: `${props.contents}\n\n![이미지](${props.img})`, // 마크다운에 이미지 주소를 추가
        category: props.category, 
        img: props.img 
      } 
    });
  };

  const handleDelete = () => {
    setShowDeleteModal(true);
  };

  const handleDeleteConfirmed = () => {
    props.onDelete(props.id);
    setShowDeleteModal(false);
  };

  const handleCancelDelete = () => {
    setShowDeleteModal(false);
  };

  const menu = (
    <Menu>
        <Menu.Item key="edit" style={{ borderBottom: "none" }} onClick={handleEdit}>
            수정
        </Menu.Item>
        <Menu.Item key="delete" style={{ borderBottom: "none" }} onClick={handleDelete}>
            삭제
        </Menu.Item>
    </Menu>
);

  

  return (

    <div onClick={handlePostClick} className={style.file}>
      <div className={style.background}>
        <div className={style.num}>{props.num}</div>
        <div className={style.body}>
          <div style={{display:'flex', justifyContent:'space-between'}}>
            <div className={style.horizon}>
              <div className={`${style.circle}`}>
                <img src={props.userImage} alt="유저이미지" />
              </div>
              <div className={style.height}>
                <div className={style.writer}>{props.nickname}</div>
                <div className={style.introduction}>{props.introduction}</div>
              </div>
            </div>
            {props.showBookmark && (
              <div className={style.bookmarked}>
                {scraped && <FaBookmark />}
              </div>
            )}
            {props.showMenu && (
              <div className={style.menu} onClick={(e) => e.stopPropagation()}>
                <Dropdown overlay={menu} trigger={['click']} placement="bottomRight" arrow>
                  <IoMdMore style={{ cursor: 'pointer' }} />
                </Dropdown>
              </div>
            )}
            
          </div>
          <div className={style.contents}>
            <div className={style.width}>
              <span style={{ fontWeight: '900' }}>{props.title}</span>
              <span style={{ opacity: '0.3' }}> | </span>
              <span style={{ fontWeight: '500' }}>{props.contents}</span>
            </div>
            <div className={`${style.square}`}>
              <img src={props.img} alt="게시물 이미지" />
            </div>
          </div>
          <div style={{ marginTop: '20px' }}>
                <CiRead /> {views}
                <span style={{ opacity: '0.3' }}> | </span> <BiLike /> {likes}
                <span style={{ opacity: '0.3' }}> | </span> <GoComment /> {comments}
                <span style={{ opacity: '0.3' }}> | </span> {props.createdAt}
              </div>
        </div>
      </div>
      <CheckModal
        modalText="정말 게시물을 삭제하시겠습니까?"
        isOpen={showDeleteModal}
        onDeleteConfirmed={handleDeleteConfirmed} // onDeleteConfirmed prop 추가
        onCancel={handleCancelDelete}
        setModalOpened={setModalOpened}
      />
    </div>
  );
};
export default Post;
