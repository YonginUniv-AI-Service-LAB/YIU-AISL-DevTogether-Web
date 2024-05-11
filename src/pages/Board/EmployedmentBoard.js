import React, { useState, useEffect } from 'react';
import { useMediaQuery } from "react-responsive";
import { useNavigate } from "react-router-dom";
import Body from "../../components/Group/Body/Body";
import style from "../Board/Board.module.css";
import Sidebar from "../../components/Group/Sidebar/Sidebar";
import Searchbar from "../../components/Group/Searchbar/Searchbar";
import SortButton from '../../components/Button/SortButton';
import { data_board } from '../../assets/data/board'; // data_board import
import Post from '../../components/Group/Post/Post';

const EmploydementBoard = ({ handleSidebarButtonClick }) => {
  // 반응형 화면
  const isDesktopOrLaptop = useMediaQuery({ minWidth: 992 });
  const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 991 });
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const isNotMobile = useMediaQuery({ minWidth: 768 });

  // 페이지 이동
  const navigate = useNavigate();
  const [searchText, setSearchText] = useState("");
  const [sortedPosts, setSortedPosts] = useState([]);

  // 최신순 정렬 함수
  const sortLatest = (data) => {
    return data.slice().sort((a, b) => {
      return new Date(b.createdAt) - new Date(a.createdAt); // createdAt으로 변경
    });
  };

  // 인기순 정렬 함수
  const sortPopular = (data) => {
    return data.slice().sort((a, b) => {
      return b.likes - a.likes;
    });
  };

  // 조회순 정렬 함수
  const sortViews = (data) => {
    return data.slice().sort((a, b) => {
      return b.views - a.views;
    });
  };

  // 정렬 버튼 클릭 핸들러
  const handleSort = (sortType) => {
    let sortedData = [];

    switch (sortType) {
      case 'latest':
        sortedData = sortLatest(data_board);
        break;
      case 'popular':
        sortedData = sortPopular(data_board);
        break;
      case 'views':
        sortedData = sortViews(data_board);
        break;
      default:
        break;
    }

    setSortedPosts(sortedData);
  };

  // 초기 데이터 로드 및 정렬
  useEffect(() => {
    // 최신순으로 정렬하여 초기화
    const sortedData = sortLatest(data_board);
    setSortedPosts(sortedData);
  }, []);

  const handleCategoryClick = (category) => {
    // 클릭된 카테고리에 따라 페이지 이동을 처리합니다.
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

  // 검색 결과 필터링 함수
  const filterPosts = (posts, searchText) => {
    return posts.filter(
      (post) =>
        post.title.includes(searchText) || post.contents.includes(searchText)
    );
  };

  // 검색어 입력 핸들러
  const handleSearch = (searchValue) => {
    setSearchText(searchValue);
  };

  // 검색 결과 업데이트
  useEffect(() => {
    if (searchText.trim() === '') {
      // 검색어가 없을 때는 전체 게시물을 최신순으로 보여줍니다.
      setSortedPosts(sortLatest(data_board));
    } else {
      // 검색어가 있는 경우에는 해당 검색어를 포함하는 게시물만 필터링한 후 최신순으로 정렬하여 보여줍니다.
      const filteredData = filterPosts(data_board, searchText);
      const sortedData = sortLatest(filteredData);
      setSortedPosts(sortedData);
    }
  }, [searchText]); // searchText 상태가 변경될 때마다 실행됩니다.

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
                <Sidebar onCategoryClick={handleCategoryClick} titles={["전체", "자유", "뉴스", "질문 / 공부", "취업 / 기술", "플리마켓"]} />
                <div></div>
              </div>
            </div>
            <div style={{flex: '1', marginTop:'40px', marginLeft:'40px', marginRight:'80px'}}>
              <div>
                <div className={style.fix_head}>
                  <div className={style.line}></div>
                  <div className={style.background_head}>
                    <div className={style.head}>취업 / 기술 글 목록</div>
                    <Searchbar defaultSearchText="제목 및 내용으로 검색" onSearch={handleSearch}/>
                  </div>
                  <div className={style.neck}>
                    <SortButton text="최신순" onClick={() => handleSort('latest')} />
                    <SortButton text="인기순" onClick={() => handleSort('popular')} />
                    <SortButton text="조회순" onClick={() => handleSort('views')} />
                    <div className={style.write}>글 작성하기</div>
                  </div>
                </div>
                {/* 정렬된 데이터를 표시 */}
                {sortedPosts.filter(post => post.category === '취업').map((post, index) => (
                  <Post
                    key={post.id}
                    num={index + 1}
                    category={post.category}
                    title={post.title}
                    contents={post.contents.length > 100 ? post.contents.substring(0, 100) + '···' : post.contents}
                    createdAt={post.createdAt}
                    likes={post.likes}
                    views={post.views}
                    comment={post.comment}
                    img={post.img}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmploydementBoard;