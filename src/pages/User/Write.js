import React, { useState, useEffect } from "react";
import style from "./UserInfo.module.css";
import { useMediaQuery } from "react-responsive";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Post from "../../components/Group/Post/Post";
import dayjs from "dayjs";

const Write = () => {
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const [currentPage, setCurrentPage] = useState(1);
  const [postPerPage] = useState(20);
  const [userPosts, setUserPosts] = useState([]); // 사용자 게시물 상태 추가
  const [sortedPosts, setSortedPosts] = useState([]);
  const [nickname, setNickname] = useState(""); // 닉네임 상태 추가
  const [introduction, setIntroduction] = useState(""); // 한줄소개 상태 추가

  const navigate = useNavigate();
  const userId = parseInt(sessionStorage.getItem("user_profile_id"), 10); // 세션 스토리지에서 user_profile_id 가져오기
  const role = sessionStorage.getItem("role"); // 세션 스토리지에서 role 가져오기

  useEffect(() => {
    // const fetchUserData = async () => {
    //   try {
    //     const userResponse = await axios.get("/user", {
    //       headers: {
    //         Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
    //       },
    //     });
    //     setNickname(userResponse.data.nickname);
    //     setIntroduction(userResponse.data.introduction);
    //   } catch (error) {
    //     console.error("Failed to fetch user data:", error);
    //   }
    // };

    const fetchUserPosts = async () => {
      try {
        const endpoint = role === "1" ? "/user/board/mentor" : "/user/board/mentee"; // 역할에 따라 엔드포인트 선택
        const response = await axios.get(endpoint, {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
          },
        });
        console.log("Fetched board posts:", response.data); // API로 가져온 값 콘솔에 출력
        // userId와 일치하는 게시물 필터링
        const userPosts = response.data.filter(post => post.userProfileId.id === userId);
        setUserPosts(userPosts);
      } catch (error) {
        console.error("Failed to fetch board posts:", error);
      }
    };

    // fetchUserData();
    fetchUserPosts();
  }, [userId, role]);

  useEffect(() => {
    // 게시물을 최신순으로 정렬하는 함수
    const sortLatest = (data) => {
      return data.slice().sort((a, b) => {
        return new Date(b.createdAt) - new Date(a.createdAt);
      });
    };

    // 초기 데이터 로드 및 정렬
    const sortedData = sortLatest(userPosts);
    setSortedPosts(sortedData);
  }, [userPosts]);

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

  const handleDelete = (postId) => {
    // postId에 해당하는 게시물을 userPosts 상태에서 제거합니다.
    setUserPosts(prevPosts => prevPosts.filter(post => post.id !== postId));
  };

  const indexOfLastPost = currentPage * postPerPage;
  const indexOfFirstPost = indexOfLastPost - postPerPage;
  const currentPosts = sortedPosts.slice(indexOfFirstPost, indexOfLastPost); // 사용자 게시물 사용

  return (
    <div style={{ marginLeft: !isMobile ? '30px' : '20px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <div style={{ fontSize: '25px', fontWeight: '600', marginTop: '20px' }}>내가 작성한 글</div>
      </div>
      <div style={{ marginTop: '40px'}}>
        {currentPosts.map((post, index) => (
          <Post
            key={post.boardId}
            id={post.boardId}
            num={index + 1}
            category={post.category}
            title={post.title}
            contents={post.contents.length > maxCombinedLength - post.title.length
              ? post.contents.substring(0, maxCombinedLength - post.title.length) + '...'
              : post.contents}
            createdAt={dayjs(post.createdAt).format("YYYY.MM.DD")}
            likes={post.likeCount}
            views={post.views}
            comment={post.countComment}
            img={post.img}
            nickname={post.userProfileId["nickname"]}
            userImage={post.userImage}
            introduction={post.userProfileId["introduction"]}
            scraped={post.scraped}
            onClick={() => handlePostClick(post.boardId)}
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
