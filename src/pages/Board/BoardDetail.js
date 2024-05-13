import React, { useState, useEffect } from 'react';
import { useMediaQuery } from "react-responsive";
import { useNavigate, useParams } from "react-router-dom";
import { PlusOutlined } from '@ant-design/icons';
import { Form, Select, Input, Button } from 'antd';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import Body from "../../components/Group/Body/Body";
import style from "../Board/Board.module.css";
import Sidebar from "../../components/Group/Sidebar/Sidebar";
import PostDetail from '../../components/Group/Post/PostDetail';
import Comment from '../../components/Group/Comment/Comment';
import Searchbar from "../../components/Group/Searchbar/Searchbar";
import SortButton from '../../components/Button/SortButton';
import { data_board } from '../../assets/data/board'; // data_board import
import { data_comment } from '../../assets/data/comment'; // data_comment import
import Post from '../../components/Group/Post/Post';
import PostFormPage from '../PostForm/PostForm';

const BoardDetail = ({ handleSidebarButtonClick }) => {
  const isDesktopOrLaptop = useMediaQuery({ minWidth: 992 });
  const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 991 });
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const isNotMobile = useMediaQuery({ minWidth: 768 });

  const navigate = useNavigate();
  const { TextArea } = Input;
  const [value, setValue] = useState('');
  const [showPlaceholder, setShowPlaceholder] = useState(true);
  const { id } = useParams();
  const post = data_board.find(item => item.id === parseInt(id));

  const [filteredComments, setFilteredComments] = useState([]);
  const [editedComment, setEditedComment] = useState(null); // 수정할 댓글 정보 상태
  const [isEditMode, setIsEditMode] = useState(false); // 수정 모드 여부 상태
  const [commentText, setCommentText] = useState(""); // 댓글 입력 칸 텍스트 상태

  useEffect(() => {
    // 게시글 ID에 해당하는 댓글 필터링
    const comments = data_comment.filter(comment => comment.post_id === parseInt(id));
    setFilteredComments(comments);
  }, [id]); // id가 변경될 때마다 댓글 필터링

  const handleChange = (content, delta, source, editor) => {
    setValue(content);
    setShowPlaceholder(!editor.getText().trim());
  };

  const handleCategoryClick = (category) => {
    switch (category) {
      case "전체":
        navigate("/board");
        break;
      case "자유":
        navigate("/board/free");
        break;
      case "뉴스":
        navigate("/board/news");
        break;
      case "질문 / 공부":
        navigate("/board/question");
        break;
      case "취업 / 기술":
        navigate("/board/employedment");
        break;
      case "플리마켓":
        navigate("/board/market");
        break;
      default:
        break;
    }
  };
  const handleCommentSubmit = () => {
    // 등록 버튼을 클릭했을 때 호출되는 함수
     // 등록할 날짜를 현재 날짜에서 가져옵니다.
    const currentDate = new Date();
    // 날짜를 "YYYY.MM.DD" 형식으로 포맷팅합니다.
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

  const handleEditComment = (commentId, commentContents) => {
    // 수정 버튼을 클릭했을 때 호출되는 함수
    const commentToEdit = filteredComments.find(comment => comment.id === commentId);
    setEditedComment(commentToEdit);
    setIsEditMode(true);
    setCommentText(commentContents); // 수정할 댓글의 내용을 commentText 상태로 설정
};

  const handleDeleteComment = (commentId) => {
    // 삭제 버튼을 클릭했을 때 호출되는 함수
  // 필터링된 댓글 배열에서 삭제 대상 댓글을 제외한 새로운 배열을 생성합니다.
  const updatedComments = filteredComments.filter(comment => comment.id !== commentId);

  // 필터링된 댓글 배열을 업데이트합니다.
  setFilteredComments(updatedComments);

  // 실제 데이터에서도 삭제를 반영하려면 여기에 해당 데이터를 삭제하는 코드를 추가해야 합니다.
  };

  const handleSaveEdit = () => {
    if (editedComment) {
      const updatedComments = data_comment.map(comment => {
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
    <div className={style.background2}>
      <div style={{paddingBottom:'200px'}}></div>
      <div>
        <Body
          sentence1="나와 비슷한 비전을 가진 사람들과의 대화"
          sentence2="일상적인 이야기부터 필요한 다양한 정보까지"
          title="커뮤니티"
          imageSrc="/board.png" 
        />
        <div className={style.color}>
          <div className={style.background}>
            <div>
              <div className={style.fix_left}>
                {/* <Sidebar onCategoryClick={handleCategoryClick} titles={["전체", "자유", "뉴스", "질문 / 공부", "취업 / 기술", "플리마켓"]} />
                <div></div> */}
              </div>
            </div>
            <div style={{flex: '1', marginTop:'40px', marginLeft:'80px', marginRight:'80px'}}>
              <div>
                <div className={style.fix_head}>
                  <div className={style.line}></div>
                  <div className={style.flex}>
                    <div style={{ flex: 1, marginRight: '20px' }}>
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
                    </div>
                    <div style={{ flex: 0.5 }}>
                      <div style={{ marginBottom: '10px' }}>
                        <TextArea
                          rows={4}
                          placeholder="댓글을 입력하세요"
                          maxLength={70}
                          value={commentText}
                          onChange={(e) => setCommentText(e.target.value)}
                        />
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '10px' }}>
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
                          <Button style={{ backgroundColor: '#68568E', borderColor: '#68568E', color: 'white' }} onClick={handleCommentSubmit}
                          >등록</Button>
                        )}
                      </div>
                      <div>
                        {/* 수정된 부분: 필터링된 댓글 배열을 사용하여 렌더링 */}
                        {filteredComments.map(comment => (
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
                      </div>
                    </div>
                    <div style={{paddingBottom:"200px"}}></div>
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
