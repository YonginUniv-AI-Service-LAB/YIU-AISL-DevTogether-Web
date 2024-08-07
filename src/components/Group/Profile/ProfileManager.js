import React, { useState, useEffect } from "react";
import axios from "axios";
import style from "./Profile.module.css";
import { useMediaQuery } from "react-responsive";
import { Badge } from 'antd';
import ManagerModal from '../../../components/Modal/ManagerModal';
import AltImage from "../../../assets/images/devtogether_logo.png"; // 대체 이미지 임포트

const formatDate = (dateString) => {
  const d = new Date(dateString);
  if (isNaN(d.getTime())) {
    console.error("Invalid date:", dateString);
    return "Invalid Date";
  }
  const year = d.getFullYear().toString().slice(-2);
  const month = (d.getMonth() + 1).toString().padStart(2, '0');
  const day = d.getDate().toString().padStart(2, '0');
  return `${year}.${month}.${day}`;
};

const ProfileManager = ({ matchingId, nickname, subject, startDate, endDate, status: initialStatus, onStatusChange, imagepath, check }) => {
  const isMobile = useMediaQuery({ maxWidth: 767 });

  const [status, setStatus] = useState(initialStatus);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [modalContent, setModalContent] = useState('');
  const [isReviewMode, setIsReviewMode] = useState(false);
  const [isViewOnlyMode, setIsViewOnlyMode] = useState(false);
  const [subjectText, setSubjectText] = useState(subject);
  const [user, setUser] = useState(null); 
  const [reviewData, setReviewData] = useState(null);
  const role = parseInt(sessionStorage.getItem('role'), 10);

  useEffect(() => {
    if ((role === 1 && (check === 1 || check === 3)) || (role === 2 && (check === 2 || check === 3))) {
      setStatus('종료됨');
    }
  }, [role, check]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let matchingResponse;
        if (role === 2) {
          matchingResponse = await axios.get('/user/matching/mentor', {
            headers: {
              Authorization: `Bearer ${sessionStorage.getItem('accessToken')}`,
            },
          });
        } else if (role === 1) {
          matchingResponse = await axios.get('/user/matching/mentee', {
            headers: {
              Authorization: `Bearer ${sessionStorage.getItem('accessToken')}`,
            },
          });
        }
  
        let matchedUserProfileId;
        if (role === 1) {
          matchedUserProfileId = matchingResponse.data.find(match => match.matchingId === matchingId)?.mentee;
        } else if (role === 2) {
          matchedUserProfileId = matchingResponse.data.find(match => match.matchingId === matchingId)?.mentor;
        }
  
        if (matchedUserProfileId) {
          let userResponse;
          if (role === 1) {
            userResponse = await axios.get('/mentee', {
              headers: {
                Authorization: `Bearer ${sessionStorage.getItem('accessToken')}`,
              },
            });
          } else if (role === 2) {
            userResponse = await axios.get('/mentor', {
              headers: {
                Authorization: `Bearer ${sessionStorage.getItem('accessToken')}`,
              },
            });
          }
  
          const matchedUser = userResponse.data.find(user => parseInt(user.userProfileId) === parseInt(matchedUserProfileId, 10));
          setUser(matchedUser);
        }
      } catch (error) {
        console.error("Failed to fetch user data:", error);
      }
    };
  
    fetchData();
  }, [role, matchingId]);

  useEffect(() => {
    const truncateText = (text, maxWidth, font) => {
      const canvas = document.createElement("canvas");
      const context = canvas.getContext("2d");
      context.font = font;
      const ellipsis = " 외 ";
      const words = text.split(", ");
      let truncated = "";
      let truncatedWidth = 0;

      for (let i = 0; i < words.length; i++) {
        const word = words[i];
        const newTruncated = truncated ? `${truncated}, ${word}` : word;
        const newWidth = context.measureText(newTruncated + ellipsis + (words.length - i - 1) + "개").width;

        if (newWidth > maxWidth) {
          return truncated + ellipsis + (words.length - i) + "개";
        }

        truncated = newTruncated;
        truncatedWidth = newWidth;
      }

      return truncated;
    };

    const maxWidth = isMobile ? 150 : 180;
    const font = isMobile ? "12px Arial" : "15px Arial";

    setSubjectText(truncateText(subject, maxWidth, font));
  }, [subject, isMobile]);

  const handleFunction = async () => {
    if (status === "신청") {
      setModalTitle('신청 취소');
      setModalContent('정말 신청을 취소하시겠습니까?');
      setIsReviewMode(false);
      setIsModalOpen(true);
    } else if (status === "성사됨") {
      setModalTitle('과외 확정');
      setModalContent('정말 과외를 확정하시겠습니까?');
      setIsReviewMode(false);
      setIsModalOpen(true);
    } else if (status === "진행") {
      setModalTitle('과외 종료');
      setModalContent('정말 과외를 종료하시겠습니까?');
      setIsReviewMode(false);
      setIsModalOpen(true);
    } else if (status === "완료") {
      setModalTitle('리뷰 작성');
      setIsReviewMode(true);
      setIsModalOpen(true);
      setIsViewOnlyMode(false);
    } else if (status === "종료됨") {
      setModalTitle('리뷰 보기');
      setIsReviewMode(true);
      setIsModalOpen(true);
      setIsViewOnlyMode(true);
      await fetchReviewData(); // 종료된 상태에서는 리뷰 데이터를 가져옴
    }
  };

  const fetchReviewData = async () => {
    try {
      const endpoint = role === 1 ? '/review/send/mentor' : '/review/send/mentee';
      const response = await axios.get(endpoint, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem('accessToken')}`,
        },
      });

      const review = response.data.find(review => review.matchingId === matchingId);
      setReviewData(review);
    } catch (error) {
      console.error("리뷰 조회 중 오류 발생:", error);
    }
  };

  const handleOk = async () => {
    setIsModalOpen(false);
    if (status === "신청") {
      try {
        console.log("매칭 취소 API 호출");
        console.log("matchingId:", matchingId);
        const response = await axios.delete('/matching/application', {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem('accessToken')}`,
            'Content-Type': 'application/x-www-form-urlencoded'
          },
          data: new URLSearchParams({ matchingId }),
        });

        console.log("매칭 취소 API 응답:", response.data);

        onStatusChange(matchingId);
      } catch (error) {
        console.error("매칭 취소 중 오류 발생:", error);
      }
    } else if (status === "성사됨") {
      setStatus('진행');
    } else if (status === "진행") {
      try {
        console.log("매칭 종료 API 호출");
        console.log("matchingId:", matchingId);
        const response = await axios.post('/matching/end', new URLSearchParams({ matchingId }), {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem('accessToken')}`,
            'Content-Type': 'application/x-www-form-urlencoded'
          },
        });

        console.log("매칭 종료 API 응답:", response.data);

        setStatus('완료');
        onStatusChange(matchingId, '완료');
      } catch (error) {
        console.error("매칭 종료 중 오류 발생:", error);
      }
    } else if (status === "완료") {
      setStatus('종료됨');
      onStatusChange(matchingId, '종료됨');
    }
  };

  const handleReviewSubmit = async (reviewData) => {
    const { attitudeRating, focusRating, punctualityRating, reviewContent } = reviewData;
    
    try {
      const endpoint = role === 1 ? '/review/mentor' : '/review/mentee';
      const response = await axios.post(endpoint, new URLSearchParams({
        matchingId: matchingId,
        contents: reviewContent,
        star1: attitudeRating,
        star2: focusRating,
        star3: punctualityRating,
      }), {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem('accessToken')}`,
          'Content-Type': 'application/x-www-form-urlencoded'
        },
      });
  
      console.log("리뷰 작성 API 응답:", response.data);
  
      setStatus('종료됨');
      onStatusChange(matchingId, '종료됨');
    } catch (error) {
      console.error("리뷰 작성 중 오류 발생:", error);
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const imagePath = user && user.imgDto && user.imgDto.fileData ? `data:image/png;base64,${user.imgDto.fileData}` : AltImage;

  return (
    <div>
      <div className={style.managebg} style={{ width: isMobile ? '176px' : '220px' }}>
        <div className={`${style.managercircle} ${style.managercircleImage}`}>
          <img src={imagePath} alt="프로필 이미지" />
        </div>
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginRight: '15px' }}>
          <Badge style={{ marginTop: '50px' }} color={
            status === "신청" ? "blue" :
            status === "성사됨" ? "blue" :
            status === "진행" ? "green" :
            status === "완료" ? "red" : "grey"
          } text={
            status === "신청" ? "신청중" :
            status === "성사됨" ? "확정대기" :
            status === "진행" ? "진행중" :
            status === "완료" ? "완료" : "종료됨"
          } />
        </div>
        <div style={{fontSize: isMobile ? '12px' : '15px'}} className={style.information}>
          <span style={{ fontWeight: '900' }}>{user?.nickname || nickname}</span><br />
          <span>{user?.name}</span> <span style={{ opacity: '0.3' }}>|</span> <span> {user?.gender === '남' ? "남자" : "여자"} </span> <span style={{ opacity: '0.3' }}>|</span> <span>{user?.age}세</span> <br />
          <span style={{ fontSize: isMobile ? '12px' : '15px' }}>{subjectText}</span><br />
          {status !== '신청' && (
            <span style={{ fontSize: isMobile ? '12px' : '15px' }}>
              {(startDate)} ~ {status === "진행" ? "" : (endDate)}
            </span>
          )}<br />
        </div>
      </div>
      <div style={{fontSize: isMobile ? '12px' : '15px'}} className={style.process}>
        <div className={`${style.ing} ${status === "진행" ? style.one : ""}`}>
          {status === "신청" ? "신청중" : status === "성사됨" ? "확정대기" : status === "진행" ? "진행중" : "종료됨"}
        </div>
        {status !== "성사됨" && (
          <>
            {status === "신청" && (
              <div className={style.end} onClick={handleFunction}>
                신청 취소
              </div>
            )}
            {status === "진행" && role === 1 && (
              <div className={style.end} onClick={handleFunction}>
                과외 종료
              </div>
            )}
            {status === "완료" && (
              <div className={style.end} onClick={handleFunction}>
                리뷰 작성
              </div>
            )}
            {status === "종료됨" && (
              <div className={style.end} onClick={handleFunction}>
                리뷰 보기
              </div>
            )}
          </>
        )}
      </div>

      <ManagerModal
        modalTitle={modalTitle}
        modalContent={modalContent}
        isModalOpen={isModalOpen}
        handleOk={handleOk}
        handleCancel={handleCancel}
        isReviewMode={isReviewMode}
        isViewOnlyMode={isViewOnlyMode}
        onReviewSubmit={handleReviewSubmit} // 리뷰 제출 핸들러 추가
        reviewData={reviewData}
      />
    </div>
  );
};

export default ProfileManager;
