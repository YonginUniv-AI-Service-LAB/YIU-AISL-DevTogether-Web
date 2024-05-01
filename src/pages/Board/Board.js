import React, { useState, useEffect } from 'react';
import { useMediaQuery } from "react-responsive";
import { useNavigate } from "react-router-dom";
import Body from "../../components/Group/Body/Body";
import style from "../Board/Board.module.css";
import Sidebar from "../../components/Group/Sidebar/Sidebar";
import Searchbar from "../../components/Group/Searchbar/Searchbar";
import SortButton from '../../components/Button/SortButton';
import FilterTag from '../../components/Group/Filtertag/Filtertag';
import { data_board } from '../../assets/data/board'; // data_board import
import Post from '../../components/Group/Post/Post';

const BoardPage = ({ handleSidebarButtonClick }) => {
  // 반응형 화면
  const isDesktopOrLaptop = useMediaQuery({ minWidth: 992 });
  const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 991 });
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const isNotMobile = useMediaQuery({ minWidth: 768 });

  // 페이지 이동
  const navigate = useNavigate();
  const [searchText, setSearchText] = useState("");
  const [isSearchApplied, setIsSearchApplied] = useState(false);

  const handleSearch = (searchValue) => {
    setSearchText(searchValue);
  };

  // 데이터 정렬 상태
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
        sortedData = sortLatest(sortedPosts);
        break;
      case 'popular':
        sortedData = sortPopular(sortedPosts);
        break;
      case 'views':
        sortedData = sortViews(sortedPosts);
        break;
      default:
        break;
    }

    setSortedPosts(sortedData);
  };

  // 초기 데이터 로드 및 정렬
  useEffect(() => {
    // 최신순으로 정렬
    const sortedData = sortLatest(data_board); // data_board 사용
    setSortedPosts(sortedData);
  }, []); // 빈 배열을 전달하여 한 번만 실행되도록 설정

  return (
    <div className={style.background2}>
      <div style={{paddingBottom:'200px'}}></div>
      <div>
      <Body
      sentence1="나와 비슷한 비전을 가진 사람들과의 대화"
      sentence2="일상적인 이야기부터 필요한 다양한 정보까지"
      title="커뮤니티"
      imageSrc="./board.png" // 이미지 경로를 전달합니다.
      />
      <div className={style.color}>
            <div className={style.background}>
                <Sidebar onClick={handleSidebarButtonClick} title1 ="전체 게시판" title2="자유 게시판" title3="취업 게시판" title4="기술 게시판" title5="장터 게시판"/>
                <div style={{flex: '1', marginTop:'40px', marginLeft:'80px', marginRight:'80px'}}>
                    <div className={style.fix}>
                        <div className={style.line}></div>
                        <div className={style.background_head}>
                            <div className={style.head}>전체 글 목록</div>
                            <Searchbar defaultSearchText="제목 및 내용으로 검색" onSearch={handleSearch}/>
                        </div>
                        <div className={style.background}>
                          <SortButton text="최신순" onClick={() => handleSort('latest')} />
                          <SortButton text="추천순" onClick={() => handleSort('popular')} />
                          <SortButton text="조회순" onClick={() => handleSort('views')} />
                        </div>
                      

                        {/* 정렬된 데이터를 표시 */}
                        {sortedPosts.map(post => (
                          <Post
                          key = {post.id}
                          category = {post.category}
                          title = {post.title}
                          createdAt = {post.createdAt}
                          likes = {post.likes}
                          views = {post.views}
                          comment = {post.comment}
                          img = {post.img}
                          />
                        ))}
                    </div>
                </div>
                <div className={style.best}>
                  <div className={style.best_contents}>오늘의 Best 글</div>
                </div>
            </div>
        </div>
    </div>
    </div>
  );
};

export default BoardPage;
