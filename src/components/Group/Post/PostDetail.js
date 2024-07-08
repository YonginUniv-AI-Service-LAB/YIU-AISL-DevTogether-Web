import style from "./Post.module.css";
import { useRecoilState, useSetRecoilState, useRecoilValue } from "recoil";
import { posterScrapState } from "../../../recoil/atoms/scrap";
import { postLikesState, postLikeState } from "../../../recoil/atoms/likes";
import {
  postCommentsState,
  postViewsState,
  postViewState,
} from "../../../recoil/atoms/post";
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
import { Dropdown, Menu, Button, message, Popconfirm } from "antd";
import MenuDropdown from "../../Dropdown/MenuDropdown";
import AltImage from "../../../assets/images/devtogether_logo.png";
import axios from "axios";
import { defaultAPI, refreshAccessToken } from "../../../api";
import {
  DeleteOutlined,
  EditOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import {
  BoardFormDataAtom,
  BoardFormFilesAtom,
  BoardFormTypeAtom,
} from "../../../recoil/atoms/board";
import GetDataErrorView from "../../Result/GetDataError";
import LoadingSpin from "../../Spin/LoadingSpin";
import dayjs from "dayjs";

const PostDetail = (props) => {
  const navigate = useNavigate();
  // 폼 타입 => 작성
  const setFormType = useSetRecoilState(BoardFormTypeAtom);
  // 폼 데이터 세팅
  const [formData, setFormData] = useRecoilState(BoardFormDataAtom);
  // 폼 파일 데이터 세팅
  const [formFiles, setFormFiles] = useRecoilState(BoardFormFilesAtom);

  const [refresh, setRefresh] = useState(false);

  // const [liked, setLiked] = useRecoilState(postLikeState());
  // const [likes, setLikes] = useRecoilState(postLikesState());
  // const [views, setViews] = useRecoilState(postViewsState(post.id));
  // const view = useRecoilValue(postViewState(post.id));
  const setView = useSetRecoilState(postViewState());
  // const [comments, setComments] = useRecoilState(postCommentsState());
  // const scraped = useRecoilValue(posterScrapState());
  // const setScraped = useSetRecoilState(posterScrapState());

  // useEffect(() => {
  //   if (view === false) {
  //     setView(true);
  //     setViews(views + 1);
  //   }
  // }, [view, setView, views, setViews]);

  const toggleLike = () => {
    console.log("조하용");
    // setLiked(!liked);
    // setLikes(liked ? likes - 1 : likes + 1);
  };

  const toggleScrap = () => {
    // 스크랩 상태를 반전시킴
    // setScraped(!scraped);
  };

  const handleShare = () => {
    // 현재 페이지의 URL 가져오기
    const currentPageURL = window.location.href;

    // URL 복사하기
    navigator.clipprops.post.writeText(currentPageURL);

    // 복사 성공 메시지 표시
    message.success("현재 페이지 링크를 복사했습니다.");
  };
  const queryClient = useQueryClient();

  // const {
  //   data: board,
  //   isLoading,
  //   error,
  // } = useQuery({
  //   queryKey: ["board_detail"],
  //   queryFn: async () => {
  //     const res = await defaultAPI.get(
  //       `/board/post?boardId=${props.post.boardId}`
  //     );
  //     if (res.status == 404) {
  //       message.error("존재하지 않는 공지사항입니다.");
  //       return error;
  //     }
  //     return res.data;
  //   },
  // });

  const updateConfirm = (e) => {
    setFormType("update");
    setFormData(props.post);
    console.log("filesList: ", props.post.filesList);
    setFormFiles(props.post.filesList);
    navigate("/board/form");
  };
  const updateCancel = (e) => {
    console.log(e);
  };

  const deleteConfirm = (e) => {
    deleteData.mutate();
  };
  const deleteCancel = (e) => {
    console.log(e);
  };

  const deleteData = useMutation({
    mutationFn: async () =>
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
      }),
    onSuccess: () => {
      message.success("공지사항이 삭제되었습니다");
      navigate(-1);
    },
    onError: async (e) => {
      console.log("실패: ", e.request.status);

      // 데이터 미입력
      if (e.request.status == 400)
        message.error("공지사항을 다시 선택해주세요.");
      // 데이터 미입력
      else if (e.request.status == 404) {
        message.error("존재하지 않는 공지사항입니다. ");
        queryClient.invalidateQueries("notice");
        // 공지사항 목록으로 이동
        navigate(-1);
      }
      // 권한 없음 OR 액세스 토큰 만료
      else if (e.request.status == 401 || e.request.status == 403) {
        // 액세스토큰 리프레시
        if (refresh === false) {
          const isTokenRefreshed = await refreshAccessToken();
          setRefresh(true);
          if (isTokenRefreshed) {
            deleteData.mutate();
          } else navigate("/");
        } else message.error("권한이 없습니다.");
      }
      // 서버 오류
      else if (e.request.status == 500)
        message.error("잠시 후에 다시 시도해주세요.");
    },
  });
  return (
    <div>
      <div className={style.head}>
        <div>{props.post.title}</div>
        <div className={style.bookmark}>
          {/* {scraped && <FaBookmark style={{ color: "68568E" }} />} */}
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
              {sessionStorage.getItem("user_profile_id") ==
              props.post.userProfileId.id ? (
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <Popconfirm
                    title="게시글 수정"
                    description="게시글을 수정하시겠습니까?"
                    onConfirm={() => updateConfirm()}
                    okText="수정"
                    cancelText="취소"
                  >
                    <Button type="text" icon={<EditOutlined />} />
                  </Popconfirm>
                  <Popconfirm
                    title="게시글 삭제"
                    description="게시글을 삭제하시겠습니까?"
                    onConfirm={() => {
                      deleteData.mutate();
                    }}
                    okText="삭제"
                    cancelText="취소"
                    icon={
                      <ExclamationCircleOutlined
                        style={{
                          color: "red",
                        }}
                      />
                    }
                  >
                    <Button type="text" icon={<DeleteOutlined />} />
                  </Popconfirm>
                </div>
              ) : null}
              <div className={style.date}>
                작성일 : {dayjs(props.post.createdAtt).format("YYYY.MM.DD")}
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <div className={style.date}>작성일 : {post.createdAt}</div> */}
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
        {/* <FaEye style={{ color: 'gray' }} /> <span style={{ marginLeft: "10px" }}>{views}</span>
        <span style={{ opacity: '0.3', marginLeft: "10px" }}> | </span> */}
        <FaHeart style={{ marginLeft: "10px", color: "gray" }} />
        <span style={{ marginLeft: "10px" }}>{props.post.likeCount}</span>
        <span style={{ opacity: "0.3", marginLeft: "10px" }}> | </span>{" "}
        <FaCommentAlt style={{ marginLeft: "10px", color: "gray" }} />{" "}
        <span style={{ marginLeft: "10px" }}>{props.post.countComment}</span>
      </div>
      <div className={style.reaction}>
        <div className={style.like} onClick={toggleLike}>
          {props.post.likePeople != null &&
          props.post.likePeople.includes(
            parseInt(sessionStorage.getItem("user_profile_id"))
          ) ? (
            <FaHeart style={{ color: "red" }} />
          ) : (
            <FaRegHeart />
          )}{" "}
          <span
            style={{
              marginLeft: "5px",
              marginRight: "5px",
              color:
                props.post.likePeople != null &&
                props.post.likePeople.includes(
                  parseInt(sessionStorage.getItem("user_profile_id"))
                )
                  ? "red"
                  : "gray",
            }}
          >
            좋아요
          </span>
        </div>
        <span style={{ opacity: "0.3" }}> | </span>
        <div className={style.scrap} onClick={toggleScrap}>
          {props.post.scrapPeople != null &&
          props.post.scrapPeople.includes(
            parseInt(sessionStorage.getItem("user_profile_id"))
          ) ? (
            <FaBookmark style={{ color: "68568E" }} />
          ) : (
            <FaRegBookmark />
          )}{" "}
          <span
            style={{
              marginLeft: "5px",
              marginRight: "5px",
              color:
                props.post.scrapPeople != null &&
                props.post.scrapPeople.includes(
                  parseInt(sessionStorage.getItem("user_profile_id"))
                )
                  ? "#68568E"
                  : "gray",
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
