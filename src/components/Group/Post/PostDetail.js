import style from "./Post.module.css";
import { useRecoilState } from 'recoil';
import { posterScrapState } from '../../../recoil/atoms/scrap';
import React, { useState } from "react";
import { CiRead } from "react-icons/ci";
import { GoComment } from "react-icons/go";
import { FaCommentAlt } from "react-icons/fa";
import { BiLike, BiSolidLike } from "react-icons/bi";
import { GoHeart, GoHeartFill } from "react-icons/go";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import { FaRegBookmark, FaBookmark } from "react-icons/fa";
import { CiShare1 } from "react-icons/ci";
import { FaEye } from "react-icons/fa";
import { IoMdMore } from "react-icons/io";
import { Dropdown, Menu, Button, message } from 'antd';
import MenuDropdown from "../../Dropdown/MenuDropdown";

const PostDetail = (post) => {
  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState(post.likes);
  const [scraped, setScraped] = useRecoilState(posterScrapState); // 수정 필요

  const toggleLike = () => {
    setLiked(!liked);
    setLikes(liked ? likes - 1 : likes + 1);
  };

  const toggleScrap = (postId) => {
    console.log("toggleScrap 함수가 호출되었습니다. postId:", postId);
    if (!postId) {
      console.error("Invalid post id:", postId);
      return;
    }
  
    // 스크랩 상태 토글
    setScraped(prevScraped => {
      return {
        ...prevScraped,
        [postId]: !prevScraped[postId]
      };
    });
  };

  const handleShare = () => {
    // 현재 페이지의 URL 가져오기
    const currentPageURL = window.location.href;

    // URL 복사하기
    navigator.clipboard.writeText(currentPageURL);

    // 복사 성공 메시지 표시
    message.success('현재 페이지 링크를 복사했습니다.');
  };

  const menu = (
    <Menu>
      <Menu.Item key="1" style={{ borderBottom: "none" }}>
          신고
      </Menu.Item>
    </Menu>
  );

  return (
    <div>
      <div className={style.head}>
        <div>{post.title}</div>
        <div className={style.bookmark}>
          {scraped ? <FaBookmark style={{ color: '68568E' }} /> : <FaRegBookmark />}
        </div>
      </div>
      <div className={style.information}>
        <div className={style.horizon}>
          <div className={`${style.circle} ${style.circleImage}`}>
            <img src={post.userImage} alt="유저이미지" />
          </div>
          <div>
            <div className={style.writer}>{post.nickname}</div>
            <div className={style.introduction}>{post.introduction}</div>
          </div>
        </div>
        <div>
          <div className={style.horizon}>
            <div className={style.more}>
              <Dropdown overlay={menu} trigger={['click']} placement="bottomRight" arrow>
                <IoMdMore style={{ cursor: 'pointer'}} />
              </Dropdown>
              <div className={style.date}>작성일 : {post.createdAt}</div>
            </div>
          </div>
        </div>
      </div>
      {/* <div className={style.date}>작성일 : {post.createdAt}</div> */}
      <div className={style.line}></div>
      <div className={style.text}>
        <div>{post.contents}</div>
        <img src={post.img} alt='게시물 이미지' style={{ marginTop: "25px" }} />
      </div>
      <div className={`${style.horizon} ${style.record}`}>
        <FaEye style={{ color: 'gray' }} /> <span style={{ marginLeft: "10px" }}>{post.views}</span>
        <span style={{ opacity: '0.3', marginLeft: "10px" }}> | </span>
        <FaHeart style={{ marginLeft: "10px", color: 'gray' }} />
        <span style={{ marginLeft: "10px" }}>{likes}</span>
        <span style={{ opacity: '0.3', marginLeft: "10px" }}> | </span> <FaCommentAlt style={{ marginLeft: "10px", color: 'gray' }} /> <span style={{ marginLeft: "10px" }}>{post.comment}</span>
      </div>
      <div className={style.reaction}>
        <div className={style.like} onClick={toggleLike}>
          {liked ? <FaHeart style={{ color: 'red' }} /> : <FaRegHeart />} <span style={{marginLeft:"5px", marginRight:"5px", color: liked ? 'red' : 'gray' }}>좋아요</span>
        </div>
        <span style={{ opacity: '0.3'}}> | </span>
        <div className={style.scrap} onClick={toggleScrap}>
          {scraped ? <FaBookmark style={{ color: '68568E' }} /> : <FaRegBookmark />} <span style={{marginLeft:"5px", marginRight:"5px", color: scraped ? '#68568E' : 'gray' }}>스크랩</span>
        </div>
        <span style={{ opacity: '0.3'}}> | </span>
        <div className={style.share} onClick={handleShare}>
          <CiShare1 /> <span style={{marginLeft:"5px", marginRight:"5px"}}>공유하기</span>
        </div>
      </div>
    </div>
  );
};
export default PostDetail;
