import axios from "axios";

const apiClient = axios.create({
  baseURL: "https://api.example.com", // 실제 API 주소로 변경하세요.
  headers: {
    "Content-Type": "application/x-www-form-urlencoded",
    "Access-Control-Allow-Origin": `http://localhost:3000`,
    "Access-Control-Allow-Credentials": "true",
  },
});

export default apiClient;
