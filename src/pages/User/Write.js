import React, { useState, useEffect } from "react";
import style from "./UserInfo.module.css";
import { useMediaQuery } from "react-responsive";
import { useNavigate } from "react-router-dom";
import Usersidebar from '../../components/Group/Sidebar/Usersidebar';
import { BiSolidEditAlt } from "react-icons/bi";
import Post from "../../components/Group/Post/Post";
import { data_board } from "../../assets/data/board";
import { data_mentee } from "../../assets/data/mentee";

const Write = () => {
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const [currentPage, setCurrentPage] = useState(1);
  const [postPerPage] = useState(20);
  const [userPosts, setUserPosts] = useState([]); // 사용자 게시물 상태 추가
  const [sortedPosts, setSortedPosts] = useState([]);

  const navigate = useNavigate();
  const user = data_mentee[2]; // 임시 사용자 데이터

  const handleDelete = (postId) => {
    // postId에 해당하는 게시물을 userPosts 상태에서 제거합니다.
    setUserPosts(prevPosts => prevPosts.filter(post => post.id !== postId));
  };

  useEffect(() => {
    // 사용자가 작성한 게시물 필터링
    const filteredPosts = data_board.filter(post => post.nickname === user.name);
    setUserPosts(filteredPosts);
  }, [user]); // user 상태 변경 시 재렌더링

  useEffect(() => {
    // 게시물을 최신순으로 정렬하는 함수
    const sortLatest = (data) => {
      return data.slice().sort((a, b) => {
        return new Date(b.createdAt) - new Date(a.createdAt);
      });
    };

    // 초기 데이터 로드 및 정렬
    const sortedData = sortLatest(data_board);
    setSortedPosts(sortedData);
  }, []);

  const maxCombinedLength = isMobile ? 20 : 50;

  const handleCategoryClick = (category) => {
    // 카테고리 클릭 처리
    switch (category) {
      case "회원정보 수정":
        navigate('/matching/menteelist');
        break;
      // 다른 카테고리에 대한 처리 추가
      default:
        break;
    }
  };

  const handlePostClick = (postId) => {
    navigate(`/board/detail/${postId}`);
  };

  const indexOfLastPost = currentPage * postPerPage;
  const indexOfFirstPost = indexOfLastPost - postPerPage;
  const currentPosts = userPosts.slice(indexOfFirstPost, indexOfLastPost); // 사용자 게시물 사용

  return (
      <div style={{  marginLeft: !isMobile ? '30px' : '20px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <div style={{ fontSize: '25px', fontWeight: '600', marginTop: '20px' }}>내가 작성한 글</div>
        </div>
        <div style={{ marginTop: '40px'}}>
            {currentPosts.map((post, index) => (
            <Post
                key={post.id}
                id={post.id}
                num={index + 1}
                category={post.category}
                title={post.title}
                contents={post.contents.length > maxCombinedLength - post.title.length
                ? post.contents.substring(0, maxCombinedLength - post.title.length) + '...'
                : post.contents}
                createdAt={post.createdAt}
                likes={post.likes}
                views={post.views}
                comment={post.comment}
                img={post.img}
                nickname={post.nickname}
                userImage={post.userImage}
                introduction={post.introduction}
                scraped={post.scraped}
                onClick={() => handlePostClick(post.id)}
                onDelete={handleDelete}
                showBookmark={false}
                showMenu={true}
            />
            ))}
        </div>
      </div>
  );
};

export default Write;