import React, { useState, useEffect, useRef } from "react";
import { useMediaQuery } from "react-responsive";
import { useNavigate, useParams } from "react-router-dom";
import PageHeader from "../../components/Group/PageHeader/PageHeader";
import boardimg from "../../assets/images/PageHeaderImage/board.svg";
import Body from "../../components/Group/Body/Body";
import { Input, Button, message } from "antd";
import "react-quill/dist/quill.snow.css";
import style from "../Board/Board.module.css";
import Sidebar from "../../components/Group/Sidebar/Sidebar";
import PostDetail from "../../components/Group/Post/PostDetail";
import Comment from "../../components/Group/Comment/Comment";
import LoadingSpin from "../../components/Spin/LoadingSpin";
import GetDataErrorView from "../../components/Result/GetDataError";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { defaultAPI } from "../../api";
import { useRecoilValue } from "recoil";
import { CurrentBoardIdAtom } from "../../recoil/atoms/post";
import dayjs from "dayjs";

const BoardDetail = ({ handleSidebarButtonClick }) => {
  const isDesktopOrLaptop = useMediaQuery({ minWidth: 992 });
  const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 991 });
  const isMobile = useMediaQuery({ maxWidth: 767 });

  const navigate = useNavigate();
  const { TextArea } = Input;
  const { id } = useParams(); // URL에서 id 파라미터를 가져옴
  const postRef = useRef(null);

  const [currentPage, setCurrentPage] = useState(1);
  const [commentsPerPage] = useState(5);
  const [filteredComments, setFilteredComments] = useState([]);
  const [editedComment, setEditedComment] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [commentText, setCommentText] = useState("");
  const [postHeight, setPostHeight] = useState(0);

  const queryClient = useQueryClient();

  const {
    data: post,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["post", id], // id를 queryKey에 포함
    queryFn: async () => {
      const res = await defaultAPI.get(`/board/post?boardId=${id}`); // id를 사용하여 API 요청
      return res.data;
    },
  });

  useEffect(() => {
    if (postRef.current) {
      setPostHeight(postRef.current.offsetHeight);
    }
  }, [post]);

  const handleListback = () => {
    navigate(-1);
  };

  const handleCommentSubmit = async () => {
    if (commentText.trim() === "") {
      message.warning("댓글 내용을 입력해주세요.");
      return;
    }

    try {
      const role = sessionStorage.getItem("role");
      const endpoint = role === "1" ? "/board/comment/mentor" : "/board/comment/mentee";

      const newComment = {
        boardId: id, // curBoardId 대신 id 사용
        contents: commentText,
      };

      console.log("댓글 등록 데이터:", newComment);

      await defaultAPI.post(
        endpoint,
        new URLSearchParams(newComment),
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
            'Content-Type': 'application/x-www-form-urlencoded'
          },
        }
      );

      message.success("댓글이 등록되었습니다.");
      setCommentText("");
      queryClient.invalidateQueries(["post", id]);
    } catch (error) {
      console.error("댓글 등록 실패:", error);
      message.error("댓글 등록에 실패했습니다.");
    }
  };

  const handleEditComment = (commentId, commentContents) => {
    setEditedComment({ id: commentId, contents: commentContents });
    setIsEditMode(true);
    setCommentText(commentContents);
  };

  const handleDeleteComment = async (commentId) => {
    try {
      const endpoint = "/board/comment";

      await defaultAPI.delete(endpoint, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        data: new URLSearchParams({ commentId }),
      });

      message.success("댓글이 삭제되었습니다.");
      queryClient.invalidateQueries(["post", id]);
    } catch (error) {
      console.error("댓글 삭제 실패:", error);
      message.error("댓글 삭제에 실패했습니다.");
    }
  };

  const handleSaveEdit = async () => {
    if (editedComment) {
      try {
        const role = sessionStorage.getItem("role");
        const endpoint = role === "1" ? "/board/comment/mentor" : "/board/comment/mentee";

        const updatedComment = {
          commentId: editedComment.id,
          contents: commentText,
        };

        await defaultAPI.put(
          endpoint,
          new URLSearchParams(updatedComment),
          {
            headers: {
              Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
              'Content-Type': 'application/x-www-form-urlencoded'
            },
          }
        );

        message.success("댓글이 수정되었습니다.");
        setIsEditMode(false);
        setEditedComment(null);
        setCommentText("");
        queryClient.invalidateQueries(["post", id]);
      } catch (error) {
        console.error("댓글 수정 실패:", error);
        message.error("댓글 수정에 실패했습니다.");
      }
    }
  };

  const handleCancelEdit = () => {
    setIsEditMode(false);
    setEditedComment(null);
    setCommentText("");
  };

  const paginateComments = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // 댓글을 최신순으로 정렬
  const sortedComments = post?.comments?.slice().sort((a, b) => new Date(b.createAt) - new Date(a.createAt)) || [];

  const indexOfLastComment = currentPage * commentsPerPage;
  const indexOfFirstComment = indexOfLastComment - commentsPerPage;
  const currentComments = sortedComments.slice(indexOfFirstComment, indexOfLastComment);

  const userId = parseInt(sessionStorage.getItem("user_profile_id")); // 세션에서 사용자 ID를 가져옵니다.

  if (isLoading) return <LoadingSpin />;
  if (error) return <GetDataErrorView />;
  if (!post) return <div>게시글을 찾을 수 없습니다.</div>;

  return (
    <div>
      {!isMobile && (
        <div className={style.background2}>
          <div style={{ paddingBottom: "200px" }}></div>
          <Body
            sentence1="나와 같은 꿈을 가진 사람들과의 대화"
            sentence2="일상적인 얘기부터 필요한 정보까지"
            title="커뮤니티"
            imageSrc={boardimg}
          />
        </div>
      )}
      {isMobile && (
        <div className={style.background2}>
          <div style={{ paddingBottom: "100px" }}></div>
          <Body
            sentence1="나와 같은 꿈을 가진 사람들과의 대화"
            sentence2="일상적인 얘기부터 필요한 정보까지"
            title="커뮤니티"
          />
        </div>
      )}
      <div
        style={{
          marginLeft: isMobile ? "5%" : isTablet ? 30 : "12%",
          marginRight: isMobile ? "5%" : isTablet ? 30 : "12%",
        }}
      >
        <div className={style.line}></div>
        <div className={style.color}>
          <div className={style.background}>
            <div>
              <div className={style.fix_left}></div>
            </div>
            <div style={{ flex: "1", marginTop: "20px" }}>
              <div>
                <div className={style.fix_head}>
                  <div className={!isMobile ? style.flex : null}>
                    <div
                      style={
                        !isMobile
                          ? { flex: 1, marginRight: "20px" }
                          : { marginBottom: "30px" }
                      }
                      ref={postRef}
                    >
                      <PostDetail post={post} />
                      <div className={style.button} onClick={handleListback}>
                        목록으로
                      </div>
                    </div>
                    <div
                      style={{
                        flex: 0.5,
                        maxHeight: postHeight,
                        overflowY: "auto",
                      }}
                    >
                      <div className={style.commentFormContainer}>
                        <div>
                          <TextArea
                            value={commentText}
                            maxLength={100}
                            placeholder="댓글을 입력하세요"
                            style={{
                              height: 100,
                              resize: "none",
                            }}
                            onChange={(e) => setCommentText(e.target.value)}
                          />
                        </div>
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "flex-end",
                            marginBottom: "10px",
                            marginTop: "10px",
                          }}
                        >
                          {isEditMode ? (
                            <div>
                              <Button
                                style={{
                                  backgroundColor: "gray",
                                  borderColor: "gray",
                                  color: "white",
                                  marginRight: "5px",
                                }}
                                onClick={handleCancelEdit}
                              >
                                수정 취소
                              </Button>
                              <Button
                                style={{
                                  backgroundColor: "#68568E",
                                  borderColor: "#68568E",
                                  color: "white",
                                }}
                                onClick={handleSaveEdit}
                                disabled={commentText.trim() === ""}
                              >
                                수정 완료
                              </Button>
                            </div>
                          ) : (
                            <Button
                              style={{
                                backgroundColor: "#68568E",
                                borderColor: "#68568E",
                                color: "white",
                              }}
                              onClick={handleCommentSubmit}
                              disabled={commentText.trim() === ""}
                            >
                              등록
                            </Button>
                          )}
                        </div>
                      </div>
                      <div style={{ paddingRight: "10px" }}>
                        {currentComments.map((comment) => {
                          const liked = comment.likePeople.includes(userId); // liked 상태 계산
                          return (
                            <Comment
                              key={comment.commentId}
                              id={comment.commentId}
                              contents={comment.contents}
                              createAt={(comment.createAt)}
                              updatedAt={(comment.updatedAt)}
                              likes={comment.likeCount}
                              liked={liked} // 계산된 liked 상태 전달
                              nickname={comment.userProfileId.nickname}
                              userImage={comment.userProfileId.files}
                              introduction={comment.userProfileId.introduction}
                              userid = {comment.userProfileId.id}
                              onEdit={handleEditComment}
                              onDelete={handleDeleteComment}
                              edited={comment.createAt !== comment.updatedAt}
                            />
                          );
                        })}
                        <div className={style.foot}>
                          {[
                            ...Array(
                              Math.ceil(post?.comments?.length / commentsPerPage) || 0
                            ).keys(),
                          ].map((number) => (
                            <div
                              className={`${style.page} ${
                                currentPage === number + 1 ? style.active : ""
                              }`}
                              key={number}
                              onClick={() => paginateComments(number + 1)}
                            >
                              {number + 1}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BoardDetail;
