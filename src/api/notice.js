import axios from "axios";
import { defaultAPI } from ".";

// export const fetchNotice = async () => {
//   const response = await axios.get("/notice");
//   return response.data;
// };

// 공지사항 가져오기
// export function fetchNotice() {
//   const response = defaultAPI.get({
//     url: 'notice'
//   })
//   const request = axios({
//     method: "GET",
//     url: process.env.REACT_APP_GET_NOTICE,
//     headers: {
//       "Content-Type": "application/x-www-form-urlencoded",
//       "Access-Control-Allow-Origin": `http://localhost:8080`,
//       "Access-Control-Allow-Credentials": true,
//     },
//     data: {},
//   })
//     .then((response) => {
//       console.log("공지사항 데이터다: ", response.data);
//       return response.data;
//     })
//     .catch((err) => {
//       return false;
//     });
//   return request;
//   //   return {
//   //     type: GET_NOTICE,
//   //     payload: request,
//   //     // payload: data_notice,
//   //   };
// }
