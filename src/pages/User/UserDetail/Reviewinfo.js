import React, { useState } from "react";
import style from "./UserDetail.module.css";
import { data_review } from '../../../assets/data/Review';
import Review from "../../../components/Group/Review/Review";

const Reviewinfo = ({ isEditing }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const reviewPerPage = 20;
  const [hiddenReviews, setHiddenReviews] = useState([]);

  const indexOfLastReview = currentPage * reviewPerPage;
  const indexOfFirstReview = indexOfLastReview - reviewPerPage;
  const currentReviews = data_review.slice(indexOfFirstReview, indexOfLastReview);

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
        {currentReviews.map((review, index) => (
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
            isHidden={hiddenReviews.includes(review.id)}
            onHide={handleHide}
          />
        ))}
      </div>
    </div>
  );
};

export default Reviewinfo;
