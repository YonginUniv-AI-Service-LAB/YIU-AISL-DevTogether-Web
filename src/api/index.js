import axios from "axios";

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
    Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJhanVmcmVzaEBnbWFpbC5jb20iLCJpYXQiOjE3MTcyNTg2MDUsImV4cCI6MTcxNzI2MDQwNSwic3ViIjoi64iE65Ok7J6JIiwiZW1haWwiOiJibWgyMDM4QG5hdmVyLmNvbSIsInJvbGUiOiJBRE1JTiIsIm5pY2tuYW1lIjoi64iE65Ok7J6JIn0.lWPcEUBtzABxfKGEFLvycik2Amsc1a4ohEjv9hsLpAc`,
  },
});

// AccessToken이 필요 + 파일 업로드 필요 API
export const authFileAPI = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    "Content-Type": "multipart/formed-data",
    Authorization: sessionStorage.getItem("accessToken"),
  },
});
