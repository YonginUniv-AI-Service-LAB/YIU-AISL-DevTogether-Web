import React from "react";
import style from "./Post.module.css"
import MoreButton from "../../Button/MoreButton";
import ScarpButton from "../../Button/ScrapButton";
import { CiRead } from "react-icons/ci";
import { GoComment } from "react-icons/go";
import { BiLike } from "react-icons/bi";

const Post = (props) => {
  return (

    <div className={style.background}>
        <div className={style.file}>
            <div className={style.contents}>
                <div>{props.category}  <span style={{opacity:'0.3'}}> | </span> {props.createdAt}</div>
                <span style={{fontWeight:'900'}}>{props.title}</span>
                <div>
                    <CiRead /> {props.views}
                    <span style={{opacity:'0.3'}}> | </span> <BiLike /> {props.likes}
                    <span style={{opacity:'0.3'}}> | </span> <GoComment /> {props.comment}
                </div>
            </div>
            {/* <img className={style.img} src={props.img}  alt='게시물 이미지'/> */}
        </div>
    </div>
  );
};
export default Post;
