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
    // Authorization: sessionStorage.getItem("accessToken"),
    Authorization: `Bearer ${accessToken}`,
  },
});

// AccessToken이 필요 + 파일 업로드 필요 API
export const authFileAPI = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    "Content-Type": "multipart/formed-data",
    Authorization: `Bearer ${accessToken}`,
  },
});
