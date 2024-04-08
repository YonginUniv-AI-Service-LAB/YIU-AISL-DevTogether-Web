import { atom } from "recoil";
import { data_mentor } from '../../assets/data/mentor';

export const MentorListAtom = atom({
  key: "MentorList",
  default: [],
});

export const getMentorList = async formData => {
  // const response = await axios.post("http://api주소/auth/login", formData)
  // const { username, email, token } = response.data
  // localStorage.setItem("token", token) // 로컬 스토리지에 토큰 저장
  return data_mentor;
}