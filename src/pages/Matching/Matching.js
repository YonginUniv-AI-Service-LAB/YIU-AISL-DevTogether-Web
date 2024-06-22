
import React, { useState } from 'react';
import MatchingMenteeList from './MatchingMenteeList';
import MatchingMentorList from './MatchingMentorList';

const Matching = () => {
    const [currentPage, setCurrentPage] = useState("mentee"); // 현재 페이지 상태 추가

    const handleSidebarButtonClick = (page) => {
      if (currentPage !== page) {
          setCurrentPage(page);
      }
    };

    return (
        <div>
            {currentPage === "mentee" ? (
                <MatchingMenteeList handleSidebarButtonClick={handleSidebarButtonClick} />
            ) : (
                <MatchingMentorList handleSidebarButtonClick={handleSidebarButtonClick} />
            )}
        </div>
    );
};

export default Matching;
