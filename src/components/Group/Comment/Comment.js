import React, { useState } from "react";
import style from "./Comment.module.css";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import { IoMdMore } from "react-icons/io";
import { Dropdown, Menu, message } from "antd";
import { defaultAPI } from "../../../api";
import dayjs from "dayjs";
import ReportModal from "../../Modal/ReportFormModal"; // 경로 맞게 설정

const Comment = (props) => {
  const [liked, setLiked] = useState(props.liked);
  const [likes, setLikes] = useState(props.likes);
  const [isReportModalVisible, setIsReportModalVisible] = useState(false); // 신고 모달 상태 추가

  const handleLike = async () => {
    try {
      const role = sessionStorage.getItem("role");
      const endpoint = role === "1" ? "/board/comment/like/mentor" : "/board/comment/like/mentee";

      const count = liked ? 0 : 1;

      const data = {
        commentId: props.id,
        count,
      };

      await defaultAPI.post(
        endpoint,
        new URLSearchParams(data),
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
            'Content-Type': 'application/x-www-form-urlencoded'
          },
        }
      );

      setLikes(liked ? likes - 1 : likes + 1);
      setLiked(!liked);

      message.success("좋아요가 반영되었습니다.");
    } catch (error) {
      console.error("좋아요 반영 실패:", error);
      message.error("좋아요 반영에 실패했습니다.");
    }
  };

  const handleEdit = () => {
    props.onEdit(props.id, props.contents);
  };

  const handleDelete = async () => {
    try {
      const endpoint = "/board/comment";

      await defaultAPI.delete(endpoint, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        data: new URLSearchParams({ commentId: props.id }),
      });

      message.success("댓글이 삭제되었습니다.");
      props.onDelete(props.id);
    } catch (error) {
      console.error("댓글 삭제 실패:", error);
      message.error("댓글 삭제에 실패했습니다.");
    }
  };

  const userId = parseInt(sessionStorage.getItem("user_profile_id"));
  const isOwnComment = userId === props.userid;

  const handleReportSubmit = async ({ category, contents }) => {
    try {
      const response = await defaultAPI.post(
        "http://localhost:8080/report",
        new URLSearchParams({
          toUserId: props.userid,
          type: 0,
          typeId: props.id,
          category,
          contents,
        }),
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );
      console.log(response.data);
      message.success("신고가 성공적으로 접수되었습니다.");
      setIsReportModalVisible(false);
    } catch (error) {
      console.error("신고 중 오류가 발생했습니다:", error);
      message.error("신고 중 오류가 발생했습니다.");
    }
  };

  const menu = (
    <Menu>
      {isOwnComment ? (
        <>
          <Menu.Item key="edit" style={{ borderBottom: "none" }} onClick={handleEdit}>
            수정
          </Menu.Item>
          <Menu.Item key="delete" style={{ borderBottom: "none" }} onClick={handleDelete}>
            삭제
          </Menu.Item>
        </>
      ) : (
        <Menu.Item key="report" style={{ borderBottom: "none" }} onClick={() => setIsReportModalVisible(true)}>
          신고
        </Menu.Item>
      )}
    </Menu>
  );

  const isEdited = dayjs(props.createAt).format("YYYY-MM-DD HH:mm:ss") !== dayjs(props.updatedAt).format("YYYY-MM-DD HH:mm:ss");

  return (
    <div className={style.background} onClick={props.onClick ? () => props.onClick(props.postId) : null}>
      <div className={style.circleImage}>
        <img src={props.userImage} alt="유저 이미지" />
      </div>
      <div className={style.body}>
        <div className={style.header}>
          <div>
            <div className={style.writer}>{props.nickname}</div>
            <div className={style.introduction}>{props.introduction}</div>
          </div>
          <div className={style.more}>
            <Dropdown
              overlay={menu}
              trigger={["click"]}
              placement="bottomRight"
              arrow
            >
              <IoMdMore style={{ cursor: "pointer" }} />
            </Dropdown>
          </div>
        </div>
        <div className={style.contents}>{props.contents}</div>
        <div className={style.footer}>
          <div className={style.like} onClick={handleLike}>
            {liked ? <FaHeart style={{ color: "red" }} /> : <FaRegHeart />}
            <span
              style={{
                marginLeft: "5px",
                marginRight: "5px",
                color: liked ? "red" : "black",
              }}
            >
              좋아요
            </span>{" "}
            {likes}
          </div>
          <div className={style.time}>
            {dayjs(props.createAt).format("YYYY-MM-DD")}
            {isEdited && " (수정됨)"}
          </div>
        </div>
      </div>

      <ReportModal
        isModalOpen={isReportModalVisible}
        handleCancel={() => setIsReportModalVisible(false)}
        onSubmit={handleReportSubmit}
      />
    </div>
  );
};

export default Comment;
