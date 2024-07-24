import React, { useState } from "react";
import style from "./MatchingDetail.module.css";
import Review from "../../components/Group/Review/Review";
import { useMediaQuery } from "react-responsive";

const Reviewintro = ({ profile, reviews, isEditing }) => {
  const isDesktopOrLaptop = useMediaQuery({ minWidth: 992 });
  const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 991 });
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const isNotMobile = useMediaQuery({ minWidth: 768 });

  const [currentPage, setCurrentPage] = useState(1);
  const [hiddenReviews, setHiddenReviews] = useState([]);
  const reviewPerPage = 20;

  const handleHide = (id, isHidden) => {
    if (isHidden) {
      setHiddenReviews([...hiddenReviews, id]);
    } else {
      setHiddenReviews(hiddenReviews.filter(reviewId => reviewId !== id));
    }
  };

  const formatDateString = (dateString) => {
    return dateString.split('T')[0];
  };

  const indexOfLastReview = currentPage * reviewPerPage;
  const indexOfFirstReview = indexOfLastReview - reviewPerPage;
  const currentReviews = reviews.slice(indexOfFirstReview, indexOfLastReview);

  console.log("Profile Data: ", profile); // profile 데이터 확인
  console.log("Reviews: ", reviews); // 리뷰 데이터 확인

  return (
    <div className={style.contents}>
      <div style={{ marginTop: '30px', marginLeft: '10px' }}>
        <div style={{ fontSize: '20px', fontWeight: '900', marginBottom: '30px' }}>후기 정보</div>
        {currentReviews.length > 0 ? (
          currentReviews.map((review, index) => {
            console.log("Review data:", review); // 각 리뷰 데이터 확인
            return (
              <Review
                key={review.reviewId}
                id={review.reviewId}
                num={index + 1}
                title={review.contents} 
                contents={review.contents}
                createdAt={formatDateString(review.reviewCreatedAt)}
                img={review.img}
                nickname={review.userProfileId.nickname}
                userImage={review.userProfileId.filesResponseDto && review.userProfileId.filesResponseDto.fileData
                  ? `data:image/png;base64,${review.userProfileId.filesResponseDto.fileData}`
                  : null}
                introduction={review.userProfileId.introduction}
                preparerating={review.star1}
                studyrating={review.star2}
                timerating={review.star3}
                startDate={formatDateString(review.createdAt)}
                endDate={formatDateString(review.endedAt)}
                onClick={() => console.log(`Review ${review.reviewId} clicked`)}
                showMenu={true}
                isHidden={hiddenReviews.includes(review.reviewId)}
                onHide={handleHide}
              />
            );
          })
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
