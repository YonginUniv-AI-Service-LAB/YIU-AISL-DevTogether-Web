// import React from "react";
// import style from "./Sidebar.module.css";
// import { Menu, Dropdown } from 'antd';
// import { DownOutlined } from '@ant-design/icons'; // 화살표 아이콘 import

// const Sidebar = ({ title1, title2, title3, title4, title5, title6, title7, title8, onClick }) => {
//     const menu = (
//         <Menu>
//             <Menu.Item onClick={() => onClick(title1)}>{title1}</Menu.Item>
//             <Menu.Item onClick={() => onClick(title2)}>{title2}</Menu.Item>
//             <Menu.Item onClick={() => onClick(title3)}>{title3}</Menu.Item>
//             <Menu.Item onClick={() => onClick(title4)}>{title4}</Menu.Item>
//             <Menu.Item onClick={() => onClick(title5)}>{title5}</Menu.Item>
//             <Menu.Item onClick={() => onClick(title6)}>{title6}</Menu.Item>
//             <Menu.Item onClick={() => onClick(title7)}>{title7}</Menu.Item>
//             <Menu.Item onClick={() => onClick(title8)}>{title8}</Menu.Item>
//         </Menu>
//     );

//     return (
//         <div className={style.background}>
//             <Dropdown overlay={menu} trigger={['click']}>
//                 <div className={style.fix}>
//                     <div className={style.body}>
//                         <span style={{marginRight:'15px'}}>{title1}</span>
//                         <DownOutlined /> {/* 화살표 아이콘 추가 */}
//                     </div>
//                 </div>
//             </Dropdown>
//         </div>
//     );
// };

// export default Sidebar;

// import React from "react";
// import style from "./Sidebar.module.css";

// const Sidebar = ({ titles, onClick }) => {
//     return (
//       <div className={style.background}>
//         <div className={style.fix}>
//           {titles && titles.map((title, index) => (
//             <div key={index} className={style.body} onClick={() => onClick(title)}>
//               {title}
//             </div>
//           ))}
//         </div>
//       </div>
//     );
//   };

// export default Sidebar;

import React from "react";
import style from "./Sidebar.module.css";

const Sidebar = ({ titles, onCategoryClick }) => {
  return (
    <div className={style.background}>
      <div className={style.fix}>
        {titles &&
          titles.map((title, index) => (
            <div
              key={index}
              className={style.body}
              onClick={() => onCategoryClick(title)}
            >
              {title}
            </div>
          ))}
      </div>
    </div>
  );
};

export default Sidebar;