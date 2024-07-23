import React, { useEffect, useState } from 'react';
import style from './UserDetail.module.css';
import Review from '../../../components/Group/Review/Review';

const Reviewinfo = ({ isEditing }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [reviews, setReviews] = useState([]);
  const [hiddenReviews, setHiddenReviews] = useState([]);
  const reviewPerPage = 20;

  useEffect(() => {
    const fetchReviews = async () => {
      const role = sessionStorage.getItem('role');
      const endpoint = role === '1' ? '/review/receive/mentor' : '/review/receive/mentee';

      try {
        const response = await fetch(endpoint, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${sessionStorage.getItem('accessToken')}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setReviews(data);
        } else {
          console.error('리뷰 조회 실패:', response.status);
        }
      } catch (error) {
        console.error('리뷰 조회 중 오류 발생:', error);
      }
    };

    fetchReviews();
  }, []);

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

  return (
    <div className={style.contents}>
      <div style={{ marginTop: '30px', marginLeft: '10px' }}>
        <div style={{ fontSize: '20px', fontWeight: '900', marginBottom: '30px' }}>후기 정보</div>
        {currentReviews.map((review, index) => (
          <Review
            key={review.reviewId}
            id={review.reviewId}
            num={index + 1}
            title={review.title}
            contents={review.contents}
            createdAt={formatDateString(review.reviewCreatedAt)}
            img={review.img}
            nickname={review.userProfileId.nickname}
            userImage={review.userProfileId.files ? '/path/to/user/image' : null}
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
        ))}
      </div>
    </div>
  );
};

export default Reviewinfo;
