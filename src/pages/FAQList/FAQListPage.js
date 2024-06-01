// import { Collapse, theme } from "antd";
// import React from "react";
// import { useMediaQuery } from "react-responsive";
// import { useNavigate } from "react-router-dom";
// import { data_faq } from "../../assets/data/faq";
// import PageHeader from "../../components/Group/PageHeader/PageHeader";
// import { getItems } from "./FAQList";

// export const FAQListPage = () => {
//   // 반응형 화면
//   const isDesktopOrLaptop = useMediaQuery({ minWidth: 992 });
//   const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 991 });
//   const isMobile = useMediaQuery({ maxWidth: 767 });
//   const isNotMobile = useMediaQuery({ minWidth: 768 });

//   // 페이지 이동
//   const navigate = useNavigate();

//   const { token } = theme.useToken();
//   const panelStyle = {
//     // background: colors.gray_light,
//     // borderRadius: token.borderRadiusLG,
//   };

//   return (
//     <div>
//       <PageHeader title="자주묻는질문" subtitle="" />
//       <div style={{ padding: "10%" }}>
//         <Collapse
//           size="large"
//           accordion={true}
//           expandIconPosition="end"
//           // style={{
//           //   // background: colors.gray_light,
//           //   backgroundColor: "white",
//           // }}
//           style={panelStyle}
//           items={getItems(panelStyle)}
//         >
//           {data_faq.map((item) => {
//             <div>{item.title}</div>;
//           })}
//         </Collapse>
//       </div>
//     </div>
//   );
// };
