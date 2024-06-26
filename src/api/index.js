import { message } from "antd";
import axios from "axios";

const accessToken = ``;

// 기본 API
export const defaultAPI = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    "Content-Type": "application/x-www-form-urlencoded",
  },
});

// AccessToken이 필요한 API
export const authAPI = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    "Content-Type": "application/x-www-form-urlencoded",
    Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
  },
});

// AccessToken이 필요 + 파일 업로드 필요 API
export const authFileAPI = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    "Content-Type": "multipart/formed-data",
    Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
  },
});

export const refreshAccessToken = async () => {
  // const accessToken = sessionStorage.getItem("accessToken");
  // const refreshToken = sessionStorage.getItem("refreshToken");
  const req = await axios({
    method: "POST",
    url: "/token/refresh",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    data: {
      accessToken: sessionStorage.getItem("accessToken"),
      refreshToken: sessionStorage.getItem("refreshToken"),
    },
  })
    .then((response) => {
      const { accessToken, refreshToken } = response.data;
      sessionStorage.setItem("accessToken", accessToken);
      sessionStorage.setItem("refreshToken", refreshToken);
      console.log("리프레시 액세스 토큰 성공");
      return true; // 토큰 갱신 성공
    })
    .catch((err) => {
      console.log("리프레시 결과: ", err.request.status);
      sessionStorage.removeItem("accessToken");
      sessionStorage.removeItem("refreshToken");
      sessionStorage.removeItem("user_profile_id");
      sessionStorage.removeItem("email");
      sessionStorage.removeItem("name");
      sessionStorage.removeItem("nickname");
      sessionStorage.removeItem("role");
      message.error("로그인 세션이 만료되어 로그아웃 됩니다.");

      return false;
    });
};

// useMutation({
//   mutationFn: async (data) =>
//     await defaultAPI.post("/token/refresh", {
//       accessToken: sessionStorage.getItem("accessToken"),
//       refreshToken: sessionStorage.getItem("refreshToken"),
//     }),
//   onSuccess: () => {
//     const { accessToken, refreshToken } = response.data;
//     sessionStorage.setItem("accessToken", accessToken);
//     sessionStorage.setItem("refreshToken", refreshToken);
//     // 로그인 화면으로 이동
//   },
//   onError: (e) => {
//     // 403: 권한 없음 => 세션 만료 처리 하고 다시 로그인 하도록
//     sessionStorage.removeItem("accessToken");
//     sessionStorage.removeItem("refreshToken");
//     sessionStorage.removeItem("email");
//     sessionStorage.removeItem("name");
//     sessionStorage.removeItem("role");
//     navigate("/", { replace: true });
//     message.error("로그인 세션이 만료되어 로그아웃 됩니다.");
//   },
// });
