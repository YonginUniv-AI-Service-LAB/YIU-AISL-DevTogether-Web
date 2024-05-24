import React, { useState } from "react";
import style from "./Button.module.css";
// import { BsBookmark, BsBookmarkFill  } from "react-icons/bs";
import { GoHeart, GoHeartFill  } from "react-icons/go";

// const ScarpButton = (props) => {
//     const [isBookmarked, setIsBookmarked] = useState(false);

//     const handleClick = () => {
//       setIsBookmarked(!isBookmarked); // 클릭 시 상태를 변경
//     };

//     return (
//         <div className={style.scrap} onClick={handleClick}>
//             {isBookmarked ? <BsBookmarkFill style={{ height: '20px', width: '25px' }}  /> : <BsBookmark style={{ height: '20px', width: '25px' }}  />}
//         </div>
//     );
// };
// export default ScarpButton;

const ScarpButton = (props) => {
    const [isBookmarked, setIsBookmarked] = useState(false);

    const handleClick = () => {
      setIsBookmarked(!isBookmarked); // 클릭 시 상태를 변경
    };

    return (
        <div className={style.scrap} onClick={handleClick}>
           {isBookmarked ? <GoHeartFill size={20} style={{ color: 'red' }} />  : <GoHeart size={20} />}
        </div>
    );
};
export default ScarpButton;
