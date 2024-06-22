import React, { useState } from "react";
import style from "./Comment.module.css";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import { IoMdMore } from "react-icons/io";
import { Dropdown, Menu } from 'antd';
import { commentLikesState, commentLikeState } from '../../../recoil/atoms/comment';
import { useRecoilState, useSetRecoilState, useRecoilValue } from 'recoil';

const Comment = (props) => {
    const [liked, setLiked] = useRecoilState(commentLikeState(props.id));
    const [likes, setLikes] = useRecoilState(commentLikesState(props.id));

    const handleLike = () => {
        setLikes(liked ? likes - 1 : likes + 1);
        setLiked(!liked);
    };

    const handleEdit = () => {
        props.onEdit(props.id, props.contents);
    };

    const handleDelete = () => {
        props.onDelete(props.id);
    };

    const menu = (
        <Menu>
            <Menu.Item key="edit" style={{ borderBottom: "none" }} onClick={handleEdit}>
                수정
            </Menu.Item>
            <Menu.Item key="delete" style={{ borderBottom: "none" }} onClick={handleDelete}>
                삭제
            </Menu.Item>
            <Menu.Item key="report" style={{ borderBottom: "none" }}>
                신고
            </Menu.Item>
        </Menu>
    );

    return (
        <div className={style.background}>
            <div className={style.circleImage}>
                <img src={props.userImage} alt="유저 이미지"/>
            </div>
            <div className={style.body}>
                <div className={style.header}>
                    <div>
                        <div className={style.writer}>{props.nickname}</div>
                        <div className={style.introduction}>{props.introduction}</div>
                    </div>
                    <div className={style.more}>
                        <Dropdown overlay={menu} trigger={['click']} placement="bottomRight" arrow>
                            <IoMdMore style={{ cursor: 'pointer' }} />
                        </Dropdown>
                    </div>
                </div>
                <div className={style.contents}>{props.contents}</div>
                <div className={style.footer}>
                    <div className={style.like} onClick={handleLike}>
                        {liked ? <FaHeart style={{ color: 'red' }} /> : <FaRegHeart />} 
                        <span style={{ marginLeft: "5px", marginRight: "5px", color: liked ? 'red' : 'black' }}>좋아요</span> {likes}
                    </div>
                    <div className={style.time}>
                        {props.createdAt}{props.edited && " (수정됨)"}
                    </div>
                </div>   
            </div>
        </div>
    );
};

export default Comment;
