import axios from "axios";
import { defaultAPI } from ".";

// 🌈 문의 답변
// const 문의_답변 = useMutation({
//   mutationFn: async (data) =>
//     await authAPI.post("/admin/ask/answer", {
//       askId: data.askId,
//       answer: data.answer,
//     }),
//   onSuccess: () => {
//     // 문의 답변 등록 성공 메시지
//     // message.success("답변을 성공적으로 등록했습니다.");
//     // 뒤로가기?? 필요없음 빼기
//     //   navigate(-1);
//   },
//   onError: (e) => {
//     //     console.log("실패: ", e);
//     //     message.error("잠시 후에 다시 시도해주세요");
//     // 404: id 없음
//     // 400: 데이터 미입력
//     // 403 권한 없음
//   },
// });

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
