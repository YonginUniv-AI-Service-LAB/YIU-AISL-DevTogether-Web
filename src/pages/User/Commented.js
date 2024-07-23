import React, { useState, useEffect } from "react";
import style from "./UserInfo.module.css";
import { useMediaQuery } from "react-responsive";
import { useNavigate } from "react-router-dom";
import Comment from "../../components/Group/Comment/Comment";
import { message } from "antd";
import { defaultAPI } from "../../api";

const Commented = () => {
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const [currentPage, setCurrentPage] = useState(1);
  const [postPerPage] = useState(20);
  const [userComments, setUserComments] = useState([]);
  const navigate = useNavigate();
  const role = sessionStorage.getItem("role"); // 세션 스토리지에서 role 가져오기

  useEffect(() => {
    const fetchUserComments = async () => {
      try {
        const endpoint = role === "1" ? "/user/comment/mentor" : "/user/comment/mentee"; // 역할에 따라 엔드포인트 선택
        const response = await defaultAPI.get(endpoint, {
          headers: {
            'Authorization': `Bearer ${sessionStorage.getItem("accessToken")}`,
            'Content-Type': 'application/json'
          }
        });
        if (response.status !== 200) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.data;
        setUserComments(data);
      } catch (error) {
        console.error('Error fetching user comments:', error);
        message.error("댓글 불러오기에 실패했습니다.");
      }
    };
    fetchUserComments();
  }, [role]);

  const maxCombinedLength = isMobile ? 20 : 50;

  const handleEdit = (id, contents) => {
    // 수정 기능 처리
  };

  const handleDelete = (id) => {
    // 삭제 기능 처리
    setUserComments(prevComments => prevComments.filter(comment => comment.commentId !== id));
  };

  const handleCommentClick = (postId) => {
    navigate(`/board/detail/${postId}`);
  };

  const indexOfLastComment = currentPage * postPerPage;
  const indexOfFirstComment = indexOfLastComment - postPerPage;
  const currentComments = userComments.slice(indexOfFirstComment, indexOfLastComment);

  return (
    <div style={{ marginLeft: !isMobile ? '30px' : '20px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <div style={{ fontSize: '25px', fontWeight: '600', marginTop: '20px' }}>내가 댓글단 글</div>
      </div>
      <div style={{ marginTop: '40px' }}>
        {currentComments.map((comment, index) => (
          <Comment
            key={comment.commentId}
            id={comment.commentId}
            num={index + 1}
            contents={comment.contents}
            createAt={comment.createAt}
            updatedAt={comment.updatedAt}
            nickname={comment.userProfileId.nickname}
            userImage={comment.userProfileId.userImage}
            introduction={comment.userProfileId.introduction}
            likes={comment.likeCount}
            liked={comment.liked}
            userid={comment.userProfileId.id}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onClick={handleCommentClick} // 여기서 클릭 핸들러를 추가합니다.
            postId={comment.boardId} // 댓글에서 게시물 ID를 가져옵니다.
          />
        ))}
      </div>
    </div>
  );
};

export default Commented;
