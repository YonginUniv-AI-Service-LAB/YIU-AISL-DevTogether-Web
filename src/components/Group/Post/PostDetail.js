import style from "./Post.module.css";
import { useRecoilState, useSetRecoilState, useRecoilValue } from 'recoil';
import { posterScrapState } from '../../../recoil/atoms/scrap';
import { postLikesState, postLikeState } from '../../../recoil/atoms/likes';
import { postCommentsState, postViewsState, postViewState } from '../../../recoil/atoms/post'; 
import React, { useState, useEffect } from "react";
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
  const [liked, setLiked] = useRecoilState(postLikeState(post.id));
  const [likes, setLikes] = useRecoilState(postLikesState(post.id));
  const [views, setViews] = useRecoilState(postViewsState(post.id));
  const view = useRecoilValue(postViewState(post.id));
  const setView = useSetRecoilState(postViewState(post.id));
  const [comments, setComments] = useRecoilState(postCommentsState(post.id));
  const scraped = useRecoilValue(posterScrapState(post.id));
  const setScraped = useSetRecoilState(posterScrapState(post.id));

  useEffect(() => {
    if (view === false) {
      setView(true);
      setViews(views + 1);
    }
  }, [view, setView, views, setViews]);

  const toggleLike = () => {
    setLiked(!liked);
    setLikes(liked ? likes - 1 : likes + 1);
  };

  const toggleScrap = () => {
    // 스크랩 상태를 반전시킴
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
          신고
      </Menu.Item>
    </Menu>
  );

  return (
    <div>
      <div className={style.head}>
        <div>{post.title}</div>
        <div className={style.bookmark}>
          {scraped && <FaBookmark style={{ color: '68568E' }} />}
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
        <img className={style.contnentsimage} src={post.img} alt='게시물 이미지' style={{ marginTop: "25px" }} />
      </div>
      <div className={`${style.horizon} ${style.record}`}>
        <FaEye style={{ color: 'gray' }} /> <span style={{ marginLeft: "10px" }}>{views}</span>
        <span style={{ opacity: '0.3', marginLeft: "10px" }}> | </span>
        <FaHeart style={{ marginLeft: "10px", color: 'gray' }} />
        <span style={{ marginLeft: "10px" }}>{likes}</span>
        <span style={{ opacity: '0.3', marginLeft: "10px" }}> | </span> <FaCommentAlt style={{ marginLeft: "10px", color: 'gray' }} /> <span style={{ marginLeft: "10px" }}>{comments}</span>
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
