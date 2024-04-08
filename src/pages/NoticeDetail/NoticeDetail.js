import React from "react";
import { useMediaQuery } from "react-responsive";
import { useNavigate } from "react-router-dom";

const NoticeDetailPage = () => {
  // 반응형 화면
  const isDesktopOrLaptop = useMediaQuery({ minWidth: 992 });
  const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 991 });
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const isNotMobile = useMediaQuery({ minWidth: 768 });

  // 페이지 이동
  const navigate = useNavigate();

  return (
    <div>
      <h1>공지사항 상세보기</h1>
    </div>
  );
};

export default NoticeDetailPage;