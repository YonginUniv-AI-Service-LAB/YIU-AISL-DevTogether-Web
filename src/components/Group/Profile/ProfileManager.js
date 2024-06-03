import React, { useState } from "react";
import style from "./Profile.module.css";
import MoreButton from "../../Button/MoreButton";
import ScrapButton from "../../Button/ScrapButton";
import { useMediaQuery } from "react-responsive";
import { Badge } from 'antd';
import { data_mentee } from "../../../assets/data/mentee";
import { data_mentor } from "../../../assets/data/mentor";
import ManagerModal from '../../../components/Modal/ManagerModal';

const formatDate = (date) => {
  const d = new Date(date);
  const year = d.getFullYear().toString().slice(-2);
  const month = (d.getMonth() + 1).toString().padStart(2, '0');
  const day = d.getDate().toString().padStart(2, '0');
  return `${year}.${month}.${day}`;
};

const ProfileManager = ({ imagepath, imagetext, nickname, subject, startDate, endDate, status: initialStatus, onStatusChange }) => {
  const isMobile = useMediaQuery({ maxWidth: 767 });

  const [formData, setFormData] = useState(data_mentee[2]);
  const [status, setStatus] = useState(initialStatus);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [modalContent, setModalContent] = useState('');
  const [isReviewMode, setIsReviewMode] = useState(false);

  const user = formData;

  const handleFunction = () => {
    if (status === "신청") {
      setModalTitle('신청 취소');
      setModalContent('정말 신청을 취소하시겠습니까?');
      setIsReviewMode(false);
      setIsModalOpen(true);
    } else if (status === "진행") {
      setModalTitle('과외 종료');
      setModalContent('정말 과외를 종료하시겠습니까?');
      setIsReviewMode(false);
      setIsModalOpen(true);
    } else if (status === "종료") {
      setModalTitle('리뷰 작성');
      setIsReviewMode(true);
      setIsModalOpen(true);
    }
  };

  const handleOk = () => {
    setIsModalOpen(false);
    if (status === "신청") {
      onStatusChange(nickname); 
    } else if (status === "진행") {
      setStatus('종료');
    } else if (status === "종료") {
      setStatus('종료됨');
      onStatusChange(nickname, '종료됨'); 
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <div className={style.managebg} style={{ width: isMobile ? '176px' : '200px' }}>
        <div className={`${style.managercircle} ${style.managercircleImage}`}>
          <img src={imagepath} alt={imagetext} />
        </div>
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginRight: '15px' }}>
          <Badge style={{ marginTop: '50px' }} color={status === "신청" ? "blue" : status === "진행" ? "green" : "red"} text={status === "신청" ? "신청중" : status === "진행" ? "과외중" : "종료"} />
        </div>
        <div className={style.information}>
          <span style={{ fontWeight: '900' }}>{nickname}</span><br />
          <span style={{ fontSize: isMobile ? '12px' : '15px' }}>{subject}</span><br />
          {status !== '신청' ? (
            <>
              <span style={{ fontSize: isMobile ? '12px' : '15px' }}>
                {formatDate(startDate)} ~ {status === "진행" ? "" : formatDate(endDate)}
              </span><br />
            </>
          ) : (
            <>
              <span style={{ fontSize: isMobile ? '12px' : '15px' }}>
                신청 진행중
              </span><br />
            </>
          )}
        </div>
      </div>
      <div className={style.process}>
        <div className={`${style.ing} ${status === "종료됨" ? style.fullWidth : ""}`}>
          {status === "신청" ? "신청중" : status === "진행" ? "과외중" : "종료됨"}
        </div>
        {status !== "종료됨" && (
          <div className={style.end} onClick={handleFunction}>
            {status === "신청" ? "신청 취소" : status === "진행" ? "과외 종료" : "리뷰 작성"}
          </div>
        )}
      </div>

      <ManagerModal
        modalTitle={modalTitle}
        modalContent={modalContent}
        isModalOpen={isModalOpen}
        handleOk={handleOk}
        handleCancel={handleCancel}
        role={user.role}
        isReviewMode={isReviewMode}
      />
    </div>
  );
};

export default ProfileManager;
