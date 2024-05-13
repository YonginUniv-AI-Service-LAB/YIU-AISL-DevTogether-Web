import React, { useState } from "react";
import style from "./Comment.module.css";
import { BiLike, BiSolidLike } from "react-icons/bi";
import { GoHeart, GoHeartFill } from "react-icons/go";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import { IoMdMore } from "react-icons/io";
import { Dropdown, Menu, Modal } from 'antd';

const Comment = (props) => {
    const [liked, setLiked] = useState(false); // 좋아요 여부를 상태로 관리
    const [likes, setLikes] = useState(props.likes); // 좋아요 수를 상태로 관리
    const [userId] = useState("사용자 ID"); // 사용자 ID 설정

    const handleLike = () => {
        if (!liked) { // 사용자가 아직 좋아요를 누르지 않은 경우
            setLikes(likes + 1); // 좋아요 수 증가
            setLiked(true); // 좋아요 상태 변경
            // 여기에 좋아요를 서버에 전달하거나 다른 작업을 수행할 수 있습니다.
        } else { // 사용자가 이미 좋아요를 누른 경우
            setLikes(likes - 1); // 좋아요 수 감소 (취소)
            setLiked(false); // 좋아요 상태 변경
            // 여기에 좋아요 취소를 서버에 전달하거나 다른 작업을 수행할 수 있습니다.
        }
    };

    const handleEdit = () => {
        props.onEdit(props.id, props.contents); // 수정할 댓글 정보를 부모 컴포넌트로 전달
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
            <div className={style.horizon}>
                <div className={`${style.circle} ${style.circleImage}`}>
                    <img src={props.userImage} alt="유저 이미지"/>
                </div>
                <div className={style.horizon}>
                    <div className={style.body}>
                        <div className={style.horizon}>
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
                        <div className={style.flex}>
                            <div className={style.like} onClick={handleLike}>
                                {liked ? <FaHeart style={{ color: 'red' }} /> : <FaRegHeart />} 
                                <span style={{marginLeft:"5px", marginRight:"5px", color: liked ? 'red' : 'black' }}>좋아요</span> {likes}
                            </div>
                            <div className={style.time}>
                                {props.createdAt}{props.edited && "(수정됨)"}
                            </div>
                        </div>   
                    </div>
                </div>
            </div>
            {/* <div className={style.foot}>
                <div className={style.more}>
                    <Dropdown overlay={menu} trigger={['click']} placement="bottomRight" arrow>
                        <IoMdMore style={{ cursor: 'pointer' }} />
                    </Dropdown>
                </div>
                <div className={style.time}>
                    {props.createdAt}{props.edited && "(수정됨)"}
                </div>
            </div> */}
        </div>
    );
};

export default Comment;
