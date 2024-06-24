import { message } from "antd";
import { refreshAccessToken } from ".";

// // 에러 핸들러
// export const handleMutationError = async (type, e) => {
//   // 데이터 미입력
//   if (e.request.status === 400)
//     message.error("미입력된 값이 존재합니다. 필드를 모두 입력해주세요.");
//   // 공지사항 id 없음
//   else if (e.request.status == 400)
//     message.error(`존재하지 않는 ${type}입니다.`);
//   // OR 액세스 토큰 만료 OR 권한 없음
//   else if (e.request.status === 401 || e.request.status === 403) {
//     if (!refresh) {
//       const isTokenRefreshed = await refreshAccessToken();
//       setRefresh(true);
//       if (isTokenRefreshed) {
//         formType === "create" ? createData.mutate() : updateData.mutate();
//       } else {
//         navigate("/");
//       }
//     } else {
//       message.error("권한이 없습니다.");
//     }
//   }
//   // 서버 오류
//   else if (e.request.status === 500)
//     message.error("잠시 후에 다시 시도해주세요.");
// };
