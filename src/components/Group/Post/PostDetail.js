import React, { useState } from "react";
import {
  FaCommentAlt,
  FaRegHeart,
  FaHeart,
  FaRegBookmark,
  FaBookmark,
} from "react-icons/fa";
import { CiShare1 } from "react-icons/ci";
import {
  DeleteOutlined,
  EditOutlined,
  ExclamationCircleOutlined,
  MoreOutlined,
} from "@ant-design/icons";
import { IoMdMore } from "react-icons/io";
import { Button, Popconfirm, message, Dropdown, Menu } from "antd";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import style from "./Post.module.css";
import AltImage from "../../../assets/images/devtogether_logo.png";
import { useRecoilState, useSetRecoilState } from "recoil";
import {
  BoardFormDataAtom,
  BoardFormFilesAtom,
  BoardFormTypeAtom,
} from "../../../recoil/atoms/board";
import { refreshAccessToken } from "../../../api";

const PostDetail = (props) => {
  const navigate = useNavigate();

  // Recoil 상태 설정
  const setFormType = useSetRecoilState(BoardFormTypeAtom);
  const [formData, setFormData] = useRecoilState(BoardFormDataAtom);
  const [formFiles, setFormFiles] = useRecoilState(BoardFormFilesAtom);

  const [refresh, setRefresh] = useState(false);

  const [likeCount, setLikeCount] = useState(props.post.likeCount);
  const [isLiked, setIsLiked] = useState(
    props.post.likePeople?.includes(
      parseInt(sessionStorage.getItem("user_profile_id"))
    )
  );

  const [isScraped, setIsScraped] = useState(
    props.post.scrapPeople?.includes(
      parseInt(sessionStorage.getItem("user_profile_id"))
    )
  );

  const updateConfirm = (e) => {
    setFormType("update");
    setFormData(props.post);
    setFormFiles(props.post.filesList);
    navigate("/board/edit");
  };

  const deleteConfirm = async (e) => {
    try {
      await axios({
        method: "DELETE",
        url: "/board",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
        },
        data: {
          boardId: props.post.boardId,
        },
      });
      message.success("게시글이 삭제되었습니다");
      navigate(-1);
    } catch (e) {
      handleError(e);
    }
  };

  const handleError = async (e) => {
    if (e.request.status === 400) {
      message.error("게시글을 다시 선택해주세요.");
    } else if (e.request.status === 404) {
      message.error("존재하지 않는 게시글입니다. ");
    } else if (e.request.status === 401 || e.request.status === 403) {
      if (refresh === false) {
        const isTokenRefreshed = await refreshAccessToken();
        setRefresh(true);
        if (isTokenRefreshed) {
          deleteConfirm();
        } else navigate("/");
      } else {
        message.error("권한이 없습니다.");
      }
    } else if (e.request.status === 500) {
      message.error("잠시 후에 다시 시도해주세요.");
    }
  };

  // 좋아요 및 스크랩 API 호출
  const role = sessionStorage.getItem("role");
  const likeEndpoint =
    role === "1" ? "/board/like/mentor" : "/board/like/mentee";
  const scrapEndpoint =
    role === "1" ? "/board/scrap/mentor" : "/board/scrap/mentee";

  const toggleLike = async () => {
    try {
      console.log("좋아요 role:", role); // 콘솔 출력
      console.log("좋아요 boardId:", props.post.boardId); // 콘솔 출력
      await axios.post(
        likeEndpoint,
        new URLSearchParams({
          boardId: props.post.boardId,
          count: isLiked ? 0 : 1,
        }),
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );
      setIsLiked(!isLiked);
      setLikeCount(isLiked ? likeCount - 1 : likeCount + 1);
      message.success("좋아요를 눌렀습니다.");
    } catch (e) {
      handleError(e);
    }
  };

  const toggleScrap = async () => {
    try {
      console.log("스크랩 role:", role); // 콘솔 출력
      console.log("스크랩 boardId:", props.post.boardId); // 콘솔 출력
      await axios.post(
        scrapEndpoint,
        new URLSearchParams({
          boardId: props.post.boardId,
        }),
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );
      setIsScraped(!isScraped);
      message.success("스크랩을 추가했습니다.");
    } catch (e) {
      handleError(e);
    }
  };

  const handleShare = () => {
    const currentPageURL = window.location.href;
    navigator.clipboard.writeText(currentPageURL);
    message.success("현재 페이지 링크를 복사했습니다.");
  };

  if (!props.post) return <div>게시글을 불러오는 중입니다...</div>;

  // 현재 사용자의 프로필 ID와 게시글 작성자의 프로필 ID를 비교
  const isAuthor =
    sessionStorage.getItem("user_profile_id") ==
    props.post.userProfileId.id;

  const menu = (
    <Menu>
      {isAuthor ? (
        <>
          <Menu.Item key="edit" onClick={updateConfirm}>
            수정
          </Menu.Item>
          <Menu.Item key="delete" onClick={deleteConfirm}>
            삭제
          </Menu.Item>
        </>
      ) : (
        <Menu.Item key="report" onClick={() => message.info("신고가 접수되었습니다.")}>
          신고
        </Menu.Item>
      )}
    </Menu>
  );

  return (
    <div>
      <div className={style.head}>
        <div>{props.post.title}</div>
        <div style={{display:'flex'}}>
          <div className={style.bookmark}>
            {isScraped && <FaBookmark style={{ color: "#68568E" }} />}
          </div>
          <Dropdown overlay={menu} trigger={["click"]} placement="bottomRight" arrow>
            <IoMdMore style={{ cursor: "pointer", marginRight:'10px', fontSize: "24px"  }} />
          </Dropdown>
        </div>
        
      </div>
      <div className={style.information}>
        <div className={style.horizon}>
          <div className={`${style.circle} ${style.circleImage}`}>
            <img
              src={
                props.post.userProfileId.files == null
                  ? AltImage
                  : props.post.userProfileId.filesResponseDto
              }
              alt="유저이미지"
            />
          </div>
          <div>
            <div className={style.writer}>
              {props.post.userProfileId.nickname}
            </div>
            <div className={style.introduction}>
              {props.post.userProfileId.introduction}
            </div>
          </div>
        </div>
        <div>
          <div className={style.horizon}>
            <div className={style.more}>
              <div className={style.date}>
                작성일 : {dayjs(props.post.createdAt).format("YYYY.MM.DD")}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={style.line}></div>
      <div className={style.text}>
        <div>{props.post.contents}</div>
        <img
          className={style.contnentsimage}
          src={AltImage}
          alt="게시물 이미지"
          style={{ marginTop: "25px" }}
        />
      </div>
      <div className={`${style.horizon} ${style.record}`}>
        <FaHeart style={{ marginLeft: "10px", color: "gray" }} />
        <span style={{ marginLeft: "10px" }}>{likeCount}</span>
        <span style={{ opacity: "0.3", marginLeft: "10px" }}> | </span>{" "}
        <FaCommentAlt style={{ marginLeft: "10px", color: "gray" }} />{" "}
        <span style={{ marginLeft: "10px" }}>{props.post.countComment}</span>
      </div>
      <div className={style.reaction}>
        <div className={style.like} onClick={toggleLike}>
          {isLiked ? (
            <FaHeart style={{ color: "red" }} />
          ) : (
            <FaRegHeart />
          )}{" "}
          <span
            style={{
              marginLeft: "5px",
              marginRight: "5px",
              color: isLiked ? "red" : "gray",
            }}
          >
            좋아요
          </span>
        </div>
        <span style={{ opacity: "0.3" }}> | </span>
        <div className={style.scrap} onClick={toggleScrap}>
          {isScraped ? (
            <FaBookmark style={{ color: "#68568E" }} />
          ) : (
            <FaRegBookmark />
          )}{" "}
          <span
            style={{
              marginLeft: "5px",
              marginRight: "5px",
              color: isScraped ? "#68568E" : "gray",
            }}
          >
            스크랩
          </span>
        </div>
        <span style={{ opacity: "0.3" }}> | </span>
        <div className={style.share} onClick={handleShare}>
          <CiShare1 />{" "}
          <span style={{ marginLeft: "5px", marginRight: "5px" }}>
            공유하기
          </span>
        </div>
      </div>
    </div>
  );
};

export default PostDetail;
