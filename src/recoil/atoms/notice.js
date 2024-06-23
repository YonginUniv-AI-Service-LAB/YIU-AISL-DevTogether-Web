import { atom } from "recoil";
import { data_message } from "../../assets/data/message";

// 공지사항 목록 조회
export const Notice = atom({
  key: "Notice",
  default: "create",
});

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

// 공지사항 form 파일 데이터
export const NoticeFormFilesAtom = atom({
  key: "NoticeFormFilesAtom",
  default: [],
});

// 공지사항 삭제할 form 파일 데이터
export const NoticeDeleteFilesAtom = atom({
  key: "NoticeDeleteFilesAtom",
  default: [],
});
