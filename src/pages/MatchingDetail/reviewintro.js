import React, { useState } from "react";
import style from "./MatchingDetail.module.css";
import Review from "../../components/Group/Review/Review";
import { useMediaQuery } from "react-responsive";

const Reviewintro = ({ profile, isEditing }) => {

  const isDesktopOrLaptop = useMediaQuery({ minWidth: 992 });
  const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 991 });
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const isNotMobile = useMediaQuery({ minWidth: 768 });

  // reviews가 존재하지 않을 경우 빈 배열을 기본 값으로 설정합니다.
  const reviews = profile.reviews || [];
  const [currentPage, setCurrentPage] = useState(1);
  const reviewPerPage = 20;
  const [hiddenReviews, setHiddenReviews] = useState([]);

  const indexOfLastReview = currentPage * reviewPerPage;
  const indexOfFirstReview = indexOfLastReview - reviewPerPage;
  const currentReviews = reviews.slice(indexOfFirstReview, indexOfLastReview);

  const handleHide = (id, isHidden) => {
    if (isHidden) {
      setHiddenReviews([...hiddenReviews, id]);
    } else {
      setHiddenReviews(hiddenReviews.filter(reviewId => reviewId !== id));
    }
  };

  return (
    <div className={style.contents}>
      <div style={{ marginTop: '30px', marginLeft: '10px' }}>
        <div style={{ fontSize: '20px', fontWeight: '900', marginBottom:'30px' }}>후기 정보</div>
        {currentReviews.length > 0 ? (
          currentReviews.map((review, index) => (
            <Review
              key={review.id}
              id={review.id}
              num={index + 1}
              title={review.title}
              contents={review.contents}
              createdAt={review.createdAt}
              img={review.img}
              nickname={review.nickname}
              userImage={review.userImage}
              introduction={review.introduction}
              preparerating={review.preparerating}
              studyrating={review.studyrating}
              timerating={review.timerating}
              startDate={review.startDate}
              endDate={review.endDate}
              onClick={() => console.log(`Review ${review.id} clicked`)}
              showMenu={true}
            />
          ))
        ) : (
          <div style={{ display: 'flex', justifyContent: 'center', marginTop: '100px', color: '#444444', fontSize: '16px' }}>
            등록된 후기가 없습니다.
          </div>
        )}
      </div>
    </div>
  );
};

export default Reviewintro;
