import axios from "axios";
import { atom } from "recoil";

export const loginState = atom({
  key: "login",
  default: { email: "", pwd: "" },
});

export const isLoggedInState = atom({
  key: "isLoggedIn",
  default: localStorage.getItem("accessToken") ? true : false,
});

// export const login = async (data) => {
//     // const response = await axios.post("http://api주소/auth/login", formData)
//     const response = axios({
//         method: "POST",
//         // url: process.env.REACT_APP_LOGIN,
//         url: 'http://localhost:8080/login', // 테스트
//         // headers: {
//         //     "Content-Type": "application/x-www-form-urlencoded",
//         // }
//         data: {
//             // email: data.email,
//             // pwd: data.pwd
//             email: 202033013, // 테스트
//             pwd: "a123" // 테스트
//         }
//     }).then((response) => {
//         const { id, name, role, token} = response.data;
//         sessionStorage.setItem("accessToken", token['accessToken']) // 로컬 스토리지에 토큰 저장
//         sessionStorage.setItem("name", name); // 테스트
//         sessionStorage.setItem("eamil", id); // 테스트
//         sessionStorage.setItem("role", role); // 테스트
//         return true;
//     })
//     .catch((err) => {
//       return err.response.status;
//     });

//     return response;
// }

// export const signup = async formData => {
//   const response = await axios.post("http://api주소/auth/signup", formData)
//   const { username, email, token } = response.data

//   localStorage.setItem("token", token) // 로컬 스토리지에 토큰 저장

//   return { username, email, token }
// }

// export const logout = async () => {
//   try {
//     await axios.post("http://api주소/auth/logout")

//     // 로컬 스토리지에서 토큰 제거
//     localStorage.removeItem("token")
//   } catch (error) {
//     console.error("Error during logout:", error)
//   }
// }
