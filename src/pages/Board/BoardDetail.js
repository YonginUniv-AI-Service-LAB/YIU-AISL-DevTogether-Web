import React, { useState, useEffect, useRef } from 'react';
import { useMediaQuery } from "react-responsive";
import { useNavigate, useParams } from "react-router-dom";
import PageHeader from '../../components/Group/PageHeader/PageHeader';
import boardimg from '../../assets/images/PageHeaderImage/board.svg';
import Body from "../../components/Group/Body/Body";
import { Input, Button } from 'antd';
import 'react-quill/dist/quill.snow.css';
import style from "../Board/Board.module.css";
import Sidebar from "../../components/Group/Sidebar/Sidebar";
import PostDetail from '../../components/Group/Post/PostDetail';
import Comment from '../../components/Group/Comment/Comment';
import { data_board } from '../../assets/data/board'; // data_board import
import { data_comment } from '../../assets/data/comment'; // data_comment import

const BoardDetail = ({ handleSidebarButtonClick }) => {
  const isDesktopOrLaptop = useMediaQuery({ minWidth: 992 });
  const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 991 });
  const isMobile = useMediaQuery({ maxWidth: 767 });

  const navigate = useNavigate();
  const { TextArea } = Input;
  const { id } = useParams();
  const post = data_board.find(item => item.id === parseInt(id));
  const postRef = useRef(null);

  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지 상태 추가
  const [commentsPerPage] = useState(10); // 페이지당 댓글 수 상태 추가

  const [filteredComments, setFilteredComments] = useState([]);
  const [editedComment, setEditedComment] = useState(null); // 수정할 댓글 정보 상태
  const [isEditMode, setIsEditMode] = useState(false); // 수정 모드 여부 상태
  const [commentText, setCommentText] = useState(""); // 댓글 입력 칸 텍스트 상태
  const [postHeight, setPostHeight] = useState(0); // 게시글 영역의 높이 상태 추가

  useEffect(() => {
    // 게시글 ID에 해당하는 댓글 필터링
    const comments = data_comment.filter(comment => comment.post_id === parseInt(id));
    setFilteredComments(comments);
    // 게시글 영역의 높이 측정
    if (postRef.current) {
      setPostHeight(postRef.current.offsetHeight);
    }
  }, [id]); // id가 변경될 때마다 댓글 필터링

  const handleListback = () => {
    navigate(-1); // 이전 페이지로 이동
  };

  const handleCommentSubmit = () => {
    // 등록 버튼을 클릭했을 때 호출되는 함수
    const currentDate = new Date();
    const formattedDate = `${currentDate.getFullYear()}.${String(currentDate.getMonth() + 1).padStart(2, '0')}.${String(currentDate.getDate()).padStart(2, '0')}`;

    const newComment = {
      id: data_comment.length + 1, // 새로운 댓글 ID를 생성합니다.
      post_id: parseInt(id),
      role: 1,
      gender: 0,
      contents: commentText,
      createdAt: formattedDate,
      likes: 0,
      file: [],
      nickname: "댓글 작성자",
      userImage: "/default_user_image.png",
      introduction: "댓글 작성자의 소개",
    };
    // 하드 데이터에 새로운 댓글 정보를 추가합니다.
    data_comment.push(newComment);
    // 댓글 입력 칸 텍스트를 초기화합니다.
    setCommentText("");
    // 필터링된 댓글 배열을 업데이트합니다.
    setFilteredComments([...filteredComments, newComment]);
  };

  const handleEditComment = (commentId) => {
    // 수정 버튼을 클릭했을 때 호출되는 함수
    const commentToEdit = filteredComments.find(comment => comment.id === commentId);
    setEditedComment(commentToEdit);
    setIsEditMode(true);
    setCommentText(commentToEdit.contents); // 수정할 댓글의 내용을 commentText 상태로 설정
  };

  const handleDeleteComment = (commentId) => {
    // 삭제 버튼을 클릭했을 때 호출되는 함수
    const updatedComments = filteredComments.filter(comment => comment.id !== commentId);
    setFilteredComments(updatedComments);
  };

  // 댓글 페이지 변경 함수
  const paginateComments = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // 현재 페이지의 댓글 가져오기
  const indexOfLastComment = currentPage * commentsPerPage;
  const indexOfFirstComment = indexOfLastComment - commentsPerPage;
  const currentComments = filteredComments.slice(indexOfFirstComment, indexOfLastComment);

  const handleSaveEdit = () => {
    if (editedComment) {
      const updatedComments = filteredComments.map(comment => {
        if (comment.id === editedComment.id) {
          return {
            ...comment,
            contents: commentText,
            edited: true // 수정됨 플래그 설정
          };
        }
        return comment;
      });
      setFilteredComments(updatedComments);
      setIsEditMode(false);
      setEditedComment(null);
      setCommentText("");
    }
  };

  const handleCancelEdit = () => {
    // 수정 취소 버튼을 클릭했을 때 호출되는 함수
    // 수정 상태 및 수정할 댓글 정보 초기화
    setIsEditMode(false);
    setEditedComment(null);
    setCommentText("");
  };

  return (
    <div>
      {!isMobile && <div className={style.background2}>
                <div style={{paddingBottom:'200px'}}></div>
                <Body
                    sentence1="나와 같은 꿈을 가진 사람들과의 대화"
                    sentence2="일상적인 얘기부터 필요한 정보까지"
                    title="커뮤니티"
                    imageSrc={boardimg} // 이미지 경로를 전달합니다.
                />
            </div>}
            {isMobile && <div className={style.background2}>
                <div style={{paddingBottom:'100px'}}></div>
                <Body
                    sentence1="나와 같은 꿈을 가진 사람들과의 대화"
                    sentence2="일상적인 얘기부터 필요한 정보까지"
                    title="커뮤니티"
                />
            </div>}
      <div style={{
        marginLeft: isMobile ? '5%' : isTablet ? 30 : '12%',
        marginRight: isMobile ? '5%' : isTablet ? 30 : '12%',
      }}>
        <div className={style.line}></div>
        <div className={style.color}>
          <div className={style.background}>
            <div>
              <div className={style.fix_left}></div>
            </div>
            <div style={{ flex: '1', marginTop: '20px' }}>
              <div>
                <div className={style.fix_head}>
                  <div className={!isMobile ? style.flex : null}>
                    <div style={!isMobile ? { flex: 1, marginRight: '20px' } : {marginBottom:'30px'}} ref={postRef}>
                      <PostDetail 
                        id={post.id}
                        title={post.title}
                        contents={post.contents}
                        createdAt={post.createdAt}
                        likes={post.likes}
                        views={post.views}
                        comment={post.comment}
                        img={post.img}
                        nickname={post.nickname}
                        userImage={post.userImage}
                        introduction={post.introduction}
                        scraped={post.scraped}
                      />
                      <div className={style.button} onClick={handleListback}>목록으로</div>
                    </div>
                    <div style={{ flex: 0.5, maxHeight: postHeight, overflowY: 'auto' }}>
                      <div className={style.commentFormContainer}>
                        <div>
                          <TextArea
                            value={commentText}
                            maxLength={100}
                            placeholder="댓글을 입력하세요"
                            style={{
                              height: 100,
                              resize: 'none',
                            }}
                            onChange={(e) => setCommentText(e.target.value)}
                          />
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '10px', marginTop: '10px' }}>
                          {isEditMode ? (
                            <div>
                              <Button
                                style={{ backgroundColor: 'gray', borderColor: 'gray', color: 'white', marginRight: '5px' }}
                                onClick={handleCancelEdit}
                              >
                                수정 취소
                              </Button>
                              <Button
                                style={{ backgroundColor: '#68568E', borderColor: '#68568E', color: 'white' }}
                                onClick={handleSaveEdit}
                              >
                                수정 완료
                              </Button>
                            </div>
                          ) : (
                            <Button 
                              style={{ backgroundColor: '#68568E', borderColor: '#68568E', color: 'white' }} 
                              onClick={handleCommentSubmit}
                            >
                              등록
                            </Button>
                          )}
                        </div>
                      </div>
                      <div style={{paddingRight:'10px'}}>
                        {currentComments.map(comment => (
                          <Comment
                            key={comment.id}
                            id={comment.id}
                            contents={comment.contents}
                            createdAt={comment.createdAt}
                            likes={comment.likes}
                            nickname={comment.nickname}
                            userImage={comment.userImage}
                            introduction={comment.introduction}
                            onEdit={handleEditComment} // 수정 버튼 클릭 시 호출될 함수 전달
                            onDelete={handleDeleteComment} // 삭제 버튼 클릭 시 호출될 함수 전달
                            edited={comment.edited} // 수정 여부를 전달합니다.
                          />
                        ))}
                        {/* 댓글 페이지네이션 */}
                        <div className={style.foot}>
                          {[...Array(Math.ceil(filteredComments.length / commentsPerPage)).keys()].map(number => (
                          <div className={`${style.page} ${currentPage === number + 1 ? style.active : ''}`} key={number} onClick={() => paginateComments(number + 1)}>
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

