import React, { useState, useEffect } from "react";
import { useMediaQuery } from "react-responsive";
import { useNavigate } from "react-router-dom";
import PageHeader from "../../components/Group/PageHeader/PageHeader";
import boardimg from "../../assets/images/PageHeaderImage/board.svg";
import Body from "../../components/Group/Body/Body";
import style from "../Board/Board.module.css";
import Sidebar from "../../components/Group/Sidebar/Sidebar";
import NavigateSelect from "../../components/Select/NavigateSelect";
import Searchbar from "../../components/Group/Searchbar/Searchbar";
import SortButton from "../../components/Button/SortButton";
import SortSelect from "../../components/Select/SortSelect";
import Post from "../../components/Group/Post/Post";
import { useRecoilState } from "recoil";
import { useQuery } from "@tanstack/react-query";
import { defaultAPI } from "../../api";
import LoadingSpin from "../../components/Spin/LoadingSpin";
import GetDataErrorView from "../../components/Result/GetDataError";
import dayjs from "dayjs";
import { CurrentBoardIdAtom } from "../../recoil/atoms/post";

const BoardPage = ({ handleSidebarButtonClick }) => {
  const isDesktopOrLaptop = useMediaQuery({ minWidth: 992 });
  const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 991 });
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const isNotMobile = useMediaQuery({ minWidth: 768 });

  const navigate = useNavigate();

  const [searchText, setSearchText] = useState("");
  const [sortedPosts, setSortedPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postPerPage] = useState(20);
  const [currentCategory, setCurrentCategory] = useState("전체");

  const [curBoardId, setBoardId] = useRecoilState(CurrentBoardIdAtom);

  const {
    data: board,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["board"],
    queryFn: async () => {
      const res = await defaultAPI.get("/board");
      return res.data;
    },
  });

  useEffect(() => {
    if (board) {
      console.log("Fetched board data:", board);
      const filteredData = filterByCategory(board, currentCategory);
      console.log("Filtered data based on current category:", filteredData);
      const sortedData = sortLatest(filteredData);
      setSortedPosts(sortedData);
    }
  }, [board, currentCategory]);

  const sortLatest = (data) => {
    return data.slice().sort((a, b) => {
      return new Date(b.createdAt) - new Date(a.createdAt);
    });
  };

  const sortPopular = (data) => {
    return data.slice().sort((a, b) => {
      return b.likeCount - a.likeCount;
    });
  };

  const handleSort = (sortType) => {
    if (!sortedPosts) return;
    let sortedData = [];

    switch (sortType) {
      case "0":
        sortedData = sortLatest(sortedPosts);
        break;
      case "1":
        sortedData = sortPopular(sortedPosts);
        break;
      default:
        break;
    }

    setSortedPosts(sortedData);
  };

  useEffect(() => {
    if (board) {
      const sortedData = sortLatest(board);
      setSortedPosts(sortedData);
    }
  }, [board]);

  useEffect(() => {
    if (searchText.trim() === "") {
      if (board) {
        const filteredData = filterByCategory(board, currentCategory);
        setSortedPosts(sortLatest(filteredData));
      }
    } else {
      if (board) {
        const filteredData = filterPosts(board, searchText);
        const filteredByCategoryData = filterByCategory(filteredData, currentCategory);
        const sortedData = sortLatest(filteredByCategoryData);
        setSortedPosts(sortedData);
      }
    }
  }, [searchText, board, currentCategory]);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const filterPosts = (posts, searchText) => {
    return posts.filter(
      (post) =>
        post.title.includes(searchText) || post.contents.includes(searchText)
    );
  };

  const filterByCategory = (posts, category) => {
    if (category === "전체") return posts;
    return posts.filter(post => post.category === category);
  };

  const handleSearch = (searchValue) => {
    setSearchText(searchValue);
  };

  const handleCategoryClick = (category) => {
    const categoryMapping = {
      "전체": "전체",
      "자유": "자유",
      "뉴스": "뉴스",
      "질문 / 공부": "질문공부",
      "취업 / 기술": "취업기술",
      "플리마켓": "플리마켓"
    };
    setCurrentCategory(categoryMapping[category]);
    console.log("Selected category:", categoryMapping[category]);
  };

  const handlePostClick = (postId) => {
    console.log("이동합니다: ", postId);
    setBoardId(postId);
    navigate(`/board/detail/${postId}`);
  };

  const indexOfLastPost = currentPage * postPerPage;
  const indexOfFirstPost = indexOfLastPost - postPerPage;
  const currentPosts = sortedPosts.slice(indexOfFirstPost, indexOfLastPost);

  const handleWritePost = () => {
    navigate("/board/form");
  };

  const maxCombinedLength = isMobile ? 20 : isTablet ? 50 : 80;

  const categoryTitle = {
    "전체": "전체 글 목록",
    "자유": "자유 글 목록",
    "뉴스": "뉴스 글 목록",
    "질문공부": "질문 글 목록",
    "취업기술": "취업 글 목록",
    "플리마켓": "마켓 글 목록"
  };

  if (isLoading) return <LoadingSpin />;
  if (error) return <GetDataErrorView />;

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
          marginRight: isMobile ? "5%" : isTablet ? 20 : "12%",
        }}
      >
        <div>
          <div className={style.line}></div>
          <div className={style.color}>
            <div style={{ display: "flex" }}>
              {!isMobile && (
                <div>
                  <div className={style.fix_left}>
                    <Sidebar
                      onCategoryClick={handleCategoryClick}
                      titles={[
                        "전체",
                        "자유",
                        "뉴스",
                        "질문 / 공부",
                        "취업 / 기술",
                        "플리마켓",
                      ]}
                    />
                    <div></div>
                  </div>
                </div>
              )}
              <div
                style={{
                  flex: "1",
                  marginTop: "40px",
                  marginLeft: "40px",
                  marginRight: "40px",
                }}
              >
                <div>
                  <div>
                    {isMobile && (
                      <div>
                        <div
                          className={style.head}
                          style={{
                            fontSize: isDesktopOrLaptop ? "25px" : "20px",
                            marginBottom: "10px",
                          }}
                        >
                          {categoryTitle[currentCategory]}
                        </div>
                        <Searchbar
                          defaultSearchText="제목 및 내용으로 검색"
                          onSearch={handleSearch}
                        />
                      </div>
                    )}
                    {!isMobile && (
                      <div className={style.background_head}>
                        <div
                          className={style.head}
                          style={{
                            fontSize: isDesktopOrLaptop ? "25px" : "20px",
                          }}
                        >
                          {categoryTitle[currentCategory]}
                        </div>
                        <Searchbar
                          defaultSearchText="제목 및 내용으로 검색"
                          onSearch={handleSearch}
                        />
                      </div>
                    )}
                    <div className={style.neck}>
                      {!isMobile && (
                        <div className={style.sort}>
                          <SortButton
                            text="최신순"
                            onClick={() => handleSort("0")}
                          />
                          <SortButton
                            text="인기순"
                            onClick={() => handleSort("1")}
                          />
                        </div>
                      )}
                      {isMobile && (
                        <div style={{ display: "flex", alignItems: "center" }}>
                          <NavigateSelect
                            placeholder="게시판"
                            options={[
                              { value: "전체", label: "전체" },
                              { value: "자유", label: "자유" },
                              { value: "뉴스", label: "뉴스" },
                              { value: "질문공부", label: "질문" },
                              { value: "취업기술", label: "취업" },
                              { value: "플리마켓", label: "플리마켓" },
                            ]}
                            onChange={(newValue) =>
                              handleCategoryClick(newValue)
                            }
                          />
                          <SortSelect
                            placeholder="정렬순"
                            options={[
                              { value: "0", label: "최신순" },
                              { value: "1", label: "인기순" },
                            ]}
                            onChange={(newValue) => handleSort(newValue)}
                          />
                        </div>
                      )}

                      {sessionStorage.getItem("role") == 1 ||
                      sessionStorage.getItem("role") == 2 ? (
                        <div className={style.write} onClick={handleWritePost}>
                          글 작성하기
                        </div>
                      ) : null}
                    </div>
                  </div>
                  {currentPosts
                    .filter(post => currentCategory === "전체" || post.category === currentCategory)
                    .map((post, index) => {
                      const isScraped = post.scrapPeople.includes(parseInt(sessionStorage.getItem("user_profile_id")));
                      return (
                        <Post
                          key={post.boardId}
                          id={post.boardId}
                          num={index + 1}
                          category={post.category}
                          title={post.title}
                          contents={
                            post.contents.length >
                            maxCombinedLength - post.title.length
                              ? post.contents.substring(
                                  0,
                                  maxCombinedLength - post.title.length
                                ) + "..."
                              : post.contents
                          }
                          createdAt={dayjs(post.createdAt).format("YYYY.MM.DD")}
                          likes={post.likeCount}
                          comment={post.countComment}
                          img={post.img}
                          nickname={post.userProfileId["nickname"]}
                          userImage={post.userImage}
                          introduction={post.userProfileId["introduction"]}
                          scraped={isScraped}
                          onClick={() => {
                            console.log("post: ", post);
                            setBoardId(post.boardId);
                            navigate(`/board/detail/${post.boardId}`);
                          }}
                          showBookmark={true}
                          showMenu={false}
                        />
                      );
                    })}
                </div>
                <div className={style.foot}>
                  {[
                    ...Array(
                      Math.ceil(sortedPosts.length / postPerPage)
                    ).keys(),
                  ].map((number) => (
                    <div
                      className={`${style.page} ${
                        currentPage === number + 1 ? style.active : ""
                      }`}
                      key={number}
                      onClick={() => paginate(number + 1)}
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
  );
};

export default BoardPage;
