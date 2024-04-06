import { atom } from "recoil";
import { data_mento } from '../../assets/data/mento';

export const MentoListAtom = atom({
  key: "MentoList",
  default: [],
});

export const getMentoList = async formData => {
  // const response = await axios.post("http://api주소/auth/login", formData)
  // const { username, email, token } = response.data
  // localStorage.setItem("token", token) // 로컬 스토리지에 토큰 저장
  return data_mento;
}