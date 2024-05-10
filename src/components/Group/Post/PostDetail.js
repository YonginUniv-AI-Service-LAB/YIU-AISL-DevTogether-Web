import style from "../Post/Post.module.css";
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

const PostDetail = (post) => {
  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState(post.likes);
  const [scraped, setScraped] = useState(false);

  const toggleLike = () => {
    setLiked(!liked);
    setLikes(liked ? likes - 1 : likes + 1);
  };

  const toggleScrap = () => {
    setScraped(!scraped);
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
        <a target="_blank" rel="noopener noreferrer" href="https://www.antgroup.com">
          신고
        </a>
      </Menu.Item>
    </Menu>
  );

  return (
    <div>
      <div className={style.head}>
        <div>{post.title}</div>
        <div className={style.bookmark}>{scraped ? <FaBookmark  style={{ color: '68568E' }} /> : <FaRegBookmark />}</div>
      </div>
      <div className={style.information}>
        <div className={style.horizon}>
          <div className={`${style.circle} ${style.circleImage}`}>
            <img src={post.userImage} alt="유저이미지" />
          </div>
          <div>
            <div className={style.writer}>{post.nickname}</div>
            <div className={style.motto}>{post.motto}</div>
          </div>
        </div>
        <div className={style.flex}>
          <div className={style.date}>작성 일자: {post.createdAt}</div>
          <div className={style.more}>
            <Dropdown overlay={menu} trigger={['click']} placement="bottomRight" arrow>
              <IoMdMore style={{ cursor: 'pointer' }} />
            </Dropdown>
          </div>
        </div>
      </div>
      <div className={style.line}></div>
      <div className={style.text}>
        <div>{post.contents}</div>
        <img src={post.img} alt='게시물 이미지' style={{ marginTop: "25px" }} />
      </div>
      <div className={`${style.horizon} ${style.record}`}>
        <FaEye style={{color:'gray' }}/> <span style={{ marginLeft: "10px"}}>{post.views}</span>
        <span style={{ opacity: '0.3', marginLeft: "10px" }}> | </span> 
        {/* <BiLike style={{ marginLeft: "10px" }} />  */}
        <FaHeart style={{ marginLeft: "10px", color:'gray' }} />
        <span style={{ marginLeft: "10px" }}>{likes}</span>
        <span style={{ opacity: '0.3', marginLeft: "10px" }}> | </span> <FaCommentAlt style={{ marginLeft: "10px", color:'gray' }} /> <span style={{ marginLeft: "10px" }}>{post.comment}</span>
      </div>
      <div className={style.reaction}>
        <div className={style.like} onClick={toggleLike}>
          {/* {liked ? <BiSolidLike style={{ color:'blue' }} /> : <BiLike />} <span style={{ color: liked ? 'blue' : 'gray' }}>좋아요</span> */}
          {liked ? <FaHeart style={{ color: 'red' }} /> : <FaRegHeart />} <span style={{ color: liked ? 'red' : 'gray' }}>좋아요</span>
        </div>
        <span style={{ opacity: '0.3', marginLeft: "10px" }}> | </span>
        <div className={style.scrap} onClick={toggleScrap}>
          {/* {scraped ? <GoHeartFill style={{ color: 'red' }} /> : <GoHeart />} <span style={{ color: scraped ? 'red' : 'gray' }}>스크랩</span> */}
          {scraped ? <FaBookmark  style={{ color: '68568E' }} /> : <FaRegBookmark />} <span style={{ color: scraped ? '#68568E' : 'gray' }}>스크랩</span>
        </div>
        <span style={{ opacity: '0.3', marginLeft: "10px" }}> | </span>
        <div className={style.share} onClick={handleShare}>
          <CiShare1 /> 공유하기
        </div>
      </div>
    </div>
  );
};
export default PostDetail;
