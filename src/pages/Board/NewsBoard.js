import React, { useState, useEffect } from 'react';
import { useMediaQuery } from "react-responsive";
import { useNavigate } from "react-router-dom";
import PageHeader from '../../components/Group/PageHeader/PageHeader';
import boardimg from '../../assets/images/PageHeaderImage/board.svg';
import Body from "../../components/Group/Body/Body";
import style from "../Board/Board.module.css";
import Sidebar from "../../components/Group/Sidebar/Sidebar";
import NavigateSelect from '../../components/Select/NavigateSelect';
import Searchbar from "../../components/Group/Searchbar/Searchbar";
import SortButton from '../../components/Button/SortButton';
import SortSelect from '../../components/Select/SortSelect';
import { data_board } from '../../assets/data/board'; // data_board import
import Post from '../../components/Group/Post/Post';

const NewsBoard = ({ handleSidebarButtonClick }) => {
  // 반응형 화면
  const isDesktopOrLaptop = useMediaQuery({ minWidth: 992 });
  const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 991 });
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const isNotMobile = useMediaQuery({ minWidth: 768 });

  // 페이지 이동
  const navigate = useNavigate();
  // Recoil에서 스크랩 상태 가져오기
  
  const [searchText, setSearchText] = useState("");
  const [sortedPosts, setSortedPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지 상태 추가
  const [postPerPage] = useState(20); // 페이지당 게시물 수 상태 추가

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
      case '0':
        sortedData = sortLatest(data_board);
        break;
      case '1':
        sortedData = sortPopular(data_board);
        break;
      case '2':
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

  // 페이지 변경 함수
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
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

  // 클릭된 카테고리에 따라 페이지 이동을 처리합니다.
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

  // Post 클릭 시 상세 페이지로 이동하는 함수
  const handlePostClick = (postId) => {
    navigate(`/board/detail/${postId}`);
  };

  // 현재 페이지의 게시물을 가져오는 함수
  const indexOfLastPost = currentPage * postPerPage;
  const indexOfFirstPost = indexOfLastPost - postPerPage;
  const currentPosts = sortedPosts.slice(indexOfFirstPost, indexOfLastPost);

  // 글 작성 페이지로 이동하는 함수
  const handleWritePost = () => {
    navigate("/board/form");
  };

  const maxCombinedLength = isMobile ? 20 : isTablet ? 50 : 80; // 화면 크기에 따른 최대 글자 수 설정


  return (
    <div>
      <PageHeader
      title='커뮤니티'
      subtitle="나와 비슷한 비전을 가진 사람들과의 대화"
      image={boardimg}
      />
      <div style={{
      // marginTop: isMobile ? 50 : 100,
      // marginBottom: isMobile ? 50 : 200,
      marginLeft: isMobile ? '5%' : isTablet ? 30 : '10%',
      marginRight: isMobile ? '5%' : isTablet ? 20 : '10%',
    }}>
      <div>
        <div className={style.color} >
          <div style={{display:'flex'}}>
           {!isMobile && (
            <div>
              <div className={style.fix_left}>
                <Sidebar onCategoryClick={handleCategoryClick} titles={["전체", "자유", "뉴스", "질문 / 공부", "취업 / 기술", "플리마켓"]} />
                <div></div>
              </div>
            </div> )}
            <div style={{flex: '1', marginTop:'40px', marginLeft:'40px', marginRight:'40px'}}>
              <div>
                <div>
                  {isMobile && 
                  <div>
                    <div className={style.head} style={{fontSize: isDesktopOrLaptop ? '25px' : '20px', marginBottom:'10px' }}>뉴스 글 목록</div>
                    <Searchbar defaultSearchText="제목 및 내용으로 검색" onSearch={handleSearch}/>
                  </div>}
                  {!isMobile && <div className={style.background_head}>
                    <div className={style.head} style={{fontSize: isDesktopOrLaptop ? '25px' : '20px' }}>뉴스 글 목록</div>
                    <Searchbar defaultSearchText="제목 및 내용으로 검색" onSearch={handleSearch}/>
                  </div>}
                  <div className={style.neck}>
                    {!isMobile && (
                    <div className={style.sort}> 
                      <SortButton text="최신순" onClick={() => handleSort('0')} />
                      <SortButton text="인기순" onClick={() => handleSort('1')} />
                      <SortButton text="조회순" onClick={() => handleSort('2')} />
                    </div>
                    )}
                    {isMobile && (
                      <div style={{display:'flex'}}>
                        <NavigateSelect
                         placeholder="게시판"
                         options={[
                           { value: '전체', label: '전체' },
                           { value: '자유', label: '자유' },
                           { value: '뉴스', label: '뉴스' },
                           { value: '질문 / 공부', label: '질문' },
                           { value: '취업 / 기술', label: '취업' },
                           { value: '플리마켓', label: '플리마켓' }
                          ]}
                         onChange={(newValue) => handleCategoryClick(newValue)}
                        />
                        <SortSelect
                        placeholder="정렬순"
                        options={[
                            { value: '0', label: '최신순' },
                            { value: '1', label: '인기순' },
                            { value: '2', label: '조회순' }
                          ]}
                        onChange={(newValue) => handleSort(newValue)}
                        />
                      </div>
                    )}
                    
                    <div className={style.write} onClick={handleWritePost}>글 작성하기</div>
                  </div>
                </div>
                {/* 정렬된 데이터를 표시 */}
                {sortedPosts.filter(post => post.category === '뉴스').map((post, index) => (
                  <Post
                    key={post.id}
                    id={post.id}
                    num={index + 1}
                    category={post.category}
                    title={post.title}
                    contents={ post.contents.length > maxCombinedLength - post.title.length
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
                    scraped={post.scraped} // 스크랩 상태를 props로 전달
                    onClick={() => handlePostClick(post.id)} // 클릭 시 상세 페이지로 이동하는 함수 전달
                  />
                ))}
              </div>
              {/* 페이지네이션 */}
              <div className={style.foot}>
                {[...Array(Math.ceil(sortedPosts.length / postPerPage)).keys()].map((number) => (
                  <div className={`${style.page} ${currentPage === number + 1 ? style.active : ''}`} key={number} onClick={() => paginate(number + 1)}>
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
  );
};

export default NewsBoard;
