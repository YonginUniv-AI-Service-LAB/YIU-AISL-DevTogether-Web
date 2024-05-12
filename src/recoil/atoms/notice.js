import { atom } from "recoil";
import { data_message } from "../../assets/data/message";

// 공지사항 form 타입 => 작성 || 수정
export const NoticeFormTypeAtom = atom({
  key: "NoticeFormTypeAtom",
  default: "create",
});

// 공지사항 form 데이터
export const NoticeFormDataAtom = atom({
  key: "NoticeFormDataAtom",
  default: {},
});
