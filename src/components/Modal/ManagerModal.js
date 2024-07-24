import React, { useState, useEffect } from 'react';
import { Button, Modal, Input, Rate } from 'antd';
import axios from 'axios';

const ManagerModal = ({ modalTitle, modalContent, isModalOpen, handleOk, handleCancel, isReviewMode, isViewOnlyMode, onReviewSubmit, reviewData }) => {
  const { TextArea } = Input;
  const [attitudeRating, setAttitudeRating] = useState(reviewData?.star1 || 0);
  const [focusRating, setFocusRating] = useState(reviewData?.star2 || 0);
  const [punctualityRating, setPunctualityRating] = useState(reviewData?.star3 || 0);
  const [reviewContent, setReviewContent] = useState(reviewData?.contents || '');
  const [isHidden, setIsHidden] = useState(reviewData?.hide || false);
  const [buttonText, setButtonText] = useState(isHidden ? '리뷰 보이기' : '리뷰 숨기기');
  const [role, setRole] = useState(null);
  const [opacity, setOpacity] = useState(1);

  useEffect(() => {
    const storedRole = parseInt(sessionStorage.getItem('role'), 10);
    setRole(storedRole);
  }, []);

  useEffect(() => {
    if (reviewData) {
      console.log("reviewData:", reviewData); // reviewData 값을 콘솔에 출력
      setAttitudeRating(reviewData.star1);
      setFocusRating(reviewData.star2);
      setPunctualityRating(reviewData.star3);
      setReviewContent(reviewData.contents);
      setIsHidden(reviewData.hide);
      setButtonText(reviewData.hide ? '리뷰 보이기' : '리뷰 숨기기');
    }
  }, [reviewData]);

  const handleReviewSubmit = () => {
    onReviewSubmit({
      attitudeRating,
      focusRating,
      punctualityRating,
      reviewContent,
    });
    handleOk();
  };

  const handleHideReview = async () => {
    const reviewId = reviewData.reviewId;
    const hideValue = isHidden ? false : true;
    try {
      const endpoint = role === 1 ? '/review/hide/mentor' : '/review/hide/mentee';
      console.log("API 요청 데이터:", {
        endpoint,
        review_id: reviewId,
        hide: hideValue,
      });

      const response = await axios.post(endpoint, null, {
        params: {
          review_id: reviewId,
          hide: hideValue,
        },
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem('accessToken')}`,
          'Content-Type': 'application/x-www-form-urlencoded'
        },
      });

      console.log("리뷰 숨기기 API 응답:", response.data);
      setIsHidden(!isHidden);
      setButtonText(isHidden ? '리뷰 숨기기' : '리뷰 보이기');
      setOpacity(isHidden ? 1 : 0.8);  // 투명도 조정
    } catch (error) {
      console.error("리뷰 숨기기 중 오류 발생:", error);
    }
  };

  const rateContainerStyle = {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '20px'
  };

  const labelStyle = {
    width: '80px', // 적당한 너비로 조정
    textAlign: 'left',
    marginRight: '10px'
  };

  return (
    <Modal
      title={modalTitle}
      visible={isModalOpen}
      onCancel={handleCancel}
      style={{ opacity: opacity }}  // 투명도 스타일 적용
      footer={
        <div style={{ display: 'flex', justifyContent: isViewOnlyMode ? 'flex-end' : 'space-between', alignItems: 'center', width: '100%' }}>
          {!isViewOnlyMode && (
            <div style={{ color: 'red', marginRight: 'auto' }}>
              <span>*</span> <span style={{ opacity: '0.7', marginLeft: '5px' }}>리뷰는 수정할 수 없습니다. 신중히 작성해주세요</span>
            </div>
          )}
          <div>
            <Button key="cancel" onClick={handleCancel}>
              취소
            </Button>
            {isViewOnlyMode && (
              <Button 
                key="hide" 
                type="primary" 
                onClick={handleHideReview}
                style={{
                  backgroundColor: '#68568E',
                  borderColor: '#68568E',
                  color: '#FFFFFF',
                  marginLeft: '10px'
                }}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = '#A499BB';
                  e.target.style.borderColor = '#A499BB';
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = '#68568E';
                  e.target.style.borderColor = '#68568E';
                }}
              >
                {buttonText}
              </Button>
            )}
            {!isViewOnlyMode && (
              <Button key="ok" type="primary" onClick={isReviewMode ? handleReviewSubmit : handleOk} style={{ marginLeft: '10px' }}>
                확인
              </Button>
            )}
          </div>
        </div>
      }
    >
      {isReviewMode ? (
        <>
          <TextArea 
            value={reviewContent}
            placeholder={role === 1 ? "선생님과의 과외 후기 내용을 적어주세요" : "학생과의 과외 후기 내용을 적어주세요"}
            rows={2}
            showCount
            maxLength={200}
            style={{
              height: 120,
              resize: 'none',
              marginTop: '10px'
            }}
            onChange={(e) => setReviewContent(e.target.value)}
            disabled={isViewOnlyMode}
          />
          <div style={{ marginTop: 20 }}>
            <div style={rateContainerStyle}>
              <span style={labelStyle}>{role === 1 ? '참여 태도' : '수업 내용'}</span>
              <Rate onChange={setAttitudeRating} value={attitudeRating} disabled={isViewOnlyMode} />
            </div>
            <div style={rateContainerStyle}>
              <span style={labelStyle}>{role === 1 ? '과제 수행' : '준비성'}</span>
              <Rate onChange={setFocusRating} value={focusRating} disabled={isViewOnlyMode} />
            </div>
            <div style={rateContainerStyle}>
              <span style={labelStyle}>시간 준수</span>
              <Rate onChange={setPunctualityRating} value={punctualityRating} disabled={isViewOnlyMode} />
            </div>
          </div>
        </>
      ) : (
        <span>{modalContent}</span>
      )}
    </Modal>
  );
};

export default ManagerModal;
