import React from "react";
import style from "./Post.module.css"
import { useNavigate } from "react-router-dom";
import MoreButton from "../../Button/MoreButton";
import ScarpButton from "../../Button/ScrapButton";
import { CiRead } from "react-icons/ci";
import { GoComment } from "react-icons/go";
import { BiLike } from "react-icons/bi";

const Post = (props) => {
  const navigate = useNavigate();

  // 게시글 클릭 시 해당 게시글의 상세 페이지로 이동하는 함수
  const handlePostClick = () => {
    // 예시 URL 경로: `/board/detail/${props.id}`
    // id를 포함하여 해당 경로로 이동
    navigate(`/board/detail/${props.id}`);
  };
  

  return (

    <div>
        <div className={style.file} onClick={handlePostClick}>
            <div className={style.body}>
                <div className={style.num}>{props.num} </div>
                <div className={style.contents}>
                  <div className={style.flex}>
                    <div className= {`${style.circle} ${style.circleImage}`}>
                      <img src={props.userImage} alt="유저이미지" />
                    </div>
                    <div className={style.nickname}>{props.nickname}</div>
                  </div>
                  <span style={{fontWeight:'900'}}>{props.title}</span>
                  <span style={{opacity:'0.3'}}> | </span>
                  <span style={{fontWeight:'500'}}>{props.contents}</span>
                  <div style={{marginTop:'20px'}}>
                      <CiRead /> {props.views}
                      <span style={{opacity:'0.3'}}> | </span> <BiLike /> {props.likes}
                      <span style={{opacity:'0.3'}}> | </span> <GoComment /> {props.comment}
                  </div>
                </div>
            </div>
            <div className={`${style.square} ${style.squareImage}`}>
                      <img src={props.img} alt='게시물 이미지'/>
                    </div>
        </div>
        <div className={style.line}></div>
    </div>
  );
};
export default Post;
